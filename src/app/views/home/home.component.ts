import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Pessoa } from 'src/app/models/Pessoa';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { Endereco } from 'src/app/models/Endereco';

const ELEMENT_DATA: Pessoa[] = [
  {
    nome: 'bruno',
    email: 'bruno@email',
    telefone: '123456',
    registroSocial: '123',
    endereco: {
      cep: '44000',
      numero: '5',
      logradouro: 'rua a',
      bairro: 'bairro a',
      cidade: 'cidade a',
      uf: 'BA',
      complemento: 'conjunto A',
    },
  },
  {
    nome: 'caio',
    email: 'caio@email',
    telefone: '65412',
    registroSocial: '321',
    endereco: {
      cep: '55000',
      numero: '5',
      logradouro: 'rua b',
      bairro: 'bairro b',
      cidade: 'cidade b',
      uf: 'BA',
      complemento: 'conjunto B',
    },
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayedColumns: string[] = [
    'nome',
    'email',
    'telefone',
    'registroSocial',
    'gerenciamento',
  ];

  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(element: Pessoa | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      data:
        element == null
          ? {
              nome: '',
              email: '',
              telefone: '',
              registroSocial: '',
              endereco: {
                cep: '',
                numero: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: '',
                complemento: '',
              },
            }
          : {
              nome: element.nome,
              email: element.email,
              telefone: element.telefone,
              registroSocial: element.registroSocial,
              endereco: {
                cep: element.endereco.cep,
                numero: element.endereco.numero,
                endereco: element.endereco.logradouro,
                bairro: element.endereco.bairro,
                cidade: element.endereco.cidade,
                uf: element.endereco.uf,
                complemento: element.endereco.complemento,
              },
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.dataSource.push(result);
        console.log(this.dataSource);
        this.table.renderRows();
      }
    });
  }

  atualizarInformacoes(pessoa: Pessoa | null): void {
    this.openDialog(pessoa);
  }
}
