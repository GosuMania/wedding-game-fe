export interface IMission {
  id?: number | null;
  idUtente?: number | null | undefined;
  parolaCruciverba: string;
  selfieSposa: string | null;
  selfieSposo: string | null;
  brindisi: boolean;
  videoBrindisi: string | null;
  parolaJenga: string;
  indovinello: string;
  punteggio: string;
  date?: string;
}
