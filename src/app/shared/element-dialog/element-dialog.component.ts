import { CepServiceService } from './cep-service.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pessoa } from 'src/app/models/Pessoa';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css'],
})
export class ElementDialogComponent {
  element!: Pessoa;

  cep = new FormControl('', [Validators.required]);

  validaFormulario = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Pessoa,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    private cepService: CepServiceService
  ) {}

  onCancelar(): void {
    this.dialogRef.close();
  }

  consultarCep(event: any) {
    this.cepService.buscar(event.target.value).subscribe(
      (dados: any) => {
        this.data.endereco.bairro = dados.bairro
          ? dados.bairro
          : 'Não Encontrado';
        this.data.endereco.logradouro = dados.logradouro
          ? dados.logradouro
          : 'Não Encontrado';
        this.data.endereco.complemento = dados.complemento;
        this.data.endereco.cidade = dados.localidade
          ? dados.localidade
          : 'Não Encontrado';
        this.data.endereco.uf = dados.uf ? dados.uf : 'Não Encontrado';
        this.validaFormulario = true;
        if (dados.uf) {
          this.validaFormulario = false;
        }
      },
      (error: any) => {
        this.data.endereco.bairro = 'Não Encontrado';
        this.data.endereco.logradouro = 'Não Encontrado';
        this.data.endereco.cidade = 'Não Encontrado';
        this.data.endereco.uf = 'Não Encontrado';
        this.validaFormulario = true;
      }
    );
  }

  getValidaFormulario() {
    return this.validaFormulario;
  }

  getErrorMessage() {
    return 'Valor Inválido';
  }
}
