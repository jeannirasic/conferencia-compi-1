import { Entorno } from './Entorno';
import { Expresion } from './Expresion';
import {Tipo}  from './Tipo';

export class Simbolo extends Expresion {
    // tipo es el tipo de la variable 
    public tipo: Tipo;
    // nombre de la variable 
    public id: string; 
    // la linea de declaracion 
    public linea: number; 
    // la columna de declaracion 
    public columna: number; 

    constructor(tipo: Tipo, id:string, linea: number, columna: number, valor: any){
        super(tipo, linea, columna,valor);
        this.id = id; 
    }

    public obtenerValor(ent: Entorno){
        return new Simbolo(this.tipo, this.id, this.linea, this.columna, this.valor);
    }
}