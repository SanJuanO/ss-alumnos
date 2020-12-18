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
      public fechaEstimadaGraduacion: string,
      public fechaNacimiento: string,
      public fechaInicioServicioSocial: string,
      public terminosCondiciones?: boolean,
      public listaAreaVidaUniversitariaParticipado?: AlumnosAreasVidaUniversitariaParticipado[],
      public listaAreaVidaUniversitariaActuales?: AlumnosAreasVidaUniversitariaActuales[],
      public id?: number,
      public fechaEstimadaGraduacionString?: string,
      public fechaNacimientoString?: string,
      public fechaInicioServicioSocialString?: string,
      public avanceCreditos?: number,
      public noCuatrimestreSemestre?: number,
      public esquemaPeriodo?: string,
      public generacion?: string,
      public correoInstitucional?: string,



    ) { }

}

export class AlumnoEdit {
  constructor(
    public nombre: string,
    public paterno: string,
    public materno: string,
    public matricula: string,
    public idUniversidad: number,
    public idFacultad: number,
    public idCarrera: number,
    public celular: string,
    public correoPersonal: string,
    public password: string,
    public porcentaje: number,
    public noCuatrimestreSemestre: number,
    public esquemaPeriodo: string,
    public generacion: string,
    public avanceCreditos: number,
    public fechaEstimadaGraduacion: string,
    public correoInstitucional: string,
    public fechaNacimiento: string,
    public sexo: string,
    public nombreAreaInstitucionServicioSocial: string,
    public fechaInicioServicioSocial: string,
    public horasServicioSocial: string,
    public participacionAsua: string,
    public trabajas: string,
    public idModalidadTrabajo: number,
    public cuatrimestreComienzoTrabajo: string,
    public terminosCondiciones: boolean,
    public activo: boolean,
    public listaAreaVidaUniversitariaParticipado?: AlumnosAreasVidaUniversitariaParticipado[],
    public listaAreaVidaUniversitariaActuales?: AlumnosAreasVidaUniversitariaActuales[],
    public id?: number,
    public modalidadTrabajo?: string,
    public universidad?: string,
    public facultad?: string,
    public carrera?: string,
    public fechaEstimadaGraduacionString?: string,
    public fechaNacimientoString?: string,
    public fechaInicioServicioSocialString?: string,
    public asistio?: boolean,
    public pago?: boolean

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
      public idOrganizacion: number,
      

        
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
  public id: number;
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
  public noHoras?: number;
  public horasRegistradas?: number;
  public rutaCartaInicio?: string;
  public rutaCartaTermino?: string;
  public archivoCartaInicio?: string;
  public archivoCartaTermino?: string;

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

export class AlumnosActividades {
  public idAlumnoProyectoAsignado: number;
  public titulo: string;
  public actividad: string;
  public validaEmpresa?: boolean;
  public id?: number;
  public fechaCreacion?: string;
  public activo?: boolean;
  public archivo?: string;
  public ruta?: string;
  constructor() { }
}



export class AreasVidaUniversitaria {
  constructor(
    public areaVidaUniversitaria: string,
    public activo: boolean,
    public id: number
  ) { }

}
export class AlumnosAreasVidaUniversitariaParticipado {
  constructor(
    public idAreaVidaUniversitaria: number,
    public activo: boolean,
    public alumno?: string,
    public areaVidaUniversitaria?: string,
    public id?: number,
    public idAlumno?: number,

  ) { }

}
export class AlumnosAreasVidaUniversitariaActuales {
  constructor(
    public idAreaVidaUniversitaria: number,
    public activo: boolean,
    public alumno?: string,
    public areaVidaUniversitaria?: string,
    public id?: number,
    public idAlumno?: number,
  ) { }

}

export class ModalidadesTrabajo {
  constructor(
    public modalidad: number,
    public activo: boolean,
    public id: number,
  ) { }
}


