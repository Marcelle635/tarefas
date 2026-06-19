import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Mudamos para a API de conselhos/dicas traduzida para o português
  private apiUrl = 'https://api.adviceslip.com/advice';

  constructor(private http: HttpClient) { }

  getDadosPerfil(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}