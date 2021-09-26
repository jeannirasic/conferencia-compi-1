/**
 * Ejemplo Intérprete Sencillo con Jison utilizando Nodejs y Angular en Windows
 */

/* Definición Léxica */

%lex
%options case-insensitive
%%

//Lo que se ignora------------------------------------------------------------------------------------------------------------
\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

//Palabras reservadas---------------------------------------------------------------------------------------------------------
"true"			    {console.log('Reconocio '+yytext+' truej'); return 'truej';}
"false"			    {console.log('Reconocio '+yytext+' falsej'); return 'falsej';}
"while"			    {console.log('Reconocio '+yytext+' whilej'); return 'whilej';}
"if"	     		{console.log('Reconocio '+yytext+' ifj'); return 'ifj';}
"else"		    	{console.log('Reconocio '+yytext+' elsej'); return 'elsej';}
"print"		    	{console.log('Reconocio '+yytext+' printj'); return 'printj';}
"char"			    {console.log('Reconocio '+yytext+' charj'); return 'charj';}
"boolean"		  	{console.log('Reconocio '+yytext+' booleanj'); return 'booleanj';}
"int"		    	{console.log('Reconocio '+yytext+' intj'); return 'intj';}
"double"			{console.log('Reconocio '+yytext+' doublej'); return 'doublej';}
"string"			{console.log('Reconocio '+yytext+' stringj'); return 'stringj';}

//Simbolos-------------------------------------------------------------------------------------------------------------------
"("					{console.log('Reconocio '+yytext+' pAperturaj'); return 'pAperturaj';}
")"					{console.log('Reconocio '+yytext+' pCierrej'); return 'pCierrej';}
"{"					{console.log('Reconocio '+yytext+' lAperturaj'); return 'lAperturaj';}
"}"					{console.log('Reconocio '+yytext+' lCierrej'); return 'lCierrej';}
";"					{console.log('Reconocio '+yytext+' puntoComaj'); return 'puntoComaj';}
"="					{console.log('Reconocio '+yytext+' igualj'); return 'igualj';}

//Expresiones regulares--------------------------------------------------------------------------------------------------------
//
["\""](("\\""\"")|[^"\""])*["\""]	{
										yytext = yytext.substr(1,yyleng-2);
										yytext = reemplazar(yytext);
										console.log('Reconocio '+yytext+' cadenaj');  
										return 'cadenaj'; 
									} 
[0-9]+"."[0-9]+\b  	                 {console.log('Reconocio '+yytext+' decimalj'); return 'decimalj';}
[0-9]+\b				             {console.log('Reconocio '+yytext+' enteroj'); return 'enteroj'; }
([a-zA-Z])[a-zA-Z0-9ñÑ]+\b	         { yytext = yytext.toLowerCase(); console.log('Reconocio '+yytext+' identificadorj'); return 'identificadorj';} 

//Otros------------------------------------------------------------------------------------------------------------------------
<<EOF>>				return 'EOF';
.					{
						console.error('Error léxico: ['+yytext+']\n Linea: '+(yylloc.first_line-1)+', columna: '+yylloc.first_column);
						TablaError.addErrorGramatica('Lexico', 'Caracter [' + yytext + '] desconocido' , (yylloc.first_line-1), yylloc.first_column);
					}

/lex


%{
	function reemplazar(st) {
      st = buscar(st, "\\n", "\n");
      st = buscar(st, "\\N", "\n");
      st = buscar(st, "\\r", "\r");
      st = buscar(st, "\\R", "\r");
      st = buscar(st, "\\t", "\t");
      st = buscar(st, "\\T", "\t");
      st = buscar(st, "\\\"", "\"");
	  st = buscar(st, "\\\\", "\\");
      return st;
    }
    function buscar(cadena, existente, sustituto) {
      return cadena.split(existente).join(sustituto);
    }
	const {Arbol} = require('../Clases/Arbol/Arbol');
	var {Bloque} = require('../Clases/Arbol/Bloque.ts');
	var {Primitivo} = require('../Clases/Arbol/Primitivo.ts');
	var {Tipo, EnumTipo } = require('../Clases/Arbol/Tipo.ts');
	var {While} = require('../Clases/Ciclos/While.ts');
	var {Condicion} = require('../Clases/Condicional/Condicion.ts'); 
	var {If} = require('../Clases/Condicional/If.ts'); 
	var {TablaError} = require('../Clases/Errores/TablaError.ts');
	var {Asignacion} = require('../Clases/Nativas/Asignacion.ts'); 
	var {Declaracion} = require('../Clases/Nativas/Declaracion.ts'); 
	var {Id} = require('../Clases/Nativas/Id.ts');
	var {Imprimir} = require('../Clases/Nativas/Imprimir.ts'); 
	 
	
%}

%start INICIO

%% /* Definición de la gramática */

INICIO
	: CONTENIDO EOF { 
		let instrucciones = $1;
		let arbolito = new Arbol(instrucciones);
		return arbolito;
	}
;

CONTENIDO
	: LISTASENTENCIAS { $$ = $1; }
	| { $$ = new Array(); }
;

