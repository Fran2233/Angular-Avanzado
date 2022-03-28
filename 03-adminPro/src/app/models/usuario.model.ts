import { environment } from '../../environments/environment';
const baseURL = environment.base_url;
export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: Boolean,
        public role?: string,
        public uid?: string) {

    }

    get imgUrl() {

        if (!this.img) {
            return `${baseURL}/uploads/usuarios/noImagen`;
        } else if (this.img?.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${baseURL}/uploads/usuarios/${this.img}`;
        } else {
            return `${baseURL}/uploads/usuarios/noImagen`;
        }





    }

}