import { PessoaRequisicao } from '../../models/PessoaRequisicao';
import { CadastroPessoaApiService } from './../../services/cadastro-pessoa-api.service';
import { CepServiceService } from './cep-service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css'],
})
export class ElementDialogComponent implements OnInit {
  cadastroForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    private cepService: CepServiceService,
    private cadastroService: CadastroPessoaApiService,
    private construtorFormulario: FormBuilder
  ) {
    this.cadastroForm = this.construtorFormulario.group({
      nome: '',
      email: '',
      telefone: '',
      registroSocial: '',
      estaAtivo: '',
      cep: '',
      numero: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: '',
      complemento: '',
    });
  }

  ngOnInit(): void {
    this.cadastroForm.patchValue(this.data);
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  consultarCep(event: any) {
    this.cepService.buscarCep(event.target.value).subscribe({
      next: (dados: any) => {
        this.cadastroForm.patchValue({
          logradouro: dados.logradouro ? dados.logradouro : '-',
          bairro: dados.bairro ? dados.bairro : '-',
          cidade: dados.localidade ? dados.localidade : '-',
          uf: dados.uf ? dados.uf : '-',
          complemento: dados.complemento,
        });
      },
      error: (erro: any) => {
        this.cadastroForm.patchValue({
          logradouro: '-',
          bairro: '-',
          cidade: '-',
          uf: '-',
        });
      },
    });
  }

  submeterFormulario() {
    if (this.data) {
      const novaPessoa = this.converterCamposDoFormularioParaPessoaRequisicao(
        this.cadastroForm.value
      );
      this.cadastroService.editarPessoa(novaPessoa).subscribe();
      alert(`Informações Atualizadas com Sucesso`);
    } else {
      const novaPessoa = this.converterCamposDoFormularioParaPessoaRequisicao(
        this.cadastroForm.value
      );
      this.cadastroService.cadastrarPessoa(novaPessoa).subscribe();
      alert(`Pessoa Cadastrada com Sucesso`);
    }
    this.dialogRef.close(true);
  }

  converterCamposDoFormularioParaPessoaRequisicao(
    camposFormulario: any
  ): PessoaRequisicao {
    return {
      nome: camposFormulario.nome,
      email: camposFormulario.email,
      telefone: camposFormulario.telefone,
      registroSocial: camposFormulario.registroSocial,
      estaAtivo: camposFormulario.estaAtivo || false,
      endereco: {
        cep: camposFormulario.cep,
        numero: camposFormulario.numero,
        logradouro: camposFormulario.logradouro,
        bairro: camposFormulario.bairro,
        cidade: camposFormulario.cidade,
        uf: camposFormulario.uf,
        complemento: camposFormulario.complemento,
      },
    };
  }

  getFormularioInvalido() {
    return this.cadastroForm.invalid;
  }

  getErrorMessage() {
    return 'Valor Inválido';
  }
}