LISTASENTENCIAS
	: LISTASENTENCIAS SENTENCIA { let arreglo1 = $1; arreglo1.push($2); $$ = arreglo1; }
	| SENTENCIA { let arregloNuevo = new Array(); arregloNuevo.push($1); $$ = arregloNuevo; }
	| error { 
		console.error('Error sintáctico [' + yytext + '] \n Linea: ' + (this._$.first_line-1) + ', columna: ' + this._$.first_column);
		TablaError.addErrorGramatica('Sintactico', 'Error, no se esperaba el lexema: ' + yytext , (this._$.first_line-1), this._$.first_column);	
	}
;

SENTENCIA 
	: DECLARACION puntoComaj { $$ = $1; }
	| ASIGNACION puntoComaj { $$ = $1; }
	| PRINT puntoComaj { $$ = $1; }
	| SENTENCIAIF { $$ = $1; }
	| SENTENCIAWHILE { $$ = $1; }
	| error { 
		console.error('Error sintáctico [' + yytext + '] \n Linea: ' + (this._$.first_line-1) + ', columna: ' + this._$.first_column);
		TablaError.addErrorGramatica('Sintactico', 'Error, no se esperaba el lexema: ' + yytext , (this._$.first_line-1), this._$.first_column);	 
	}
;

//DECLARACION----------------------------------------------------------------------------------------------------------------------------
DECLARACION
	: TIPO identificadorj igualj E { $$ = new Declaracion($1,$2,$4,@2.first_line, @2.first_column); }
	| TIPO identificadorj { $$ = new Declaracion($1,$2,null,@2.first_line, @2.first_column); }
;

TIPO
	: intj { $$ = new Tipo(EnumTipo.int); }
	| booleanj { $$ = new Tipo(EnumTipo.boolean); }
	| doublej { $$ = new Tipo(EnumTipo.double); } 
	| stringj { $$ = new Tipo(EnumTipo.string); }
;

//BLOQUE--------------------------------------------------------------------------------------------------------------------------
BLOQUE
	: lAperturaj lCierrej { $$ = new Bloque(new Array(),  @1.first_line, @1.first_column); }
	| lAperturaj LISTAINSTRUCCIONES lCierrej { $$ = new Bloque($2, @1.first_line, @1.first_column); }
;

LISTAINSTRUCCIONES
	:LISTAINSTRUCCIONES INSTRUCCION {  let nArreglo = $1; nArreglo.push($2); $$ = nArreglo;  }
	| INSTRUCCION {  let arreglo = new Array(); arreglo.push($1); $$ = arreglo; }
;

INSTRUCCION
	: DECLARACION puntoComaj  {  $$ = $1;   }
	| ASIGNACION puntoComaj { $$ = $1; }  
	| SENTENCIAIF { $$ = $1; } 
	| SENTENCIAWHILE { $$ = $1; } 
	| PRINT puntoComaj { $$ = $1; }
	| error { 
		console.error('Error sintáctico [' + yytext + '] \n Linea: ' + (this._$.first_line-1) + ', columna: ' + this._$.first_column);
		TablaError.addErrorGramatica('Sintactico', 'Error, no se esperaba el lexema: ' + yytext , (this._$.first_line-1), this._$.first_column);	 
	}
;

//ASIGNACIONES-------------------------------------------------------------------------------------------------------------------------
ASIGNACION
	: identificadorj igualj E { $$ = new Asignacion($1,$3,@2.first_line, @2.first_column); }
;

//SENTENCIA IF-------------------------------------------------------------------------------------------------------------------------
SENTENCIAIF
	: LISTACONDICIONES elsej BLOQUE {  $$ = new If($1,$3,@1.first_line, @1.first_column); }
	| LISTACONDICIONES { $$ = new If($1,null,@1.first_line, @1.first_column); }
;

LISTACONDICIONES 
	: LISTACONDICIONES elsej ifj pAperturaj E pCierrej BLOQUE { let nArrayCondicion = $1; nArrayCondicion.push(new Condicion($5,$7,@2.first_line, @2.first_column)); $$ = nArrayCondicion; }
	| ifj pAperturaj E pCierrej BLOQUE { let arrayCondicion = new Array(); arrayCondicion.push(new Condicion($3,$5,@1.first_line, @1.first_column)); $$ = arrayCondicion; }
;

//SENTENCIA WHILE---------------------------------------------------------------------------------------------------------------------
SENTENCIAWHILE 
	: whilej pAperturaj E pCierrej BLOQUE { $$ = new While($3, $5, @1.first_line, @1.first_column); }
;

//PRINT------------------------------------------------------------------------------------------------------------------------------
PRINT
	: printj pAperturaj E pCierrej { $$ = new Imprimir($3, @1.first_line, @1.first_column); }
;

//Expresiones--------------------------------------------------------------------------------------------------------------------------
E
	: enteroj { $$ = new Primitivo($1,new Tipo(EnumTipo.int),@1.first_line, @1.first_column); } 
	| decimalj { $$ = new Primitivo($1, new Tipo(EnumTipo.double),@1.first_line, @1.first_column); }    
	| truej { $$ = new Primitivo(1, new Tipo(EnumTipo.boolean),@1.first_line, @1.first_column); }  
	| falsej { $$ = new Primitivo(0, new Tipo(EnumTipo.boolean),@1.first_line, @1.first_column); }  
	| cadenaj { $$ = new Primitivo($1,new Tipo(EnumTipo.string),@1.first_line, @1.first_column); }	
	| identificadorj { $$ = new Id($1,@1.first_line, @1.first_column); } 
;
