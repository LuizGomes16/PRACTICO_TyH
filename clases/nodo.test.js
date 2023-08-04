
import {Nodo} from "./Nodo.js";
import {generateUUID, CrearOUT,CrearToken,CrearId, EsUUID, CalcularHash,EsFormatoId,EsFormatoOUT,EsFormatoToken, GenerarStrAleatorio} from "../funciones.js";
import {Blockchain} from "./BlockChain.js";
import {Bloque } from "./Bloque.js";


test("Test1: Verificar que se graba bien Coinbase", () => {     
 let v_ID    = CrearId();                  //el identificador de la transaccion
 let v_TKN   = CrearToken();               //id del token, el que es transferido de transaccion a otra. en coinbase se guarda el token.
 let v_OUT   = CrearOUT();                 //direccion del nuevo dueño
 let v_st    = "K4804lkn5";
 let nod     = new Nodo();//primer nodo
 let Blockch = new Blockchain();
 let Estrategia = nod.ElegirEstrategiaHash(Blockch);            //Elige la estrategia    
 let v_hash = " ";
 let trans      = nod.CrearTransaccionCoinBase(Estrategia,v_st, v_OUT, v_ID, v_hash, v_TKN);//primera transaccion, aca genera el hash 
 expect(nod.ValidarTransaccion(Estrategia, v_st, trans)).toBe(true);
});

test("Test2: Agregar mas de 10 transacciones", () => { 
    let nod         = new Nodo();//primer nodo 
    let contador    = 1;
    let v_IN;
    let v_ID;   
    let v_st;     
    let trans;
    let v_OUT;
    let bloq        = new Bloque();                                //primer Bloque
    let Blockch     = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);            //Elige la estrategia
    let v_hash;
    //---------------------------------------------------------------------------------------------------------
    //crea transacciones simples, las que se quiere, aca no actualizamos la coinbase porque no se tiene
    //---------------------------------------------------------------------------------------------------------
    while (contador <= 11) {
       v_IN   = CrearId();                       //ponemos cualquier IN, es solo para el testing.
       v_ID   = CrearId();                       //nuevo identificador, de la transaccion simple
       // v_st   = "frweg9080";                  //string de la transaccion simple no aleatorio, para hasherla
       v_st = GenerarStrAleatorio(12);           //string aleatorio de la transaccion simple, para hasherla
       v_OUT= CrearOUT();                        //OUT es de la nueva transaccion, en este caso una normal
       trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash
       //console.log(trans);
       if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
       { bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
       }
       contador++;
    }
    expect(nod.Tiene10TransBloqCerrados()).toBe(true);   
});

test("Test3: Verificar que se graba bien la normales", () => { 
    let nod         = new Nodo();//primer nodo 
    let v_IN;
    let v_ID;   
    let v_st;     
    let trans;
    let v_OUT;
    let Blockch     = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
    let v_hash;
    v_IN   = CrearId();                                          //ponemos cualquier IN, es solo para el testing.
    v_ID   = CrearId();                                          //nuevo identificador, de la transaccion simple
    v_st = GenerarStrAleatorio(12);                              //string aleatorio de la transaccion simple, para hasherla
    v_OUT= CrearOUT();                    
    trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash
    expect(nod.ValidarTransaccion(Estrategia, v_st, trans)).toBe(true);
});

test("Test4: Verificar que se graba bien las compuestas", () => { 
    // 
    let nod         = new Nodo();//primer nodo 
    let v_IN;
    let v_ID;   
    let v_st;     
    let trans;
    let v_OUT;
    let Blockch     = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
    let v_hash;
    v_IN   = CrearId();                                          //ponemos cualquier IN, es solo para el testing.
    v_ID   = CrearId();                                          //nuevo identificador, de la transaccion simple
    v_st = GenerarStrAleatorio(12);                              //string aleatorio de la transaccion simple, para hasherla
    v_OUT= CrearOUT();                    
    trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash //graba una simple, para tener la forma de una
    let transSimple = trans;
  //grabacion de compuesta 
     v_st = " ";    
    const transSimple1 = transSimple;
    const transSimple2 = transSimple;
    const transSimple3 = transSimple;
    let transCompuesta0 = [transSimple1];
    let transCompuesta1 = [transCompuesta0];
    let transCompuesta2 = [transCompuesta1];
    let transCompuesta3 = [transCompuesta2];
    let transCompuesta4 = [transSimple1, transSimple2, transSimple3];
    let transCompuesta5 = [transSimple1, transSimple2, transSimple3];    
    let transCompuesta  = [transSimple1,transSimple2,transSimple3];
    trans = nod.CrearTransaccionCompuesta(transCompuesta);
    expect(nod.ValidarTransaccion(Estrategia, v_st, trans)).toBe(true);
});

