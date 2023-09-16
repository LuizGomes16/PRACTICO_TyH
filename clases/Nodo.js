//Tiene acceso a tarnsaccion porque todavia no esta asociada al bloque. Debido a que cuando se crea la transaccion, primero la valida y 
//despues la asigna a un bloque
import {TransaccionCompuesta, TransacccionLeaf, CoinBase, TransaccionSimple} from "./Transaccion.js";
import {Blockchain} from "./BlockChain.js";
import {Bloque } from "./Bloque.js";
export {Nodo};  

class Nodo {
    
  constructor() {
      this.Blockchain=new Blockchain(); //Blockchain local
      this.Open=null;                   //mantiene el bloque abierto
      this.Lleno=false;                 //atributo que representa si esta lleno o no, el nodo
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
                           
  CrearTransaccionCoinBase(Estrategia, v_st) {
      let v_hashA        = this.getBlockchain().CalcularHash(Estrategia, v_st);    //hash de un string
      const tran = new CoinBase();   
      tran.putHash(v_hashA);
      return (tran);
      }

  CrearTransaccionCompuesta() {
       const tran = new TransaccionCompuesta(); 
       return(tran);       
      }
     
       
  CrearTransaccionSimple(Estrategia, v_st) {
          let v_hashA        = this.getBlockchain().CalcularHash(Estrategia, v_st);    //hash de un string                          
          const tran = new TransaccionSimple();               
          tran.putHash(v_hashA)
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
        if (bloq.DejarAdmitirTransacciones())                               //el bloque esta lleno cuanto vale 10 las cantidad de transacciones
          { let bloqNuevo = this.CrearBloqueNuevo();                        //crea un bloque nuevo                 
            //Cierra el bloque
            bloq.CompletarInformacion(Est);                                 //este bloque pasa a ser el bloque anterior, porque esta lleno
            this.IncorporarBloqueCerrado(bloqNuevo);                        //se agrega a la blockchain local
            this.RealizarBroadcast();                                       //El nuevo nodo es replicado a sus conocidos
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
        //Necesitamos extraer cada uno de los atributos de la transaccion y verificarlos  
        //st: trae el string con que se calculo el hash
        //Estrategia: se pasa como parametro para que sea generado exactamente igual a la original
        //---------------------------------------------------------------------------------------------------------
        let nuevoHash=this.getBlockchain().CalcularHash(Estrategia, st); 
        return(trans.ValidarTransaccion(nuevoHash));          
    }
          
  ValidarBloque(Estrategia, bloq) {
        //mirar el hash del bloque
        let Blockch = new Blockchain();
        if (bloq.getHash()== Blockch.CalcularHash(Estrategia, bloq))
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
        //recorrer la lista de nodos conocidos y poniendo como abierto a ese nuevo bloque, en cada uno de esos nodos 
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
    { let cantTran = 0;    
      cantTran = this.Blockchain.getBloquesCerrados().map(Elem => {
          if (Elem.getCantTran()!= 10) 
          {return (false)};}
          );              
      
      return(true);

    }  
  ponerOUT(tran, v_OUT)
     {tran.putOUT(v_OUT);
     }

  ponerIN(tran, v_IN)
     {tran.putIN(v_IN);;
     }

  getIDTran(trans)
    {return(trans.getID())
    }

  getOUTTran(tran)
    {return(tran.getOUT());
    }
   
   
    //
  GenerarStrAleatorio(num)
  { const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
  };   

  IntercambioDatos (transCoin, trans){
     let v_OUT = this.getOUTTran(trans);
     let v_ID  = this.getIDTran(transCoin);
     this.ponerOUT(transCoin,v_OUT);      //OUT es de la nueva transaccion, en este caso una normal y la pone en la coinbase     
     this.ponerIN(trans,v_ID);            //Poner en In de la simple el OUT de la coinbase    
   }

   }

  