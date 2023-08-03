import {generateUUID, CrearOUT,CrearToken,CrearId, EsUUID, CalcularHash,EsFormatoId,EsFormatoOUT,EsFormatoToken, GenerarStrAleatorio}  from "../funciones.js"
export {Blockchain};

let Estrategia = " ";
//BlockChain:
//----------------------------------------------------------------------------------------
//Protege la informacion y garantiza su integridad registrada aqui.
//Compuesta de bloques cerrados
//Funcion hash para asegurar integridad y seguridad de la info se utilizan funciones hash
//Suponemos que tiene hasta 4 bloques cerrados
import {  EstrategiaHashAbstracta, ClaseMD5, ClaseSHA256} from "./EstrategiaHashAbstracta.js";


class Blockchain {
    constructor() {
      this.BloquesCerrados = [];//de tipo bloque
      this.CantBloquesCerrados = 0;
      this.hashBloqAnt=null;//???
      
    }       
        //get
    ElegirEstrategiaHash()
        {let aleatorio= Math.floor(Math.random() * 3);
         if (aleatorio == 0)
             {return ("MD5")}
         else
             {return ("SHA256")};

             
        }

    CalcularHash(est, v_st){
     let hash=" ";
     if (est=="MD5")
     {let CEst= new ClaseMD5();
      hash= CEst.GenerarHash(est, v_st)}
    else
     {let CEst= new ClaseSHA256();
      hash=CEst.GenerarHash(est, v_st)};
    return(hash);     
    }
    getBloquesCerrados()
        {return (this.BloquesCerrados);
        }

    getCantBloquesCerrados()
        {return (this.CantBloquesCerrados);
        }
        //put

    putBloquesCerrados(bloq)
        {this.BloquesCerrados.push(bloq);
         }
    
    putCantBloquesCerrados()
        {this.CantBloquesCerrados++;
        }
       //
    
    VerificarIntegridad(Estrategia) {
        //Suponemos que integridad es que cada bloque que lo integre sea integro, es decir, tendra que 
        //recorrer la lista de bloques cerrados, obtengo la informacion, calculo el hash y lo comparo con el hash guardado.  
          return this.getbloquesCerrados().some((bloqC) => BloqC.getHash()==calcularHash(Estrategia, bloqC));
          }
      
    //nuevo
    HayMasLugar()
        {   return (this.getCantBloquesCerrados() < 4)
        } 
  }


  