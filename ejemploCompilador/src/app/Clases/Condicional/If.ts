import { Instruccion } from "../Arbol/Instruccion";
import { Condicion } from "./Condicion";
import { Bloque } from "../Arbol/Bloque";
import { Entorno } from "../Arbol/Entorno";

export class If extends Instruccion{

    public listaCondiciones: Condicion[] = new Array();
    public bloqueElse:Bloque; 

    constructor(listaCondiciones: Condicion[], bloqueElse:Bloque,linea:number, columna:number){
        super(linea,columna); 
        this.listaCondiciones = listaCondiciones; 
        this.bloqueElse = bloqueElse; 
    }

    public ejecutar(ent: Entorno): Object {
        for (let i = 0; i < this.listaCondiciones.length; i++) {
            this.listaCondiciones[i].ejecutar(ent);
            if (this.listaCondiciones[i].ejecutado) {
                return null;
            }
        }
        if (this.bloqueElse != null) {
            this.bloqueElse.ejecutar(ent); 
        }
        return null;
    }

    

}