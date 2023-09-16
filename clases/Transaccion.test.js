
import {Nodo} from "./Nodo.js";
import {Blockchain} from "./BlockChain.js";
import {Bloque } from "./Bloque.js";

test("Test1: Verificar una transaccion normal el OUT tiene el formato correspondiente", () => { 
    let nod        = new Nodo();//primer nodo 
    let Blockch    = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
    let v_st   = nod.GenerarStrAleatorio(12);                    //string aleatorio de la transaccion simple, para hasherla
    let trans  = nod.CrearTransaccionSimple(Estrategia, v_st); 
expect(trans.EsFormatoOUT(trans.getOUT())).toBe(true);

});

test("Test2: Verificar al crear una transaccion normal el tipo es Simple o Normal", () => { 
    let nod        = new Nodo();//primer nodo 
    let Blockch    = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
    let v_st   = nod.GenerarStrAleatorio(12);                   //string aleatorio de la transaccion simple, para hasherla
    let trans  = nod.CrearTransaccionSimple(Estrategia, v_st); 
expect(trans.getTipo()=="TransaccionSimple").toBe(true);

});


test("Test3: Verificar que el IN de la transaccion simple creada tenga el id de la transaccion coinBase", () => { 
    
//---------------------------------------------------------------------------------------------------------
//creo transaccion y nodo
let nod     = new Nodo();//primer nodo
//---------------------------------------------------------------------------------------------------------
let bloq    = new Bloque();//primer Bloque
let Blockch = new Blockchain();
let Estrategia = nod.ElegirEstrategiaHash(Blockch);            //Tomamos la decesicion de eligir la estrategia al principio  
                                                               //        porque despues debe verificar que es el hash guardado es el mismo
//console.log(Estrategia);
let  v_st      = nod.GenerarStrAleatorio(12);                  //string aleatorio de la transaccion simple, para hashearla 
let trans      = nod.CrearTransaccionCoinBase(Estrategia,v_st);//primera transaccion
let transCoin  = trans;                                        //guarda la transaccion coinbase, asumimos que crea solo uno al principio
//console.log(trans);
if (nod.ValidarTransaccion(Estrategia, v_st, trans))
 { nod.GuardarBloqueAbierto(bloq)                              //pone el bloque nuevo como abierto  
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
   v_st   = nod.GenerarStrAleatorio(12);                  //string aleatorio de la transaccion simple, para hashearla       
   trans = nod.CrearTransaccionSimple(Estrategia, v_st);  
   nod.IntercambioDatos(transCoin, trans);               //Toca el OUT de la coinbase, y el In del normal   
   transSimple = trans;   
   if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
   { {if (nod.getLleno() == true)      
      {let nodNuevo = new Nodo();  
       bloq         = new Bloque();
       nodNuevo.GuardarBloqueAbierto(bloq)  //pone el bloque nuevo como abierto  
       nod = nodNuevo;}
     bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
   }
   contador++;
  }
}
expect(trans.getIN()==transCoin.getID()&& trans.getOUT()==transCoin.getOUT()).toBe(true);

});