import { Instruccion } from "./Instruccion";
import { Nodo } from "./Nodo";
import { Expresion } from "./Expresion";

export class Bloque extends Instruccion{

    public instrucciones: Nodo[] = new Array();

    constructor(instrucciones:Nodo[],linea:number,columna:number){
        super(linea,columna); 
        this.instrucciones = instrucciones; 
    }

    public ejecutar(ent: import("./Entorno").Entorno){
        this.instrucciones.map(e=>{
            if(e instanceof Instruccion){
                <Instruccion> e.ejecutar(ent); 
            }else if(e instanceof Expresion){
                <Expresion> e.obtenerValor(ent);
            }
        }); 
    }
    
}