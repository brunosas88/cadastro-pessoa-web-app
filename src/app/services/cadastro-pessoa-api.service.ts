import { PessoaDadosCompletos } from './../models/PessoaDadosCompletos';
import { PessoaRequisicao } from '../models/PessoaRequisicao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroPessoaApiService {
  apiUrl = 'http://localhost:5000/pessoas';

  constructor(private httpCliente: HttpClient) {}

  listarPessoas(): Observable<PessoaDadosCompletos[]> {
    return this.httpCliente.get<PessoaDadosCompletos[]>(this.apiUrl);
  }

  cadastrarPessoa(dadosPessoa: PessoaRequisicao): Observable<PessoaRequisicao> {
    return this.httpCliente.post<PessoaRequisicao>(this.apiUrl, dadosPessoa);
  }

  editarPessoa(dadosPessoa: PessoaRequisicao): Observable<any> {
    return this.httpCliente.put(`${this.apiUrl}/editar`, dadosPessoa);
  }

  excluirPessoa(registroSocial: string): Observable<any> {
    return this.httpCliente.delete(`${this.apiUrl}/excluir/${registroSocial}`);
  }
}
