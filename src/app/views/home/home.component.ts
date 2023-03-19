import { Pessoa } from './../../models/Pessoa';
import { CadastroPessoaApiService } from './../../services/cadastro-pessoa-api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CadastroPessoaApiService],
})
export class HomeComponent {
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
    public modal: MatDialog,
    public pessoaService: CadastroPessoaApiService
  ) {}

  ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoaService.listarPessoas().subscribe({
      next: (resposta) => {
        this.dataSource = new MatTableDataSource(resposta);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  iniciarNovoCadastro() {
    const modalCadastro = this.modal.open(ElementDialogComponent)
    modalCadastro.afterClosed().subscribe( valor => this.listarPessoas())
  }

  atualizarInformacoes(): void {

  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
