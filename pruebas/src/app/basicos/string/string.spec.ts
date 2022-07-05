import { mensaje } from './string';


describe('Pruebas de strings', () => {

    it('Debe regrar un string', () => {

       const res = mensaje('Francisco');

       expect(typeof res).toBe('string');

    });


    it('Debe retornar saludo con nombre enviado', () => {

        const nombre = 'Juan'
        const res = mensaje(nombre);
 
        expect( res).toContain(nombre);
 
     });

});