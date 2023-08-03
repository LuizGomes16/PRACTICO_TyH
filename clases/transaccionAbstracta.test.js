
import {Nodo} from "./Nodo.js";
import {generateUUID, CrearOUT,CrearToken,CrearId, EsUUID, CalcularHash,EsFormatoId,EsFormatoOUT,EsFormatoToken, GenerarStrAleatorio} from "../funciones.js";
import {Blockchain} from "./BlockChain.js";
import {Bloque } from "./Bloque.js";

test("Test1: Verificar una transaccion normal el OUT tiene el formato correspondiente", () => { 
    let nod        = new Nodo();//primer nodo 
    let Blockch    = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
    let v_hash;
    let v_IN   = CrearId();                                          //ponemos cualquier IN, es solo para el testing.
    let v_ID   = CrearId();                                          //nuevo identificador, de la transaccion simple
    let v_st   = GenerarStrAleatorio(12);                              //string aleatorio de la transaccion simple, para hasherla
    let v_OUT  = CrearOUT();                    
    let trans  = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash
    expect(EsFormatoOUT(trans.getOUT())).toBe(true);

});



test("Test2: Verificar al crear una transaccion normal el tipo es Simple o Normal", () => { 
    let nod        = new Nodo();//primer nodo 
    let Blockch    = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
    let v_hash;
    let v_IN   = CrearId();                                          //ponemos cualquier IN, es solo para el testing.
    let v_ID   = CrearId();                                          //nuevo identificador, de la transaccion simple
    let v_st   = GenerarStrAleatorio(12);                              //string aleatorio de la transaccion simple, para hasherla
    let v_OUT  = CrearOUT();                    
    let trans  = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash
    expect(trans.getTipo()=="TransaccionSimple").toBe(true);

});


test("Test3: Verificar que el IN de la transaccion simple creada tenga el id de la transaccion coinBase", () => { 
    
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
//crea transacciones simples 60
//---------------------------------------------------------------------------------------------------------
while (contador <= 60) {
   v_IN   = v_ID_token;                      //la ultima que involucro el token, la ultima coinbase
   v_ID   = CrearId();                       //nuevo identificador, de la transaccion simple
   v_st = GenerarStrAleatorio(12);           //string aleatorio de la transaccion simple, para hasherla
   v_OUT= CrearOUT();                        //OUT es de la nueva transaccion, en este caso una normal
   transCoin.putOUT(v_OUT);
   trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //genera el hash cuando crea la transaccion simple 
   transSimple = trans;
   if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
   { {if (nod.getLleno() == true)      
      {let nodNuevo = new Nodo();  
       bloq        = new Bloque();
       nodNuevo.GuardarBloqueAbierto(bloq)  //pone el bloque nuevo como abierto  
       nod = nodNuevo;}
     bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
   }
   contador++;
  }
}
    expect(trans.getIN()==transCoin.getID()&& trans.getOUT()==transCoin.getOUT()).toBe(true);

});