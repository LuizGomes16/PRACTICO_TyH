# PRACTICO_TyH

Aspectos a considerar:
----------------------

   1) Hemos dejado el archivo comprimido en caso de que la instalación directa presente problemas. Esto se debe a que éste contiene una carpeta llamada "node_modules" que es bastante grande para cargar/descargar.
                 ->Desconocemos si quede ejecutar sin problemas si ésta o se instala directamente.
   2) Para la ejecución del test:
      Primero: Lo separamos en clases.
      Segundo: Para poder instalar el test:
      -Ejecutamos el comando npm install --save -dev jest
      -y ajustamos el package.json con:
            "scripts": {
            "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage"
                       },
      Tercero: Finalmente, para ejecutarlo simplemente escribimos "npm test" en la terminal, ésto recorrere cada test escrito.
       El resultado del mismo está adjuntado en el documento.

  
