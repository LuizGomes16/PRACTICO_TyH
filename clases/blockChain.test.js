
import {Nodo} from "./Nodo.js";
import {generateUUID, CrearOUT,CrearToken,CrearId, EsUUID, CalcularHash,EsFormatoId,EsFormatoOUT,EsFormatoToken, GenerarStrAleatorio} from "../funciones.js";
import {Blockchain} from "./BlockChain.js";
import {Bloque } from "./Bloque.js";


test("Test1: La blockChain local no tenga mas de 4 bloques ", () => { 
    let nod         = new Nodo();//primer nodo 
    let contador    = 1;
    let v_IN;
    let v_ID;   
    let v_st;     
    let trans;
    let v_OUT;
    let bloq        = new Bloque();                                 //primer Bloque
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
    expect(nod.Blockchain.getCantBloquesCerrados()==4).toBe(true);   
   
});