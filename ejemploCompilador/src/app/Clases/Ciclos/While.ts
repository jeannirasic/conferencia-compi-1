import { Instruccion } from '../Arbol/Instruccion';
import { Entorno } from '../Arbol/Entorno';
import { Expresion } from '../Arbol/Expresion';
import { Bloque } from '../Arbol/Bloque';
import { EnumTipo } from '../Arbol/Tipo';
import { TablaError } from '../Errores/TablaError';

export class While extends Instruccion{

    expresion: Expresion;
    bloque: Bloque;

    constructor(expresion: Expresion, bloque: Bloque, linea: number, columna: number){
        super(linea, columna);
        this.expresion = expresion;
        this.bloque = bloque;
    }

    public ejecutar(ent: Entorno){
        let condicional: Expresion = this.expresion.obtenerValor(ent);
        if(condicional.tipo.tipo === EnumTipo.boolean){
            while(condicional.valor === true){
                this.bloque.ejecutar(new Entorno(ent)); 
                condicional.obtenerValor(ent);
            }
        } else {
            TablaError.addError({tipo: "Sintactico", descripcion: "No se ingresó un booleano en la condicional",
                fila: this.linea, columna: this.columna});
            return;
        }

    }

}