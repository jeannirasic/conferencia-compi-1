import { Instruccion } from '../Arbol/Instruccion';
import { Tipo, EnumTipo } from '../Arbol/Tipo';
import { Expresion } from '../Arbol/Expresion';
import { Entorno } from '../Arbol/Entorno';
import { Simbolo } from '../Arbol/Simbolo';
import { TablaError } from '../Errores/TablaError';


export class Declaracion extends Instruccion{
    tipo: Tipo;
    id: string; 
    expresion: Expresion;

    constructor(tipo: Tipo, id: string, expresion: Expresion, linea: number, columna: number){
        super(linea, columna);
        this.tipo = tipo; 
        this.id = id; 
        this.expresion = expresion;
    }


    public ejecutar(ent: Entorno): Object {
        let variable = ent.searchDeclaracion(this.id, this.linea, this.columna);

        if(variable === null){
            if (this.expresion != null) {
                let result:Simbolo = this.expresion.obtenerValor(ent); 
                if(this.tipo.tipo === result.tipo.tipo){
                    let sim:Simbolo = new Simbolo(this.tipo,this.id,this.linea,this.columna,result.valor); 
                    ent.insert(sim);
                } else {
                    TablaError.addError({ tipo: "Sintactico", descripcion: "El tipo de dato no coincide con el valor asignado", fila: this.linea, columna: this.columna });
                }
            } else {
                switch(this.tipo.tipo){
                    case EnumTipo.boolean:
                        {
                            let sim:Simbolo = new Simbolo(this.tipo,this.id,this.linea,this.columna,false);
                            ent.insert(sim);
                            break; 
                        }
                    case EnumTipo.double:
                        {
                            let sim:Simbolo = new Simbolo(this.tipo,this.id,this.linea,this.columna,0.0);
                            ent.insert(sim);
                            break; 
                        }
                    case EnumTipo.int:
                        {
                            let sim:Simbolo = new Simbolo(this.tipo,this.id,this.linea,this.columna,0);
                            ent.insert(sim);
                            break; 
                        }
                    case EnumTipo.string:
                        {
                            let sim:Simbolo = new Simbolo(this.tipo,this.id,this.linea,this.columna,"");
                            ent.insert(sim);
                            break; 
                        }
                }
            }
        } else {
            TablaError.addError({ tipo: "Sintactico", descripcion: "La variable " + this.id + " ya existe", fila: this.linea, columna: this.columna });
        }
        return null;
    }



}