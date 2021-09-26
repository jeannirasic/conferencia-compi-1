import { Expresion } from '../Arbol/Expresion';
import { Entorno } from './Entorno';
import { Simbolo } from './Simbolo';
import {EnumTipo, Tipo} from './Tipo';

export class Primitivo extends Expresion{
    public valor:any; 

    constructor(valor:any, tipo:Tipo, linea: number, columna: number){
        super(tipo,linea,columna,valor); 
    }

    public obtenerValor(ent: Entorno){
        if(this.tipo.tipo === EnumTipo.int){
            return new Simbolo(new Tipo(EnumTipo.int), "", this.linea, this.columna, Number(this.valor));
        } else if (this.tipo.tipo === EnumTipo.boolean) {
            return new Simbolo(new Tipo(EnumTipo.boolean), "", this.linea, this.columna, Boolean(this.valor));
        } else if (this.tipo.tipo === EnumTipo.double) {
            return new Simbolo(new Tipo(EnumTipo.double), "", this.linea, this.columna, Number(this.valor));
        } else if (this.tipo.tipo === EnumTipo.string) {
            return new Simbolo(new Tipo(EnumTipo.string), "", this.linea, this.columna, String(this.valor));
        } else {
            return new Simbolo(new Tipo(EnumTipo.error), "", this.linea, this.columna, "Error [" + this.valor + "]");
        }
    }

        
}