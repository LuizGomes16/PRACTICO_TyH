//----------------------------------------------------------------------------------------------------------
//Comienzo MAIN
//----------------------------------------------------------------------------------------------------------
import {Nodo}       from './clases/Nodo.js';
import {Blockchain} from "./clases/BlockChain.js";
import {Bloque}     from "./clases/Bloque.js";
//---------------------------------------------------------------------------------------------------------
//creo nodo
//---------------------------------------------------------------------------------------------------------
let nod     = new Nodo();//primer nodo
//---------------------------------------------------------------------------------------------------------
//Crea nodos por "ahi", que seran los conocidos de los nodos que se estan creando, para hacer el broadcasting 
//ya que envia los bloques cerrados a los nodos conocidos, y estos lo agregan a su blockchain local
//---------------------------------------------------------------------------------------------------------
let nod1 = new Nodo();
let nod2 = new Nodo();
//---------------------------------------------------------------------------------------------------------
let v_st    = "K4804lkn5";
//---------------------------------------------------------------------------------------------------------
//Crea dos nodos que seran los conocidos
//---------------------------------------------------------------------------------------------------------
nod.putNodosConocidos(nod1);
nod.putNodosConocidos(nod2);           
//---------------------------------------------------------------------------------------------------------
let bloq    = new Bloque();//primer Bloque
let Blockch = new Blockchain();
let Estrategia = nod.ElegirEstrategiaHash(Blockch);       // Tomamos la decision de eligir la estrategia al principio, porque despues debe verificar que el hash 
                                                          //es el mismo que el guardado 
//console.log(Estrategia);
let trans     = nod.CrearTransaccionCoinBase(Estrategia,v_st);    //primera transaccion, la Coinbase, aca le asigna el valor de los atributos (OUT, token, entre otros)
//console.log(trans);
let transCoin= trans;                                             //guarda la transaccion coinbase 
if (nod.ValidarTransaccion(Estrategia, v_st, trans))
 { nod.GuardarBloqueAbierto(bloq)                                 //pone el bloque nuevo como abierto  
   bloq= nod.AdministrarBloques(Estrategia, bloq, trans);         //El nodo creado administra los bloques
 }   
//---------------------------------------------------------------------------------------------------------
//Para normales: Se crea transacciones normales  (o simples)
//---------------------------------------------------------------------------------------------------------
let contador    = 1;      //por si queremos crear mas de una transaccion simple
let transSimple = null;   //variable para guardar una transaccion para armar la compuesta mas adelante
//---------------------------------------------------------------------------------------------------------
//crea transacciones simples, las que se quiere
//---------------------------------------------------------------------------------------------------------
console.log(transCoin);  
while (contador <= 3) {
   v_st   = nod.GenerarStrAleatorio(12);                  //string aleatorio de la transaccion simple, para hashearla       
   trans = nod.CrearTransaccionSimple(Estrategia, v_st);  
   nod.IntercambioDatos(transCoin, trans);               //Toca el OUT de la coinbase, y el IN del normal   
   transSimple = trans;
   console.log(transCoin);      
   if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
    {if (nod.getLleno() == true)      
      {let nodNuevo = new Nodo();  
       bloq         = new Bloque();
       nodNuevo.GuardarBloqueAbierto(bloq)  //pone el bloque nuevo como abierto  
       nod = nodNuevo;}
     bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
     }
   else
    {console.log("incorrecto")};
  contador++;    
}
console.log(bloq);
   
//---------------------------------------------------------------------------------------------------------
//transacciones compuestas: las transacciones simples que tiene la compuestas esta bien formadas (son válidas)
//                          por ello no se verifcan despues
//---------------------------------------------------------------------------------------------------------
trans = nod.CrearTransaccionCompuesta();
let transCompuesta1 = nod.CrearTransaccionCompuesta();
let transCompuesta2 = nod.CrearTransaccionCompuesta();
let transCompuesta3 = nod.CrearTransaccionCompuesta();
let transCompuesta4 = nod.CrearTransaccionCompuesta();
transCompuesta1.addTransaccion(transSimple);
transCompuesta1.addTransaccion(transSimple);
transCompuesta2.addTransaccion(transCompuesta1);
transCompuesta3.addTransaccion(transCompuesta2);
transCompuesta4.addTransaccion(transCompuesta3);
trans.addTransaccion(transSimple);
trans.addTransaccion(transCompuesta1);
trans.addTransaccion(transCompuesta1);
console.log(trans.getNivel());
v_st = " ";                              //La transaccion compuesta como tal no tiene hash
if (nod.ValidarTransaccion(Estrategia, v_st, trans)==true) 
 {if (nod.getLleno() == true)      
    {let nodNuevo = new Nodo();  
     bloq         = new Bloque(bloq.getHash());
     nodNuevo.GuardarBloqueAbierto(bloq)  //pone el bloque nuevo como abierto     
     nod = nodNuevo;} 
   bloq= nod.AdministrarBloques(Estrategia, bloq,trans);      
  // console.log(trans.getNivel());
   }
else
{console.log("Error: No se puede supera en Niveles");
}

//---------------------------------------------------------------------------------------------------------
//FIN MAIN
//---------------------------------------------------------------------------------------------------------

    