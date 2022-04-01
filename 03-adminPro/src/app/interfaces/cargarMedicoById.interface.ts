import { Medico } from '../models/medico.model';

export interface CargarMedicoById{
    ok:boolean;
    medico: Medico;
}