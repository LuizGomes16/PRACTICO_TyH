import {Nodo} from "./Nodo.js";
import {Blockchain} from "./BlockChain.js";
import {Bloque } from "./Bloque.js";
test("Test1: La blockChain local tiene exactamente 4 bloques, si se carga 51 transacciones ", () => { 
    let nod         = new Nodo();//primer nodo 
    let contador    = 1;
    let bloq        = new Bloque();                                 //primer Bloque
    let Blockch     = new Blockchain();
    let Estrategia = nod.ElegirEstrategiaHash(Blockch);            //Elige la estrategia
    let v_st;   
    let trans;  
    //---------------------------------------------------------------------------------------------------------
    //crea transacciones simples, las que se quiere
    //---------------------------------------------------------------------------------------------------------
    while (contador <= 51) {                                   //cada bloque cerrado son de 10 transacciones, 4*10= 40 (nodo lleno) 
                                                                
       v_st   = nod.GenerarStrAleatorio(12);                   //string aleatorio de la transaccion simple, para hashearla       
       trans = nod.CrearTransaccionSimple(Estrategia, v_st);  
       if (nod.ValidarTransaccion(Estrategia, v_st, trans)) 
       { bloq= nod.AdministrarBloques(Estrategia, bloq,trans); 
       }
       contador++;
    }
expect(nod.Blockchain.getCantBloquesCerrados()==4).toBe(true);      
});