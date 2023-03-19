import { Pessoa } from './../../models/Pessoa';
import { CadastroPessoaApiService } from './../../services/cadastro-pessoa-api.service';
import { CepServiceService } from './cep-service.service';
import { Component, Inject } from '@angular/core';
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
export class ElementDialogComponent {
  cadastroForm: FormGroup;

  validaFormulario = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Pessoa,
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
      cep: '',
      numero: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: '',
      complemento: '',
    });
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  consultarCep(event: any) {
    this.cepService.buscar(event.target.value).subscribe({
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
    const novaPessoa = this.converterCamposDoFormularioParaPessoa(this.cadastroForm.value);
    this.cadastroService.cadastrarPessoa(novaPessoa).subscribe();
    this.dialogRef.close(true);
    alert(`Pessoa Cadastrada com Sucesso`);
  }

  converterCamposDoFormularioParaPessoa(camposFormulario: any): Pessoa {
    return {
      nome: camposFormulario.nome,
      email: camposFormulario.email,
      telefone: camposFormulario.telefone,
      registroSocial: camposFormulario.registroSocial,
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
