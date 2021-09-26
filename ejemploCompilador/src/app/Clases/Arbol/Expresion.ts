import { Entorno } from './Entorno';
import {Nodo} from './Nodo';
import {Tipo}  from './Tipo';

export abstract class Expresion extends Nodo{
    public tipo: Tipo;
    public valor: any;

    constructor(tipo: Tipo, linea: number, columna: number, valor: any){
        super(linea, columna);
        this.tipo = tipo;
        this.valor = valor;
    }

    public abstract obtenerValor(ent: Entorno);
}

