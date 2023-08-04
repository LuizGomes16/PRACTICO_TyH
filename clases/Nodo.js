//
import {TransacccionAbstracta, TransacccionLeaf, CoinBase, TransaccionSimple, TransaccionCompuesta} from "./TransaccionAbstracta.js";
//import {Bloque}                                                                                     from "./clases/Bloque.js";
import {generateUUID, CrearOUT,CrearToken,CrearId, EsUUID, CalcularHash,EsFormatoId,EsFormatoOUT,EsFormatoToken, GenerarStrAleatorio}  from "../funciones.js"
import {Blockchain} from "./BlockChain.js";
import {Bloque } from "./Bloque.js";
export {Nodo};  
 

class Nodo {
    
    constructor() {
      this.Blockchain=new Blockchain(); //Blockchain local
      this.Open=null;                   //mantiene el bloque abierto
      this.Lleno=false;                 //atributo que representa si esta lleno o no el nodo
      this.NodoConocidos = [];          //tiene una lista de nodos conocidos
    }
    getBlockchain(){
      return(this.Blockchain);
    }

    getLleno()
     {return(this.Lleno);
    }
    getOpen(){
      return(this.Open);
    }  
    getNodosConocidos(){
      return(this.NodoConocidos);
    }
    putNodosConocidos(nod){
      this.NodoConocidos.push(nod);
    }
    putOpen(bloq){
      this.Open=bloq;
    } 
    putLleno() {
      this.Lleno=true;
    }
    putBlockchain(blockC){
      this.Blockchain=blockC;
    }      
                           
   CrearTransaccionCoinBase(Estrategia, v_st, v_OUTA, v_IDA, v_hashA, v_TKNA) {
      v_hashA        = this.getBlockchain().CalcularHash(Estrategia, v_st);    //hash de un string
      const tran = new CoinBase(
      {v_token: v_TKNA,
       v_output: v_OUTA,  
       v_ID: v_IDA, 
       v_hash: v_hashA,
       v_out: v_OUTA});               
      return (tran);
      }

   CrearTransaccionCompuesta(comp) {
       const tran = new TransaccionCompuesta(); 
       tran.putTransacciones(comp);      
       tran.putNivel()
       tran.putCantTransacciones();
       return(tran);       
      }
     
       
   CrearTransaccionSimple(Estrategia, v_st, v_OUTA, v_IDA, v_hashA, v_INA) {
          v_hashA        = this.getBlockchain().CalcularHash(Estrategia, v_st);    //hash de un string                          
          const tran = new TransaccionSimple(
            {v_in: v_INA,
             v_output: v_OUTA,  
             v_ID: v_IDA, 
             v_hash: v_hashA});               
            return (tran);            
       }     
    
     
   
   GuardarBloqueAbierto(bloq){
        this.putOpen(bloq);  
    }      

   IncorporarBloqueCerrado(bloq)
        { if (this.Blockchain.HayMasLugar())
          {this.Blockchain.putCantBloquesCerrados();
           this.Blockchain.putBloquesCerrados(bloq); 
           if (this.Blockchain.HayMasLugar()==false)
           {this.putLleno()}  //actualizo que esta lleno
          }
          else //El nodo esta lleno
          { this.putLleno();          
          }  
        }
  
     
    
    
   ElegirEstrategiaHash(blch)
     {return (blch.ElegirEstrategiaHash());
     }
   AgregaElHashBloqueAnterior(bloqNuevo, hash)
   {bloqNuevo.putPrev(hash);  
   }

   AdministrarBloques(Est, bloq, trans) {    
        if (bloq.DejarAdmitirTransacciones())                               //bloque lleno, el nodo no esta lleno.
          { 
            let bloqNuevo = this.CrearBloqueNuevo();                        //crea un bloque nuevo                 
            //Cierra el bloque
            bloq.CompletarInformacion(Est);                                 //este bloque pasa a ser el bloque anterior, porque esta lleno
            this.IncorporarBloqueCerrado(bloqNuevo);                        //se agrega a la blockchain local
            this.RealizarBroadcast();                                       //El nuevo nodo es replicado
            //sobre el nuevo bloque
              this.RegistrarNuevaTransaccion(bloqNuevo,trans);
              this.putOpen(bloqNuevo);                                      //pone el bloque como abierto  
              this.AgregaElHashBloqueAnterior(bloqNuevo, bloq.getHash());   //agrega el Hash del bloque Anterior            
            //console.log(bloq);  
            //console.log(bloqNuevo);  
            return (bloqNuevo);                         
           }
        else 
           { bloq.AdmitirTransaccion(trans);
             return(bloq)}; 
      }
          
      
      
