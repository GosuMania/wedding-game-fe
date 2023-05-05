import {IMission} from "./IMission";

export interface IUser {
  id?: number | null;
  nome: string;
  cognome: string;
  nomeUtente: string;
  punteggio: number;
  mission?: IMission | null;
}
