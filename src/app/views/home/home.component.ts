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

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    public modal: MatDialog,
    public pessoaService: CadastroPessoaApiService
  ) {}

  ngOnInit() {
    this.listarPessoas();
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = 'Próxima Página';
    this.paginator._intl.previousPageLabel = 'Página Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
    this.paginator._intl.getRangeLabel = (pagina: number, quantidadeItens: number, quantidadePaginas: number) => {
      if (quantidadePaginas === 0 || quantidadeItens === 0) {
        return `0 de ${quantidadePaginas }`;
      }
      quantidadePaginas = Math.max(quantidadePaginas, 0);
      const indiceInicial = pagina * quantidadeItens;
      const indiceFinal = indiceInicial < quantidadePaginas ? Math.min(indiceInicial + quantidadeItens, quantidadePaginas) : indiceInicial + quantidadeItens;
      return `${indiceInicial + 1} - ${indiceFinal} de ${quantidadePaginas}`;
    };
  }

  iniciarNovoCadastro() {
    const modalCadastro = this.modal.open(ElementDialogComponent);
    modalCadastro.afterClosed().subscribe((valor) => {
      this.listarPessoas();
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarPessoas() {
    this.pessoaService.listarPessoas().subscribe({
      next: (resposta) => {
        this.dataSource = new MatTableDataSource(resposta);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  excluirPessoas(registroSocial: string) {
    this.pessoaService
      .excluirPessoa(registroSocial)
      .subscribe((valor) =>
        this.atualizarTabela('Pessoa Removida com Sucesso!')
      );
    this.listarPessoas();
  }

  atualizarTabela(mensagem: string) {
    alert(`${mensagem}`);
    this.listarPessoas();
  }
}
