import { Simbolo } from './Simbolo';
import { TablaError } from '../Errores/TablaError';

export class Entorno {
    public anterior: Entorno;                   //Variable que guarda la tabla de simbolos anterior 
    public global: Entorno;                     //Variable que guarda la tabla de simbolo globales 
    //NOTA: Solo de la tabla de simbolos hay una tabla statica porque las demas solo se llenan 
    //durante el entorno global 
    public tablaSimbolos: Array<Simbolo>;       //Variable que guarda la tabla de simbolos 
    
    constructor(anterior: Entorno) {
        if (anterior == null) {
            this.global = null;
        } else {
            this.global = anterior.global;
        }
        this.anterior = anterior;
        //tablas 
        this.tablaSimbolos = new Array();
    }

    /**
     * 
     * @param sim: Trae el simbolo que se pretende guardar 
     */
    public insert(sim: Simbolo): boolean {
        const evaluar = this.tablaSimbolos.find(e => e.id === sim.id);
        if (evaluar === undefined) {
            this.tablaSimbolos.push(sim);
            return true;
        } else {
            TablaError.addError({ tipo: "Semantico", descripcion: "La variable " + sim.id + " ya esta declarada", fila: sim.linea, columna: sim.columna });
            return false;
        }
    }

    public search(id: string, linea: number, columna: number): Simbolo {
        for (var ent: Entorno = this; ent != null; ent = ent.anterior) {
            const evaluar = ent.tablaSimbolos.find(e => e.id === id);
            if (evaluar != undefined) {
                return evaluar;
            }
        }
        TablaError.addError({ tipo: "Semantico", descripcion: "La variable " + id + " no existe", fila: linea, columna: columna });
        return null;
    }

    public searchDeclaracion(id: string, linea: number, columna: number): Simbolo {
        for (var ent: Entorno = this; ent != null; ent = ent.anterior) {
            const evaluar = this.tablaSimbolos.find(e => e.id === id);
            if (evaluar != undefined) {
                return evaluar;
            }
        }
        return null;
    }


    
    

}