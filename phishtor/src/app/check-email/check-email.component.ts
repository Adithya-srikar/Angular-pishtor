import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email-check',
  imports:[CommonModule,FormsModule,RouterModule],
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css']
})
export class CheckEmailComponent {
  emailText: string = '';
  result: string = '';
  isLoading = false;
  showResult = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.isLoading = true;
    this.showResult = false;

    this.http.post<any>('http://localhost:8000/api/predict-email', {
      mail_text: this.emailText
    }).subscribe({
      next: (res) => {
        this.result = res.result;
        this.showResult = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.result = 'Error';
        this.showResult = true;
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.emailText = '';
    this.result = '';
    this.showResult = false;
  }
}
