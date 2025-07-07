import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private countryApiBase = 'https://api.countrystatecity.in/v1';
  private headers = new HttpHeaders({
    'X-CSCAPI-KEY': 'eUl0VlpuQkthUkRpOWZEcjZpam9VWUkyWHRYMjl4RExMUjBVVDVIcg==' 
  });
  private url = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data);
  }


  getCountries() {
    return this.http.get<any[]>(`${this.countryApiBase}/countries`, { headers: this.headers });
  }

  // Fetch states by country ISO2 code
  getStates(countryCode: string) {
    return this.http.get<any[]>(`${this.countryApiBase}/countries/${countryCode}/states`, {
      headers: this.headers
    });
  }
}
