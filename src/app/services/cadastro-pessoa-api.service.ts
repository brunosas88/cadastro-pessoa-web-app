import { Pessoa } from './../models/Pessoa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroPessoaApiService {
  apiUrl = 'http://localhost:5000';

  constructor(private httpCliente: HttpClient) {}

  listarPessoas() : Observable<Pessoa[]>{
    return this.httpCliente.get<Pessoa[]>(`${this.apiUrl}/pessoas`);
  }
}
