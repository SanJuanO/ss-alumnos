export class Alumno {
    constructor(
        public matricula: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public idUniversidad: number,
        public idFacultad: number,
        public idCarrera: number,
        public celular: string,
        public correo: string,
        public cp: string,
        public pais: string,
        public estado: string,
        public municipio: string,
        public colonia: string,
        public calle: string,
        public numExt: string,
        public numInt: string,
        public activo: boolean,
        public porcentaje: number,
        public id?: number,
        
    ) { }

}

export class AlumnoProyecto {
    constructor(
        public fechaCreacion:string,
        public alumno: string,
        public proyectoNombre: string,
        public idProyecto: number,
        public idAlumno: number,
        public id: number,
      
        
    ) { }

}



