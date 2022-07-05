import { userLogeado } from './booleanos';



describe('Pruebas de booleanos', () => {

    it('Debe retornar true', () => {

        const res = userLogeado();

        expect(res).toBeTrue();

    })



})