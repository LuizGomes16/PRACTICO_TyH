import {Bloque } from "./Bloque.js";

test("Test1: Validar un bloque vacio la cantidad de transacciones este en cero", () => { 
    let bloq = new Bloque();
expect(bloq.getCantTran()).toBe(0);    
});

