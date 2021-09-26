import { Instruccion } from '../Arbol/Instruccion';
import { Expresion } from '../Arbol/Expresion';
import { Entorno } from '../Arbol/Entorno';
import { Simbolo } from '../Arbol/Simbolo';
import { TablaError } from '../Errores/TablaError';

export class Asignacion extends Instruccion{
    
    public id:string; 
    public exp:Expresion; 
    
    constructor(id:string, exp:Expresion, linea:number, columna:number){
        super(linea,columna); 
        this.id = id; 
        this.exp = exp;
    }

    public ejecutar(ent: Entorno): Object {
        let sim: Simbolo; 
        sim = ent.search(this.id,this.linea,this.columna); 

        if(sim!=null){
            let result:Expresion = this.exp.obtenerValor(ent); 
            if(sim.tipo.tipo == result.tipo.tipo){
                sim.valor = result.valor;  
            }else{
                TablaError.addError({ tipo: "Semantico", descripcion: "El valor no coincide con el tipo de dato", fila: this.linea, columna: this.columna });
            }

        }
        return null;
    }

    
}