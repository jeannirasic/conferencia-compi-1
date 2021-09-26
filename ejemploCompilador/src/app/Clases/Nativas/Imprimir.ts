import { Expresion } from '../Arbol/Expresion';
import { Instruccion } from '../Arbol/Instruccion';
import { Entorno } from '../Arbol/Entorno';
import { EnumTipo, Tipo } from '../Arbol/Tipo';
import { AppComponent } from 'src/app/app.component';

export class Imprimir extends Instruccion{ 

    exp: Expresion; 

    constructor(exp:Expresion, linea:number, columna:number){
        super(linea,columna); 
        this.exp = exp; 
    }
    
    public ejecutar(ent:Entorno){
        let res:Expresion = this.exp.obtenerValor(ent); 
        if(res.tipo.tipo !== EnumTipo.error){
            //console.log(res.valor.toString());
            AppComponent.salida += res.valor.toString() + "\n";
        }
        return null;  
    }
    
}
