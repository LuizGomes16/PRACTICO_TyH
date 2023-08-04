# PRACTICO_TyH

Aspectos a considerar:
----------------------

1) Hemos dejado el archivo comprimido en caso de que la instalación directa presente problemas. Esto se debe a que éste contiene una carpeta llamada "node_modules" que es bastante grande para cargar/descargar.
                 -Desconocemos si quede ejecutar sin problemas si ésta o se instala directamente.
3) Para la ejecución del test:
   2.1) Lo separamos en clases.
   2.2) Para poder instalar el test:
      -Ejecutamos el comando npm install --save -dev jest
      -y ajustamos el package.json con:
            "scripts": {
            "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage"
                       },
  2.3) Finalmente, para ejecutarlo simplemente escribimos "npm test" en la terminal, ésto recorrere cada test escrito,
       dándonos el siguiente resultado:

      File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s       
-----------------------------|---------|----------|---------|---------|-------------------------
All files                    |   82.69 |     62.5 |   77.66 |   83.51 | 
 Practico                    |     100 |      100 |     100 |     100 | 
  funciones.js               |     100 |      100 |     100 |     100 | 
 Practico/clases             |   81.13 |    54.54 |   75.26 |   82.03 | 
  BlockChain.js              |    90.9 |      100 |      80 |   95.23 | 63
  Bloque.js                  |   80.64 |       50 |   83.33 |      80 | 56-64,73-80
  EstrategiaHashAbstracta.js |     100 |      100 |    62.5 |     100 | 
  Nodo.js                    |    84.7 |    71.42 |   74.07 |   85.71 | 26,32,41,160-180       
  TransaccionAbstracta.js    |   75.42 |    34.37 |   73.33 |   75.89 | 15,31-36,49,110,213-247
-----------------------------|---------|----------|---------|---------|-------------------------
