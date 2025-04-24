
# Project Setup Guide

This project consists of a **FastAPI** backend and an **Angular** frontend. Below are the detailed steps to set up and run both parts locally.

## 🖥️ **Backend Setup (FastAPI)**

### Step 1: Navigate to the Backend Directory
Open your terminal and navigate to the **backend** directory:

```bash
cd backend
```

### Step 2: Set Up a Python Virtual Environment
Create a Python virtual environment and activate it:

#### For Windows:

```bash
python -m venv {environment_name}
./{environment_name}/Scripts/activate
```

#### For macOS/Linux:

```bash
python3 -m venv {environment_name}
source {environment_name}/bin/activate
```

### Step 3: Install Dependencies
Once the virtual environment is activated, install all required dependencies. If you have a `requirements.txt` file in your **backend** folder, run the following:

```bash
pip install -r requirements.txt
```

Alternatively, if `requirements.txt` is missing, manually install the required libraries:

```bash
pip install fastapi uvicorn requests pydantic joblib
```

### Step 4: Run the FastAPI Backend Server
Start the FastAPI backend server using Uvicorn:

```bash
uvicorn main:app --reload --port 5005
```

Once the server is running, you should be able to access the FastAPI backend at:

```plaintext
http://localhost:5005
```

---

## 🌐 **Frontend Setup (Angular)**

### Step 1: Navigate to the Frontend Directory
Open a new terminal window and navigate to your **Angular** project directory:

```bash
cd phistor
```

### Step 2: Install Dependencies
Install all the required dependencies for the Angular application:

```bash
npm install
```

This will install all necessary node modules.

### Step 3: Run the Angular Development Server
Start the Angular development server:

```bash
ng serve
```

The Angular application should now be running at:

```plaintext
http://localhost:4200
```