test("Test5: Verificar que la compuesta supere el nivel", () => { 
    // 
     // 
     let nod         = new Nodo();//primer nodo 
     let v_IN;
     let v_ID;   
     let v_st;     
     let trans;
     let v_OUT;
     let Blockch     = new Blockchain();
     let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
     let v_hash;
     v_IN   = CrearId();                                          //ponemos cualquier IN, es solo para el testing.
     v_ID   = CrearId();                                          //nuevo identificador, de la transaccion simple
     v_st = GenerarStrAleatorio(12);                              //string aleatorio de la transaccion simple, para hasherla
     v_OUT= CrearOUT();                    
     trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash //graba una simple, para tener la forma de una
     let transSimple = trans;
   //grabacion de compuesta, pero que supere el nivel 
      v_st = " ";    
     const transSimple1 = transSimple;
     const transSimple2 = transSimple;
     const transSimple3 = transSimple;
     let transCompuesta0 = [transSimple1];
     let transCompuesta1 = [transCompuesta0];
     let transCompuesta2 = [transCompuesta1];
     let transCompuesta3 = [transCompuesta2];
     let transCompuesta4 = [transSimple1, transSimple2, transSimple3];
     let transCompuesta5 = [transSimple1, transSimple2, transSimple3];    
     let transCompuesta  = [transSimple1,transSimple2, transCompuesta3];
     trans = nod.CrearTransaccionCompuesta(transCompuesta);
     expect(nod.ValidarTransaccion(Estrategia, v_st, trans)).toBe(false);
});

test("Test6: Verificar que la compuesta no supere el nivel", () => { 
    // 
     // 
     let nod         = new Nodo();//primer nodo 
     let v_IN;
     let v_ID;   
     let v_st;     
     let trans;
     let v_OUT;
     let Blockch     = new Blockchain();
     let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
     let v_hash;
     v_IN   = CrearId();                                          //ponemos cualquier IN, es solo para el testing.
     v_ID   = CrearId();                                          //nuevo identificador, de la transaccion simple
     v_st = GenerarStrAleatorio(12);                              //string aleatorio de la transaccion simple, para hasherla
     v_OUT= CrearOUT();                    
     trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash //graba una simple, para tener la forma de una
     let transSimple = trans;
   //grabacion de compuesta, pero que supere el nivel 
      v_st = " ";    
     const transSimple1 = transSimple;
     const transSimple2 = transSimple;
     const transSimple3 = transSimple;
     let transCompuesta0 = [transSimple1];
     let transCompuesta1 = [transCompuesta0];
     let transCompuesta2 = [transCompuesta1];
     let transCompuesta3 = [transCompuesta2];
     let transCompuesta4 = [transSimple1, transSimple2, transSimple3];
     let transCompuesta5 = [transSimple1, transSimple2, transSimple3];    
     let transCompuesta  = [transSimple1,transSimple2,transSimple3];
     trans = nod.CrearTransaccionCompuesta(transCompuesta);
     expect(nod.ValidarTransaccion(Estrategia, v_st, trans)).toBe(true);
});

test("Test6: Verificar nodo Lleno", () => { 
    // 
    let nod         = new Nodo();//primer nodo 
    let contador    = 1;
    let v_IN;
    let v_ID;   
    let v_st;     
    let trans;
    let v_OUT;
    let bloq        = new Bloque();                            //primer Bloque
    let Blockch     = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);            //Elige la estrategia
    let v_hash;
    //---------------------------------------------------------------------------------------------------------
    //crea transacciones simples, las que se quiere
    //---------------------------------------------------------------------------------------------------------
    while (contador <= 51) {                     //cada bloque cerrado son de 10 transacciones, 4*10= 40 (nodo lleno), pero sabe que esta lleno cuando quiere 
                                                 //cargar otro bloque cerrado, por eso 51. 
       v_IN   = CrearId();                       //ponemos cualquier IN, es solo para el testing.
       v_ID   = CrearId();                       //nuevo identificador, de la transaccion simple
       // v_st   = "frweg9080";                  //string de la transaccion simple no aleatorio, para hasherla
       v_st = GenerarStrAleatorio(12);           //string aleatorio de la transaccion simple, para hasherla
       v_OUT= CrearOUT();                        //OUT es de la nueva transaccion, en este caso una normal
       trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash
       if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
       { bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
       }
       contador++;
    }
    expect(nod.getLleno()).toBe(true);   
});

test("Test7: Verificar nodo no Lleno", () => { 
    // 
    let nod         = new Nodo();//primer nodo 
    let contador    = 1;
    let v_IN;
    let v_ID;   
    let v_st;     
    let trans;
    let v_OUT;
    let bloq        = new Bloque();                            //primer Bloque
    let Blockch     = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);            //Elige la estrategia
    let v_hash;
    //---------------------------------------------------------------------------------------------------------
    //crea transacciones simples, las que se quiere
    //---------------------------------------------------------------------------------------------------------
    while (contador <= 10) {                     // con solo 10 esta vacio el bloque
       v_IN   = CrearId();                       //ponemos cualquier IN, es solo para el testing.
       v_ID   = CrearId();                       //nuevo identificador, de la transaccion simple
       // v_st   = "frweg9080";                  //string de la transaccion simple no aleatorio, para hasherla
       v_st = GenerarStrAleatorio(12);           //string aleatorio de la transaccion simple, para hasherla
       v_OUT= CrearOUT();                        //OUT es de la nueva transaccion, en este caso una normal
       trans = nod.CrearTransaccionSimple(Estrategia, v_st, v_OUT, v_ID, v_hash, v_IN); //aca genera el hash
       if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
       { bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
       }
       contador++;
    }
    expect(nod.getLleno()).toBe(false);   
});