   ValidarTransaccion(Estrategia, st, trans) {
        //---------------------------------------------------------------------------------------------------------
        //Necesitamos extraer cada uno de los campos de la transaccion y verificarlos  
        //st: trae el string con que se calculo el hash
        //Estrategia: se pasa como parametro para que sea generado exactamente igual a la original
        //---------------------------------------------------------------------------------------------------------
        let tipo= trans.getTipo();
        if (tipo == "TransaccionSimple")
        {let out =  trans.getOUT();                    //de la forma A-<VALOR>,que sea la direccion del nuevo dueño
         let id   = trans.getID();                     //de la forma Tx-<VALOR>, el valor fue generado por el dueño?
         let hash = trans.getHash();                   //se vuelve a calcular y debe ser igual al guardado
         let IN   = trans.getIN();                     //si es el identificador de la ultima transaccion? 
         let nuevoHash=this.getBlockchain().CalcularHash(Estrategia, st); 
         return (EsFormatoOUT(out)&& EsFormatoId(id)&&(nuevoHash==hash)&& (EsFormatoId(IN)));         
         }
        else if (tipo == "TransaccionCompuesta")
        {let nivel     = trans.getNivel();             // no puede ser mayor que dos
         var values    = trans.ContarNivelTran();        
         let listTran  = trans.getTransaccion();       //puede estar compuesta de simple o compuesta.
         let contarNiv = values[0];         
         let cant      = values[1];                    //cuenta de transaccion compuesta cuantos transacciones tiene, no tiene limites
         return (contarNiv <= 2)                       //no validamos cada una de las transacciones porque se supone que las simples estan bien
        }
        else if (tipo == "CoinBase")
        {let out  = trans.getOUT();                   //de la forma A-<VALOR>,que sea la direccion del nuevo dueño
        let id    = trans.getID();                    //de la forma Tx-<VALOR>, el valor fue generado por el dueño?
        let hash  = trans.getHash();                  //se vuelve a calcular y debe ser igual al guardado
        let token = trans.getToken();                 //de la forma TKN-<VALOR>
        let nuevoHash=this.getBlockchain().CalcularHash(Estrategia, st); 
        return (EsFormatoOUT(out)&& EsFormatoId(id)&&(nuevoHash==hash)&& (EsFormatoToken(token))); 
        }
        }
          
   ValidarBloque(Estrategia, bloq) {
        //mirar el hash del bloque
        if (bloq.getHash()== this.CalcularHash(Estrategia, bloq))
         {return (true)}
        else
         {return(false)}  
      }
  
   AgregarBlockChainLocal(nod,bloq) {        
        if (nod.Blockchain.HayMasLugar())
         {nod.Blockchain.putBloquesCerrados(bloq);            
         }
        }
   
   

   putNodosConocidosNodo(nod, bloq)
   { if (nod.Blockchain.HayMasLugar())
     { nod.Blockchain.putCantBloquesCerrados();
       nod.Blockchain.putBloquesCerrados(bloq); 
       }
     else //nodo lleno
     { console.log("Tiene los nodos conocidos la blockchain llena");          
     }     
   }

   RealizarBroadcast(bloq) {           
        //recorrer la lista de nodos conocidos y ponerle como abierto a ese nuevo bloque? 
        let lista = this.getNodosConocidos().map(nod2 => nod2.putNodosConocidosNodo(nod2, bloq));        
        }

      
   RegistrarNuevaTransaccion(bloq, trans) {
        bloq.AdmitirTransaccion(trans);
        }
    
   CrearBloqueNuevo() {        
        let bloq = new Bloque();
        return(bloq);       
        }


   Tiene10TransBloqCerrados()
   //-------------------------------------------------------------
   //Se fija si todas los bloques cerrados tienen 10 transacciones
   //------------------------------------------------------------
    { let inicio = this.Blockchain;
      let cantTran = 0;    
      cantTran = this.Blockchain.getBloquesCerrados().map(Elem => {
          if (Elem.getCantTran()!= 10) 
          {return (false)};}
          );              
      
      return(true);

    }  
     
   }

  