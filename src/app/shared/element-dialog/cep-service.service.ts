import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseViaCepAPI } from 'src/app/models/ResponseViaCepAPI';

@Injectable({
  providedIn: 'root',
})
export class CepServiceService {
  constructor(private httpCliente: HttpClient) {}

  buscarCep(cep: string) : Observable<ResponseViaCepAPI> {
    return this.httpCliente.get<ResponseViaCepAPI>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
