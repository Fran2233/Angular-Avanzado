import { Jugador2 } from './jugador2';

describe('Jugardor 2 Emit', () => {

    let jugador: Jugador2;

    beforeEach(() => { jugador = new Jugador2() });


    it('Debe emitir evento cuando recibe daño', () => {

        let nuevoHP = 0;

        jugador.hpCambia.subscribe(hp => {
            nuevoHP = hp
        })

        jugador.recibeDanio(1000);

        expect(nuevoHP).toBe(0);

    })

    it('Debe emitir evento cuando recibe daño y sobrevivir si es menos de 100', () => {

        let nuevoHP = 0;

        jugador.hpCambia.subscribe(hp => {
            nuevoHP = hp
        })

        jugador.recibeDanio(50);

        expect(nuevoHP).toBe(50);

    })


})