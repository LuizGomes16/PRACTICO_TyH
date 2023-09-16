export {Bloque};
import {Blockchain} from "./BlockChain.js";


// Clase Bloque:
//----------------------------------------------------------------------------------------
class Bloque {

  constructor() {
      this.Timestamp = null;   
      this.Hash = null;
      this.Prev = null;
      this.Transacciones=[];
      this.CantTran = 0; // para asegurar que sean 10 transacciones, si es menor esta abierto el bloque
    }
   
  getTimestamp() {
    return (this.Timestamp)}
  getHash()
    { return(this.Hash);
    }
  getPrev() {
    return (this.Prev)}
  getTransacciones()  {
    return (this.Transacciones)}
  getCantTran()  {
      return (this.CantTran)}
  
  putTimestamp(){
        this.Timestamp= Date.now();
      }      
  putHash(data)
        { this.Hash=data;
        }
  putPrev(HashbloqAnt)
      { this.Prev= HashbloqAnt}    
   
  putTransacciones(tran) {
     this.Transacciones.push(tran);
   }
  putCantTran(tran) {
    this.CantTran ++;      
   }

  DejarAdmitirTransacciones() {
      return (this.getCantTran() == 10) 
   } 

  CompletarInformacion(Est){
    {   this.putTimestamp(); 
        let data = this.getTimestamp() + this.getPrev() + this.getTransacciones().map(tx => tx.getHash()).join('');
        let Blockch = new Blockchain();
        let v_hashA = Blockch.CalcularHash(Est, data);    //hash de un string 
        this.putHash(v_hashA);                    
    }   
  }
  AgregarHashBloqueAnt(bloqAnt, hasEnt) {
      bloqAnt.putHash(hasEnt);
    }
   
    
  
  AdmitirTransaccion(tran) { 
      this.putTransacciones(tran);
      this.putCantTran();          
                 
  }

  
 
      
       }

