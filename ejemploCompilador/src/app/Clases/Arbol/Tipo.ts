export class Tipo{

    public tipo: EnumTipo;
    public nombreTipo: string; 

    constructor(tipo: EnumTipo, nombreTipo?: string){
        this.tipo = tipo;
        if(nombreTipo === undefined){ 
            this.nombreTipo = "vacio";
        }else{
            this.nombreTipo = nombreTipo; 
        }
    }  
    
}

export enum EnumTipo{
    int, double, boolean, string, //primitivos 
    error //Otros
}
