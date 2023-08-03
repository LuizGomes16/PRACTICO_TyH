//Clase EstrategiaHash
import {generateUUID, CrearOUT,CrearToken,CrearId, EsUUID, CalcularHash,EsFormatoId,EsFormatoOUT,EsFormatoToken, GenerarStrAleatorio}  from "../funciones.js"


class EstrategiaHashAbstracta{
 constructor(){
  this.Hash=null;
   }
  GenerarHash(){
    }
  getHash(){
   }
  putHash(data){
  }   
 }
  
class ClaseMD5 extends EstrategiaHashAbstracta {
   constructor()
    {super();
     this.Tipo="MD5"; 
    }
    GenerarHash(est, data){      
      let hash= CalcularHash(est, data);
      return (hash);
    }
     
  
  }
class ClaseSHA256 extends EstrategiaHashAbstracta {
    constructor(){
      super();
      this.Tipo="SHA256";}          
    GenerarHash(est, data){
      let hash= CalcularHash(est, data);
      return (hash);  
    }
   
    
}


export {EstrategiaHashAbstracta, ClaseMD5, ClaseSHA256};

   