

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: Boolean,
        public role?: string,
        public udi?: string) {

    }
}