//----------------------------------------------------------
//Funciones Generales que pueden usar las clases
//----------------------------------------------------------
import Hashes from "jshashes";
//import {v4 as  uuidv4} from "uuid";
import {v4 as  uuidv4, validate} from "uuid";
//const { v4: uuidv4, validate } = require('uuid');
// Utility function to generate a UUID
function generateUUID() {
  let myuuid = uuidv4();
  return(myuuid);
 }
function EsUUID(valor)
{ return (validate(valor));
}
function EsFormatoId(str)
{//verifique que es de esta forma Tx-<VALOR>
  let valor = str.slice(3,str.length);
  return ((str.charAt(0) == "T") &&  (str.charAt(1) == "x") &&  (str.charAt(2) == "-") && EsUUID(valor));
}
function EsFormatoOUT(str)
{//verifique que es de esta forma "A-<VALOR>"
  let valor = str.slice(2,str.length);
  return((str.charAt(0) == "A") &&  (str.charAt(1) == "-") && EsUUID(valor));
}
function EsFormatoToken(str)
{//verifique que es de esta forma "TKN-<VALOR>""
  let valor = str.slice(4,str.length);
  return((str.charAt(0) =="T") &&  (str.charAt(1) == "K") &&  (str.charAt(2) == "N") &&  (str.charAt(3) == "-") && EsUUID(valor)); 
}
function CrearOUT()
{return("A-" + generateUUID())
}
function CrearToken()
{return("TKN-" + generateUUID())
}
function CrearId()
{return("Tx-" + generateUUID())
}
//calcularHash de un bloque o un string
function CalcularHash(Est, data){
    //para las transacciones
    if (Est == "MD5")
       { const hash1=new Hashes.MD5().b64(data);
         return (hash1)}      
    else
       {const hash1=new Hashes.SHA256().b64(data);
        return (hash1)}
  
    }  
function GenerarStrAleatorio(num)
  { const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
  };   

export {generateUUID, CrearOUT, CrearToken, CrearId, EsUUID, CalcularHash, EsFormatoId, EsFormatoOUT, EsFormatoToken, GenerarStrAleatorio};




  