import { CadastroPessoaApiService } from './../../services/cadastro-pessoa-api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Pessoa } from 'src/app/models/Pessoa';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CadastroPessoaApiService],
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'edicao',
    'nome',
    'email',
    'telefone',
    'registroSocial',
    'cep',
    'numero',
    'logradouro',
    'bairro',
    'cidade',
    'uf',
    'complemento',
  ];

  dataSource = new MatTableDataSource<Pessoa>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    public pessoaService: CadastroPessoaApiService
  ) {}

  ngOnInit(): void {
    this.listarPessoas();
  }

  ngAfterViewInit() {}

  listarPessoas() {
    this.pessoaService.listarPessoas().subscribe({
      next: (resposta) => {
        this.dataSource = new MatTableDataSource(resposta);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

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
        this.dataSource.data.push(result);
        console.log(this.dataSource);
        this.table.renderRows();
      }
    });
  }

  atualizarInformacoes(pessoa: Pessoa | null): void {
    this.openDialog(pessoa);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
