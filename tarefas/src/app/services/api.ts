import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // <-- ESSA LINHA É CRUCIAL!
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users/1';

  constructor(private http: HttpClient) { }

  getDadosPerfil(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}