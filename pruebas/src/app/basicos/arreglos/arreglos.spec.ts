import { obtenerRobots } from './arreglos';


describe('Pruebas de arreglos', () =>{
    it('Debe tener al menos 2 robots', () =>{
        const res = obtenerRobots();

        expect(res.length).toBeGreaterThanOrEqual(2);
        // Que sea mayor o igual a 3


        
    });


    it('Debe existir robocop', () =>{
        const res = obtenerRobots();

        expect(res).toContain('Robocop');
        expect(res).toContain('Robocop2');
       


        
    });
});