
import {Nodo} from "./Nodo.js";
import {Blockchain} from "./BlockChain.js";
import {Bloque } from "./Bloque.js";

test("Test1: Verificar que se graba bien Coinbase", () => {     
   let nod        = new Nodo();                                    //primer nodo
   let Blockch    = new Blockchain();    
   let v_st       = "K4804lkn5";
   let Estrategia = nod.ElegirEstrategiaHash(Blockch);            //Elige la estrategia    
   let trans      = nod.CrearTransaccionCoinBase(Estrategia,v_st);//primera transaccion, la Coinbase, aca le asigna el valor de los atributos (OUT, token, entre otros)
expect(nod.ValidarTransaccion(Estrategia, v_st, trans)).toBe(true);
});

test("Test2: Agregar mas de 10 transacciones", () => { 
    let nod         = new Nodo();                                  //primer nodo 
    let contador    = 1;
    let bloq        = new Bloque();                                //primer Bloque
    let Blockch     = new Blockchain();
    let Estrategia  = nod.ElegirEstrategiaHash(Blockch);           //Elige la estrategia
    let v_st        = " ";
    let trans;
    //---------------------------------------------------------------------------------------------------------
    //crea transacciones simples, las que se quiere.
    //---------------------------------------------------------------------------------------------------------
    while (contador <= 11) {
       v_st = nod.GenerarStrAleatorio(12);                   //string aleatorio de la transaccion simple, para hasherla
       trans = nod.CrearTransaccionSimple(Estrategia, v_st); //Toca el OUT de la coinbase, y el In del normal 
       if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
       { bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
       }
       contador++;
    }
expect(nod.Tiene10TransBloqCerrados()).toBe(true);   
});

test("Test3: Verificar que se graba bien la normales", () => { 
    let v_st       = " ";
    let nod        = new Nodo();                                            //primer nodo 
    let Blockch    = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);                    //Elige la estrategia
    v_st           = nod.GenerarStrAleatorio(12);                          //string aleatorio de la transaccion simple, para hasherla
    let trans      = nod.CrearTransaccionSimple(Estrategia, v_st);         
expect(nod.ValidarTransaccion(Estrategia, v_st, trans)).toBe(true);
});

test("Test4: Verificar que se generan bien las compuestas", () => { 
    let nod         = new Nodo();                               //primer nodo 
    let trans;
    let Blockch     = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);         //Elige la estrategia
    let v_st = nod.GenerarStrAleatorio(12);                    //string aleatorio de la transaccion simple, para hasherla
    trans = nod.CrearTransaccionSimple(Estrategia, v_st);      //aca genera el hash 
    let transSimple = trans;                                  //graba una simple, para asignarla en la compuesta
//Creacion de las transacciones compuestas:
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
        v_st = " ";
        trans = nod.CrearTransaccionCompuesta();
expect(nod.ValidarTransaccion(Estrategia, v_st, trans)).toBe(true);
});

test("Test5: Verificar que la compuesta pueda superar el nivel", () => { 
     // 
     let nod         = new Nodo();                                //primer nodo 
     let trans;
     let Blockch     = new Blockchain();
     let Estrategia = nod.ElegirEstrategiaHash(Blockch);          //Elige la estrategia
     let v_st = nod.GenerarStrAleatorio(12);                      //string aleatorio de la transaccion simple, para hasherla
     trans = nod.CrearTransaccionSimple(Estrategia, v_st);         
     let transSimple = trans;                                     //para asignarla a una compuesta se guarda
 //grabacion de compuesta, pero que supere el nivel 
     const transSimple1 = transSimple;
     const transSimple2 = transSimple;
     const transSimple3 = transSimple;     
 //transacciones compuestas:
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
     trans.addTransaccion(transCompuesta3);
     trans.addTransaccion(transCompuesta4);
     trans = nod.CrearTransaccionCompuesta();
expect(trans.getNivel()>2).toBe(false);
});


test("Test7: Verificar nodo Lleno", () => { 
 // 
     let nod         = new Nodo();                                   //primer nodo 
     let contador    = 1;
     let bloq        = new Bloque();                                 //primer Bloque
     let Blockch     = new Blockchain();
     let Estrategia  = nod.ElegirEstrategiaHash(Blockch);            //Elige la estrategia
     let v_st        = " ";
     let trans;
 //---------------------------------------------------------------------------------------------------------
 //crea transacciones simples, las que se quiere
 //---------------------------------------------------------------------------------------------------------
   while (contador <= 51) {                                 //cada bloque cerrado son de 10 transacciones, 4*10= 40 (nodo lleno) 
                                                              
      v_st = nod.GenerarStrAleatorio(12);                   //string aleatorio de la transaccion simple, para hasherla
      trans = nod.CrearTransaccionSimple(Estrategia, v_st);  
      if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
      { bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
      }
       contador++;
    }
expect(nod.getLleno()).toBe(true);   
});

test("Test8: Verificar nodo no Lleno", () => { 
  // 
   let nod         = new Nodo();//primer nodo 
   let contador    = 1;
   let bloq        = new Bloque();                          //primer Bloque
   let Blockch     = new Blockchain();
   let Estrategia  = nod.ElegirEstrategiaHash(Blockch);     //Elige la estrategia
   let v_st        = " ";
   let trans;
 //---------------------------------------------------------------------------------------------------------
 //crea transacciones simples, las que se quiere
 //---------------------------------------------------------------------------------------------------------
   while (contador <= 8) {                                  
      v_st = nod.GenerarStrAleatorio(12);                   //string aleatorio de la transaccion simple, para hasherla
      trans = nod.CrearTransaccionSimple(Estrategia, v_st);  
      if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
      { bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
      }
      contador++;
   }
expect(nod.getLleno()).toBe(false);   
});