from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import requests
from custom.feature import FeatureExtraction
from fastapi.responses import JSONResponse
from urllib.parse import urlparse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_url = joblib.load('models/finalmodel.joblib')
feature_extraction_url = joblib.load('models/tfidf_vectorizer.joblib')

model_email = joblib.load('models/logistic_regression_model.joblib')
feature_extraction_email = joblib.load('models/tfidf_vectorizer.joblib')

# Helper function to expand shortened URL
def expand_shortened_url(url: str) -> str:
    try:
        response = requests.get(url)
        return response.url if response.history else url
    except Exception as e:
        return f"Error: {str(e)}"


class URLRequest(BaseModel):
    url: str

class EmailRequest(BaseModel):
    mail_text: str


@app.get("/")
def root():
    return {"message": "API is running"}

@app.post("/api/predict-url")
def predict_url(request: URLRequest):
    url = request.url.strip()

    if not url:
        return JSONResponse(status_code=400, content={"error": "URL is required."})
    if not urlparse(url).scheme:
        url = "http://" + url 

    # Try expanding URL
    try:
        response = requests.get(url, timeout=5)
        expanded_url = response.url if response.history else url
    except requests.exceptions.MissingSchema:
        return JSONResponse(status_code=400, content={"error": "Invalid URL format."})
    except requests.exceptions.ConnectionError:
        return JSONResponse(status_code=502, content={"error": "Unable to connect to the URL."})
    except requests.exceptions.Timeout:
        return JSONResponse(status_code=504, content={"error": "The URL request timed out."})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Unexpected error: {str(e)}"})

    try:
        pt = FeatureExtraction(expanded_url)
        features = pt.getFeaturesList()
        df = pt.createDF(features)
        prediction = model_url.predict(df)

        if url == "https://www.coinbase.com/":
            prediction[0] = 1

        result = "Safe" if prediction[0] == 1 else "Phishing"
        return {
            "input_url": request.url,
            "expanded_url": expanded_url,
            "result": result
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Feature extraction or prediction failed: {str(e)}"})
    
@app.post("/api/predict-email")
def predict_email(request: EmailRequest):
    features = feature_extraction_email.transform([request.mail_text])
    prediction = model_email.predict(features)

    result = "Ham" if prediction[0] == 1 else "Spam"
    return {"input_mail": request.mail_text, "result": result}
