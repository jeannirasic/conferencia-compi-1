import { Nodo } from './Nodo';
import { Entorno } from './Entorno';

export abstract class Instruccion extends Nodo{

    constructor(linea: number, columna: number){
        super(linea, columna);
    }

    public abstract ejecutar(ent: Entorno); 
    
}