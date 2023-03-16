import { Endereco } from './Endereco';
export interface Pessoa {
  nome: string;
  email: string;
  telefone: string;
  registroSocial: string;
  endereco: Endereco;
}
