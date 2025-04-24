import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-check-url',
  imports:[CommonModule,FormsModule,RouterModule],
  templateUrl: './check-url.component.html',
  styleUrls: ['./check-url.component.css']
})
export class CheckUrlComponent {
  url: string = '';
  result: string | null = null;
  checkedUrl: string = '';
  loading = false;
  checkingAnother = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
    this.result = null;
    this.checkingAnother = false;

    const body = { url: this.url };
    this.http.post<any>('http://localhost:5005/api/predict-url', body).subscribe({
      next: (response) => {
        this.checkedUrl = this.url;
        this.result = response.result;
        this.loading = false;
      },
      error: (err) => {
        console.error('API error:', err);
        this.result = 'Error';
        this.checkedUrl = this.url;
        this.loading = false;
      }
    });
  }

  checkAnother() {
    this.url = '';
    this.result = null;
    this.checkedUrl = '';
    this.checkingAnother = true;
  }
}
