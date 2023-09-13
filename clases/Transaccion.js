export {Transaccion, TransaccionComposite, TransacccionLeaf, CoinBase, TransaccionSimple, TransaccionCompuesta};
import {Blockchain} from "./BlockChain.js";
import {v4 as  uuidv4, validate} from "uuid";

let NivA=0;
///Clase Transaccion:
//----------------------------------------------------------------------------------------
class Transaccion {
  constructor() {
    this.Tipo = 'Transaccion';
      }
  //Metodos que sirven para generar y validar los atributos de las transacciones
  generateUUID() {
        let myuuid = uuidv4();
        return(myuuid);
       }
  EsUUID(valor)
      { return (validate(valor));
      }
  CrearOUT()
    {return("A-" + this.generateUUID())
    }
  CrearToken()
    {return("TKN-" + this.generateUUID())
    }
  CrearId()
    {return("Tx-" + this.generateUUID())
    }
  CrearIN()
    {return("Tx-" + this.generateUUID())
    }
  generateUUID() {
      let myuuid = uuidv4();
      return(myuuid);
     }
  EsUUID(valor)
    { return (validate(valor));
    }
  EsFormatoId(str)
    {//verifique que es de esta forma Tx-<VALOR>
      let valor = str.slice(3,str.length);
      return ((str.charAt(0) == "T") &&  (str.charAt(1) == "x") &&  (str.charAt(2) == "-") && this.EsUUID(valor));
    }
  EsFormatoIN(str)
    {//verifique que es de esta forma Tx-<VALOR>
      let valor = str.slice(3,str.length);
      return ((str.charAt(0) == "T") &&  (str.charAt(1) == "x") &&  (str.charAt(2) == "-") && this.EsUUID(valor));
    }
  
  EsFormatoOUT(str)
    {//verifique que es de esta forma "A-<VALOR>"
      let valor = str.slice(2,str.length);
      return((str.charAt(0) == "A") &&  (str.charAt(1) == "-") && this.EsUUID(valor));
    }
  EsFormatoToken(str)
    {//verifique que es de esta forma "TKN-<VALOR>""
      let valor = str.slice(4,str.length);
      return((str.charAt(0) =="T") &&  (str.charAt(1) == "K") &&  (str.charAt(2) == "N") &&  (str.charAt(3) == "-") && this.EsUUID(valor)); 
    }

  ValidarTransaccion(nuevoHash) {
      //---------------------------------------------------------------------------------------------------------
      //En nuevoHash viene el recalculo del hash
      //Necesitamos extraer cada uno de los campos de la transaccion y verificarlos  
      //st: trae el string con que se calculo el hash
      //Estrategia: se pasa como parametro para que sea generado exactamente igual a la original
      //---------------------------------------------------------------------------------------------------------      
      let tipo= this.getTipo();
      if (tipo == "TransaccionSimple")
      {
       let out =  this.getOUT();                   //de la forma A-<VALOR>,que sea la direccion del nuevo dueño
       let id   = this.getID();                    //de la forma Tx-<VALOR>, el valor fue generado por el dueño?
       let hash = this.getHash();                  //se vuelve a calcular y debe ser igual al guardado
       let IN   = this.getIN();                    //si es el identificador de la ultima transaccion? 
       return (this.EsFormatoOUT(out)&& this.EsFormatoId(id)&&(nuevoHash==hash)&& (this.EsFormatoIN(IN)));         
       }
      else if (tipo == "TransaccionCompuesta")
      {let nivelA     = this.getNivel(); 
       return (nivelA <= 2)                        //no validamos cada una de las transacciones porque se supone que las simples estan bien
      }
      else if (tipo == "CoinBase")
      {let out  = this.getOUT();                   //de la forma A-<VALOR>,que sea la direccion del nuevo dueño
      let id    = this.getID();                    //de la forma Tx-<VALOR>, el valor fue generado por el dueño?
      let hash  = this.getHash();                  //se vuelve a calcular y debe ser igual al guardado
      let token = this.getToken();                 //de la forma TKN-<VALOR>
      return (this.EsFormatoOUT(out)&& this.EsFormatoId(id)&&(nuevoHash==hash)&& (this.EsFormatoToken(token))); 
      }
      }   
   
}

class TransaccionComposite extends Transaccion {
  constructor() {
      super();
      this.Tipo = 'TransaccionComposite';
      this.Transacciones=[];
      this.Nivel=0;
        }
  
  addTransaccion(Trans)
  { this.Transacciones.push(Trans);        
    if (Trans.esComposite()) {    
       this.actualizarNivel(Trans);
    }
  }
  actualizarNivel(Trans)
  {this.Nivel = Math.max(this.Nivel, Trans.Nivel + 1);

  }
  getTransacciones(){
    return(this.Transacciones);
    
  }
  esComposite()
  {
    return true;
  } 
  
  putNivel(Niv)
  {this.Nivel=Niv;
  }
 
  getNivel()
  {return(this.Nivel);
  }

  VerificarIntegridad() 
   {
   }

  getTipo(){
   return (this.Tipo);
  }  
}

//OUT: la direccion del nuevo dueño del token
class TransacccionLeaf extends TransaccionComposite {
  constructor() {
    super();
    this.OUT=this.CrearOUT();
    this.ID=this.CrearId(); 
    this.Hash=null; 
    this.Tipo= 'TransaccionLeaf';
     }
  ComputaAlmacenaHash(v_hash){
  
   this.hash=v_hash;
  }
  
  VerificarIntegridad() {
   //calcular nuevamente el hash y compararlo con el guardado
   let Blockch = new Blockchain();
   return (this.Hash() == Blockch.calcularHash(Estrategia, this.Hash()));
  }
  //
  putHash(hashA)
  {this.Hash=hashA;
  }

  getOUT()
  { return(this.OUT);
  }
  getID()
  {return(this.ID);
  } 
  getHash()
  {return(this.Hash);
  } 
  getTipo(){
    return(this.Tipo);
  }
  getToken(){
    return(this.TKN);
  }
  
  putOUT(data)
  {this.OUT=data;
  }
  
}
//el token es incorporado en la transacc. CoinBase.
//TKN queda en la coinbase.
class CoinBase  extends TransacccionLeaf{
  constructor() {
    super();
    this.TKN  = this.CrearToken();
    this.Tipo = "CoinBase";   
     }
    
  getTipo(){
    return(this.Tipo);
  }
  
  
}

//IN=Contiene el identificador de la ultima transaccion que involucró el token
class TransaccionSimple extends TransacccionLeaf{
  constructor() {
    super();
    this.IN  = this.CrearIN();     
    this.Tipo = "TransaccionSimple";
    }
  getTipo(){
    return(this.Tipo);
  }
  getIN(){
    return(this.IN);
  }
  putIN(InA){    
      this.IN  = InA;
  }

 }


 class TransaccionCompuesta extends TransaccionComposite {
  constructor() {
    super();
    this.Nivel=1; 
    this.CantTransacciones=0;
    this.Transaccion= [] ;
    this.Tipo = "TransaccionCompuesta";
    }
  getTipo(){
    return(this.Tipo);
  }
  getNivel()
  { return(this.Nivel)}
  getCantTransacciones()
  { return(this.CantTransacciones)     }
  getTransaccion(){
    return(this.Transaccion);
  }

  putTransacciones(Tran){
    this.Transaccion.push(Tran);    
  }

  putNivel(Niv)
  {this.Nivel=Niv;
  } 

  getNivel(){
    return(this.Nivel)
             } 
                                  
            }  
