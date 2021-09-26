import { Component, OnInit, OnDestroy } from "@angular/core";
import { Arbol } from "./Clases/Arbol/Arbol";
import { TablaError } from "./Clases/Errores/TablaError";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contenido: string = "";
  public static salida: string = "";
  fin: string = "/***Salida del archivo***/";

  constructor(){}

  compilar(){
    var parser = require('./Gramatica/gramatica');
    TablaError.listaErrores = new Array();
      try{
        let interprete: Arbol = parser.parse(this.contenido);
        AppComponent.salida = " ";
        this.fin = "";
        if(interprete.instrucciones != undefined){
          interprete.execute();
          this.fin += AppComponent.salida;
        }  
        for(let err of TablaError.listaErrores) {
          this.fin += TablaError.convertir(err);
        }      
      }catch(err){
        console.log(err);
        AppComponent.salida = " ";
         this.fin = "";
        for(let err of TablaError.listaErrores) {
          AppComponent.salida += TablaError.convertir(err);
        }
      }
  }

  limpiar(){
    this.contenido = "";
    AppComponent.salida = "";
    this.fin = "/***Salida del archivo***/";
    TablaError.listaErrores = new Array();
  }
}
