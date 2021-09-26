import { Instruccion } from '../Arbol/Instruccion';
import { Expresion } from '../Arbol/Expresion';
import { Bloque } from '../Arbol/Bloque'; 
import { Entorno } from '../Arbol/Entorno';
import { TablaError } from '../Errores/TablaError';
import { EnumTipo } from '../Arbol/Tipo';

export class Condicion extends Instruccion{

    public condicion:Expresion; 
    public bloque:Bloque; 
    public ejecutado:boolean; 
    
    constructor(condicion:Expresion,bloque:Bloque,linea:number,columna:number){
        super(linea,columna);  
        this.condicion = condicion; 
        this.bloque = bloque; 
        this.ejecutado = false;  
    }

    public ejecutar(ent: Entorno): Object {
        this.ejecutado = false; 
        let result:Expresion = this.condicion.obtenerValor(ent); 
        if(result.tipo.tipo == EnumTipo.boolean){
            if(result.valor.toString()=="true"){
                this.bloque.ejecutar(ent); 
                this.ejecutado = true; 
            }
            return null;
        }
        TablaError.addError({ tipo: "Sintactico", descripcion: "El tipo de dato en la condicion no regresa un valor booleano", fila: this.linea, columna: this.columna });
        return null; 
    }
    
}