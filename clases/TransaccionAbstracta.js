export {TransacccionAbstracta, TransacccionLeaf, CoinBase, TransaccionSimple, TransaccionCompuesta};

//const funciones=require('./funciones');
//Clase Transaccion:
//----------------------------------------------------------------------------------------
class TransacccionAbstracta {
  constructor() {
      this.Tipo = 'TransaccionAbstracta';
        }
  //metodo abstracto, porque se redefine
  VerificarIntegridad() {
  }
  //nuevo
  getTipo(){
   return (this.Tipo);
  }
   
}

//OUT: la direccion del nuevo dueño del token
class TransacccionLeaf extends TransacccionAbstracta {
  constructor({v_output, v_ID, v_hash}) {
    super();
    this.OUT=v_output;
    this.ID=v_ID; 
    this.Hash=v_hash; 
    this.Tipo= 'TransaccionLeaf';
     }
  ComputaAlmacenaHash(v_hash){
  //viene calculado? el hash y guardarlo
   this.hash=v_hash;
  }
  //nuevo
  VerificarIntegridad() {
   //calcular nuevamente el hash y compararlo con el guardado
   return (this.Hash() == calcularHash(Estrategia, this.Hash()));
  }
  //
  getOUT()
  {return(this.OUT);
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
  
  //
  putOUT(data)
  {this.OUT=data;
  }
  
}
//el token es incorporado en la transacc. CoinBase.
//TKN queda en la coinbase.
class CoinBase  extends TransacccionLeaf{
  constructor({v_output, v_ID, v_hash, v_token}) {

    super({v_output, v_ID, v_hash});
    this.TKN  = v_token;
    this.Tipo = "CoinBase";   
     }
    
  
  getTipo(){
    return(this.Tipo);
  }
  
}

//IN=Contiene el identificador de la ultima transaccion que involucró el token
class TransaccionSimple extends TransacccionLeaf{
  constructor({v_output, v_ID, v_hash,v_in}) {
    super({v_output, v_ID, v_hash});
    this.IN  = v_in;     
    this.Tipo = "TransaccionSimple";
    }

  getTipo(){
    return(this.Tipo);
  }
  getIN(){
    return(this.IN);
  }
  
 }


 class TransaccionCompuesta extends TransacccionAbstracta {
  constructor() {
    super();
    this.Nivel=-1; 
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
    this.Transaccion=Tran;
            } 

  putNivel(){
    let valor= this.ContarNivelTran();    
    this.Nivel= valor [0];
             } 
  
  putCantTransacciones(){
    let valor= this.ContarNivelTran(); 
    this.cantTransacciones= valor[1];
    } 
                        
  

//---------------------------------------------------------------------------------------------
//Metodos para calcular el nivel y la cantidad de transacciones de una
//transaccion compuesta, el limite es 4, ya que dos el permitido,
//no tiene sentido leer de mas
//---------------------------------------------------------------------------------------------
 CalculoNivel(cantTran, nivel, arreglo)
 {  var arreglo2 = new Array();
    var arreglo3 = new Array();   
    var arreglo4 = new Array();      
    var i        = 0;
    if (arreglo.length > 0)
    {nivel++};
    for (var j = 0; j < arreglo.length; j++){  //nivel 1
      i=arreglo[j]; 
      if (Array.isArray(i))
      {  arreglo2= arreglo[j];
    }
    cantTran ++;          
   }
   if (arreglo2.length > 0)
   {nivel++};   
   for (var j = 0; j < arreglo2.length; j++){  //nivel 2
      i=arreglo2[j]; 
      if (Array.isArray(i))
      {  arreglo3= arreglo[j];
      }
      cantTran ++;          
   }

   if (arreglo3.length > 0)
   {nivel++};      
   for (var j = 0; j < arreglo3.length; j++){  //nivel 3
      i=arreglo3[j]; 
      nivel++;    
      if (Array.isArray(i))
      {  arreglo4= arreglo3[j];
      }
      cantTran ++;          
   }
  
   if (arreglo4.length > 0)
   {nivel++};     
   for (var j = 0; j < arreglo4.length; j++){  //nivel 4
      i=arreglo4[j]; 
      cantTran ++;          
   }
  
   return[nivel, cantTran];    
 
 } 

 ContarNivelTran()
 //Cuenta la cantidad de niveles de una transaccion compuesta y
 //la cantidad de transacciones
  {var nivel = -1;
   var i  = 0;
   var cantTran = 0;
   var contarNiv = 0;
   var cant = 0;   
   nivel = 0;            
   let lista = this.getTransaccion().map
      (Elem => 
          { cantTran++;
            if (Array.isArray(Elem))  //darse cuenta si es una lista el elemento, es compuesta de compuesta
              { contarNiv = nivel;
                cant      = 0;         
                var values    = this.CalculoNivel(cant, contarNiv, Elem);
                contarNiv = values[0];         
                cantTran  = values[1] + cantTran ;
                if (nivel < values[0])
                   {nivel = values[0]};
                i++;}                                  
          }
      );                
    if (cantTran > 0)
      {cantTran++} 
     return[nivel, cantTran];    
    }
 
    //---------------------------------------------------------------------------------------------
    //Metod que Actualiza el campo OUT de la coinbase por cada transaccion simple de la compuesta
    //--------------------------------------------------------------------------------------------- 
    SacarSimples(trans, ultCoinbase)
    {var arreglo  = new Array();
     var arreglo2 = new Array();
     var arreglo3 = new Array();   
     var arreglo4 = new Array();      
     var i        = 0;
     let lista = trans.getTransaccion().map
        (Elem => 
            { if (Array.isArray(Elem))
                {arreglo[i]= Elem;
                 i++;}
              else 
              if (Elem.getTipo() == "TransaccionSimple")
                    { ultCoinbase.putOUT(Elem.getOUT())};                      
            }
        );     

        for (var j = 0; j < arreglo.length; j++){  //nivel 1
          i=arreglo[j]; 
          if (Array.isArray(i))
          {  arreglo2= arreglo[j];
          }          
          else 
          if (i.getTipo() == "TransaccionSimple")
                { ultCoinbase.putOUT(i.getOUT())};                      
  
         }
  
         for (var j = 0; j < arreglo2.length; j++){  //nivel 2
          i=arreglo2[j]; 
          if (Array.isArray(i))
          {//No puede darse, porque es hasta dos niveles
          }
          else 
          if (i.getTipo() == "TransaccionSimple")
                { ultCoinbase.putOUT(i.getOUT())};                      
  
         }
         
  
    }
  }


  



