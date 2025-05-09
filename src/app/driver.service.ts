import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Driver {
  id: number;
  phone: string;
  rating: number;
  bio: string;
}

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private dataUrl = 'assets/data/drivers.json';

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.dataUrl);
  }

  getUser(id: number): Observable<Driver | undefined> {
    return this.http
      .get<Driver[]>(this.dataUrl)
      .pipe(map((drivers) => drivers.find((d) => d.id === id)));
  }
}
