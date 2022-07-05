import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { HttpClient } from '@angular/common/http';
import { Observable, from,throwError, EMPTY } from 'rxjs';



describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    let http: HttpClient;
    const servicio = new MedicosService(http!);

    beforeEach(() => {
        componente = new MedicosComponent(servicio);
    });


    it('Init: Debe cargar los medicos', () => {

        spyOn(servicio, 'getMedicos').and.callFake(() => {
            return from([['medico1', 'medico2', 'medico3']]);
        });

        componente.ngOnInit();

        expect(componente.medicos.length).toBeGreaterThan(0);

    });


    it('Debe de llamar al server para add un medico', () => {

        const spia = spyOn(servicio, 'agregarMedico').and.callFake(medico => new Observable());

        componente.agregarMedico();

        expect(spia).toHaveBeenCalled();




    });


    it('Debe agregar un nuevo medico al arreglo de medicos', () => {

        const medico = { id: 1, nombre: 'fran' };
        spyOn(servicio, 'agregarMedico').and.returnValue(from([medico]));


        componente.agregarMedico();
        expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);

    });


    it('si falla la add, la propiedad mensajeError debe ser igual al error del servicio',() => {
        const miError = 'error medico';

        
        spyOn(servicio,'agregarMedico').and.returnValue(throwError(miError));


        componente.agregarMedico();


        expect(componente.mensajeError).toBe(miError);
    });


    it('debe de llamar al server para borrar al medico',() => {
        
        spyOn(window,'confirm').and.returnValue(true);


        const spia = spyOn(servicio,'borrarMedico').and.returnValue(EMPTY);

        componente.borrarMedico('1');


        expect(spia).toHaveBeenCalledWith('1');


    });


    it('NO debe de llamar al server para borrar al medico',() => {
        
        spyOn(window,'confirm').and.returnValue(false);


        const spia = spyOn(servicio,'borrarMedico').and.returnValue(EMPTY);

        componente.borrarMedico('1');


        expect(spia).not.toHaveBeenCalledWith('1');


    });



});
