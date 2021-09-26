import { ErrorProyecto } from './ErrorProyecto';

export class TablaError{
    public static listaErrores: ErrorProyecto[] = new Array();

    public static addError(e: ErrorProyecto){
        TablaError.listaErrores.push(e);
    }

    public static addErrorGramatica(tipo: string, descripcion: string, fila: number, columna: number){
        var err:ErrorProyecto = {
            tipo: tipo,
            descripcion: descripcion,
            fila: fila,
            columna: columna
        };
        
        TablaError.listaErrores.push(err);
    }

    public static convertir(error: ErrorProyecto): string{
        return "Error " + error.tipo + " [ " + error.descripcion + " ] en la fila " + error.fila + " y columna " + error.columna + "\n";
    }

}


