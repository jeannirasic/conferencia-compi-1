import { Expresion } from "../Arbol/Expresion";
import { Tipo, EnumTipo } from "../Arbol/Tipo";
import { Entorno } from "../Arbol/Entorno";
import { Simbolo } from "../Arbol/Simbolo";

export class Id extends Expresion{

    public id:string; 

    constructor(id:string,linea:number,columna:number){
        super(null,null,linea,columna); 
        this.id = id; 
    }

    public obtenerValor(ent: Entorno){
        let sim: Simbolo = ent.search(this.id,this.linea,this.columna); 
        if(sim!=null){
            return sim; 
        }

        return new Simbolo(new Tipo(EnumTipo.error),this.id,this.linea,this.columna,"@Error@"); 
        
    }
}