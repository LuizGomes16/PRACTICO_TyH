//Clase EstrategiaHash
import Hashes from "jshashes";
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
    }
    GenerarHash(data){ 
      let hash =new Hashes.MD5().b64(data);           
      return (hash);
    }
     
  
  }
class ClaseSHA256 extends EstrategiaHashAbstracta {
    constructor(){
      super();}          
    GenerarHash(data){
      let hash= new Hashes.SHA256().b64(data);
      return (hash);  
    }
   
    
}


export {EstrategiaHashAbstracta, ClaseMD5, ClaseSHA256};

   