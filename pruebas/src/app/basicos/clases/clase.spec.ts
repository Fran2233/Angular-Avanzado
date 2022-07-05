import { Jugador } from './clase';


describe('Pruebas de clases', () => {

    const jugador = new Jugador();


    beforeAll(() => {
        console.log('beforeAll');

    })
    beforeEach(() => {
        console.log('beforeEach');
        jugador.hp = 100;

    })
    afterAll(() => {
        console.log('afterAll');

    })
    afterEach(() => {
        console.log('afterEach');

    })




    it('Debe retornar 80 hp si recibe 20 danio', () => {


        // const jugador = new Jugador();

        const res = jugador.recibeDanio(20);


        expect(res).toBe(80);

    });



    it('Debe retornar 50 hp si recibe 50 danio', () => {


        // const jugador = new Jugador();

        const res = jugador.recibeDanio(50);


        expect(res).toBe(50);

    });


    xit('Debe retornar 0 hp si recibe 100 danio', () => {


        // const jugador = new Jugador();

        const res = jugador.recibeDanio(100);


        expect(res).toBe(0);

    });

})