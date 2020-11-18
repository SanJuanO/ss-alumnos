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
      public terminosCondiciones?: boolean,

        
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
        public idOrganizacion:number

        
    ) { }

}
export class respuesta {
    constructor(
        public idOrganizacion:number,
        public idPregunta: number,
        public activo:boolean= true,
        public respuesta: string,
      
        
    ) { }

}


export class AlumnosProyectosAsignados {
  public idAlumno: number;
  public idProyecto: number;
  public idEstado: number;

  public proyectoNombre?: string;
  public matricula?: string;

  public correo?: string;
  public celular?: string;
  public carrera?: string;
  public facultad?: string;
  public universidad?: string;
  public idOrganizacion?: string;
  public organizacion?: string;
  public estado?: string;
  public alumno?: string;
  constructor() { }
}

export class ReportesAlumnos {
  public idAlumno: number;
  public idProyecto: number;
  public ruta?: string;
  public descripcion?: string;
  public id?: number;
  public fechaCreacion?: string;
  public activo?: boolean;
  constructor() { }
}


