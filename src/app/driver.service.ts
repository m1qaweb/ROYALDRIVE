import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  age: number;
  phone: string;
  occupation: string;
  hobbies: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private apiUrl = 'https://freetestapi.com/api/v1/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
