//----------------------------------------------------------------------------------------------------------
//Comienzo MAIN
//----------------------------------------------------------------------------------------------------------
import {generateUUID, CrearOUT,CrearToken,CrearId, EsUUID, CalcularHash,EsFormatoId,EsFormatoOUT,EsFormatoToken, GenerarStrAleatorio} from "./funciones.js";
import {Nodo}       from './clases/Nodo.js';
import {Blockchain} from "./clases/BlockChain.js";
import {Bloque}     from "./clases/Bloque.js";

//---------------------------------------------------------------------------------------------------------
//crea nodos por "ahi", que seran los conocidos del los nodos que se estan creando, para hacer el broadcasting 
//ya que envia los bloques cerrados a los nodos conocidos, y estos lo agregan a su blockchain local
//---------------------------------------------------------------------------------------------------------
let nod1 = new Nodo();
let nod2 = new Nodo();
//---------------------------------------------------------------------------------------------------------
let v_ID   = CrearId();                  //el identificador de la transaccion
let v_ID_token = v_ID;                   //Resguardo el Id que tiene el token (ultima coinbase)
let v_TKN  = CrearToken();               //id del token, el que es transferido de transaccion a otra. en coinbase se guarda el token.
let v_IN   = v_ID;                       //contiene el id de la ultima transaccion que involucra el token
let v_OUT  = CrearOUT();                 //direccion del nuevo dueño
let v_st    = "K4804lkn5";
//---------------------------------------------------------------------------------------------------------
//creo transaccion y nodo
let nod     = new Nodo();//primer nodo
//---------------------------------------------------------------------------------------------------------
//asigna nodos conocidos
nod.putNodosConocidos(nod1);
nod.putNodosConocidos(nod2);           
//---------------------------------------------------------------------------------------------------------
let bloq    = new Bloque();//primer Bloque
let Blockch = new Blockchain();
let Estrategia = nod.ElegirEstrategiaHash(Blockch);            //Tomamos la decesicion de eligir la estrategia al principio  
                                                               //        porque despues debe verificar que es el mismo que el guardado 
//console.log(Estrategia);
let v_hash = " ";
let trans      = nod.CrearTransaccionCoinBase(Estrategia,v_st, v_OUT, v_ID, v_hash, v_TKN);//primera transaccion, aca genera el hash 
let transCoin= trans;                                                                     //guarda la transaccion coinbase, asumimos que crea solo uno al principio
//console.log(trans);
if (nod.ValidarTransaccion(Estrategia, v_st, trans))
 { nod.GuardarBloqueAbierto(bloq)                                                        //pone el bloque nuevo como abierto  
   bloq= nod.AdministrarBloques(Estrategia, bloq, trans);
   }
//---------------------------------------------------------------------------------------------------------
//Para normales:
//           Se crea transacciones normales  (o simples)
//---------------------------------------------------------------------------------------------------------
let contador    = 1;
let transSimple = null;
//---------------------------------------------------------------------------------------------------------
//crea transacciones simples, las que se quiere
//---------------------------------------------------------------------------------------------------------
while (contador <= 1) {
   //console.log("----------------")
   //console.log(contador);
   v_IN   = v_ID_token;                      //la ultima que involucro el token, la ultima coinbase
   v_ID   = CrearId();                       //nuevo identificador, de la transaccion simple
   // v_st   = "frweg9080";                  //string de la transaccion simple no aleatorio, para hasherla
   v_st = GenerarStrAleatorio(12);           //string aleatorio de la transaccion simple, para hasherla
   v_OUT= CrearOUT();                        //OUT es de la nueva transaccion, en este caso una normal
   transCoin.putOUT(v_OUT);
   trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //genera el hash cuando crea la transaccion simple 
   transSimple = trans;
   console.log(transCoin);
   console.log(trans);
   if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
   { {if (nod.getLleno() == true)      
      {//console.log("nuevo nodo");
       //console.log(nod);
       let nodNuevo = new Nodo();  
       bloq        = new Bloque();
       nodNuevo.GuardarBloqueAbierto(bloq)  //pone el bloque nuevo como abierto  
       //nodNuevo.AgregaElHashBloqueAnterior(bloq, bloqAnt.getHash());  //Esta no va porque: 
                                                                        //segun el dibujo, el primer bloque del nodo, no tiene el hash del bloque anterior que es del nodo anterior
       nod = nodNuevo;}
     bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
   }
   contador++;
  }
}
   
//---------------------------------------------------------------------------------------------------------
//transacciones compuestas:
//      Usamos la ultima transaccion normal creada
//---------------------------------------------------------------------------------------------------------
const transSimple1 = transSimple;
const transSimple2 = transSimple;
const transSimple3 = transSimple;
let transCompuesta0 = [transSimple1];
let transCompuesta1 = [transCompuesta0];
let transCompuesta2 = [transCompuesta1];
let transCompuesta3 = [transCompuesta2];
let transCompuesta4 = [transSimple1, transSimple2, transSimple3];
let transCompuesta5 = [transSimple1, transSimple2, transSimple3];
//---------------------------------------------------------------------------------------------------------
//Set de transacciones compuestas para probar 
//---------------------------------------------------------------------------------------------------------
  let transCompuesta  = [transCompuesta4,transCompuesta5, transSimple1];//compuesta de compuesta1, compuesta2 y una simple.
//   let transCompuesta  = [transCompuesta0,transSimple1, transSimple2];//simple1, simple1, compuesta de compuesta, 
//  let transCompuesta  = [transSimple1,transSimple2, transCompuesta3];//simple1, simple1, compuesta de compuesta.
//  let transCompuesta  = [transSimple1,transSimple2,transCompuesta0];//simple1, simple2, compuesta.
//   let transCompuesta  = [transSimple1,transSimple2,transSimple3];//simple1, simple2, simple3.
//---------------------------------------------------------------------------------------------------------
//Creacion de Transacciones compuestas
//---------------------------------------------------------------------------------------------------------
trans = nod.CrearTransaccionCompuesta(transCompuesta);
console.log(trans);
v_st = " ";
if (nod.ValidarTransaccion(Estrategia, v_st, trans)==true) 
 {if (nod.getLleno() == true)      
    {let nodNuevo = new Nodo();  
     bloq         = new Bloque(bloq.getHash());
     nodNuevo.GuardarBloqueAbierto(bloq)  //pone el bloque nuevo como abierto     
     nod = nodNuevo;} 
   bloq= nod.AdministrarBloques(Estrategia, bloq,trans);      
   bloq.SacarSimples(trans, transCoin);
   }
else
{console.log("No se puede supera en Niveles");
}

//---------------------------------------------------------------------------------------------------------
//FIN MAIN
//---------------------------------------------------------------------------------------------------------

    