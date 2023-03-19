import { Endereco } from './Endereco';
export interface PessoaDadosCompletos {
  nome: string;
  email: string;
  telefone: string;
  registroSocial: string;
  estaAtivo: string;
  criadoEm: string;
  atualizadoEm: string;
  endereco: Endereco;
}
