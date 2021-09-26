import { Nodo } from './Nodo';
import { Entorno } from './Entorno';
import { Instruccion } from './Instruccion';
import { Expresion } from './Expresion';

export class Arbol{

    public instrucciones: Nodo[] = new Array();
    public entornoGlobal: Entorno;

    constructor(instrucciones: Nodo[]){
        this.instrucciones = instrucciones;
        this.entornoGlobal = new Entorno(null);
        this.entornoGlobal.global = this.entornoGlobal; 
    }

    public execute(): void{
        //Ir en busqueda de las variables globales 
        this.instrucciones.map(e=>{
            if(e instanceof Instruccion){
                <Instruccion> e.ejecutar(this.entornoGlobal); 
            }else if(e instanceof Expresion){
                <Expresion> e.obtenerValor(this.entornoGlobal);
            }
        }); 
 
    }

}