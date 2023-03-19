import { Endereco } from './Endereco';
export interface PessoaRequisicao {
  nome: string;
  email: string;
  telefone: string;
  registroSocial: string;
  estaAtivo: boolean;
  endereco: Endereco;
}
