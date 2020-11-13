
export class Proyecto {
  
  public proyecto: string;
  public descripcion: string;
  public objetivo: string;
  public idOrganizacion: number;
  public organizacion: string;
  public modalidadDistancia: string;
  public nombreResponsable: string;
  public puesto: string;
  public area: string;
  public correoResponsable: string;
  public telefono: string;
  public justificacionImpactoSocial: string;
  public plazas480: number;
  public plazas240: number;
  public rolPrestador: string;
  public responsabilidades: string;
  public fechaInicio: string;
  public fechaTermino: string;
  public lunes: boolean;
  public martes: boolean;
  public miercoles: boolean;
  public jueves: boolean;
  public viernes: boolean;
  public sabado: boolean;
  public domingo: boolean;
  public horaEntrada: string;
  public horaSalida: string;
  public capacitacion: string;
  public idObjetivoOnu: number;
  public objetivoOnu: string;
  public idPeriodo: number;
  public periodo: string;
  public idUniversidad: number;
  public universidad: string;
  public idEstadoProyecto: number;
  public estadoProyecto: string;
  public observaciones: string;
  public organizacionDireccion: string;
  public activo: boolean;
  public id: number;
  public competenciasList?: Array<ProyectosCompetencias>;
  public carrerasList?: Array<ProyectosCarreras>;
  constructor(
  
  ) { }

}

export class listaApoyosModel {
  constructor(
    public idApoyo: number,
    public activo: boolean,
    public Apoyo?: string,
  ) { }
}

export class listaLineasTrabajoModel {
  constructor(
    public idLineaTrabajo: number,
    public activo: boolean,
    public LineaTrabajo?: string,
  ) { }
}

export class ApoyosModel {
  constructor(
    public id: number,
    public apoyo: string,
    public activo: boolean,
  ) { }
}

export class LineasTrabajoModel {
  constructor(
    public id: number,
    public LineaTrabajo: string,
    public activo: boolean,
  ) { }
}

export class ProyectosAreasModel {
  constructor(
    public id: number,
    public Area: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}

export class ProyectosRangosModel {
  constructor(
    public id: number,
    public Rango: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}

export class ProyectosPoblacionesModel {
  constructor(
    public id: number,
    public Poblacion: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}
export class PeriodosModel {
  constructor(
    public id: number,
    public Periodo: string,
    public Descripcion: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}

export class EstadosProyectosModel {
  constructor(
    public id: number,
    public EstadoProyecto: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}

export class estadoProyectoActualizar {
  public idEstado: number;
  public observaciones: string;
  public idProyecto: number;
  constructor(
  ) { }

}


export class ProyectosSucesosModel{
  public id: number;
  public idProyecto: number;
  public suceso: string;
  public observaciones: string;
  public fechaCreacion: string;
  public activo: boolean;
  constructor(
  ) { }
}

export class ProyectosActividadesModel{
  public id: number;
  public idProyecto: number;
  public actividad: string;
  public descripcion: string;
  public noPrestadores: number;
  public idPerfil: number;
  public perfil: string;
  public fechaCreacion: string;
  public activo: boolean;
  constructor(
  ) { }
}
export class PerfilesActividadesModel{
  public id: number;
  public perfil: string;
  public fechaCreacion: string;
  public activo: boolean;
  constructor(
  ) { }
}
export class AlumnosProyectos{
  public idAlumno:number;
  public alumno:string;
  public idProyecto:number;
  public proyectoNombre:string;
  public matricula:string;
  public correo:string;
  public celular:string;
  public carrera:string;
  public facultad:string;
  public universidad:string;
  public id:number;
  public fechaCreacion:string;
  public activo:boolean;

  constructor(
  ) { }
}
export class AlumnosProyectosAsignadosModel{
  public id: number;
  public idAlumno: number;
  public alumno: string;
  public idProyecto: number;
  public proyectoNombre: string;
  public fechaCreacion: string;
  public matricula: string;

  constructor(
  ) { }
}

export class AlumnosProyectosAsignadosAddModel{
  public idAlumno: number;
  public idProyecto: number;
  public activo: boolean;
  constructor(
  ) { }
}

export class AlumnosModel{
  public id: number;
  public nombre: number;
  public paterno: string;
  public materno: number;
  public matricula: string;
  public idUniversidad: number;
  public idFacultad: number;
  public idCarrera: number;
  public idCelular: string;
  public correo: string;
  public cp: string;
  public pais: string;
  public estado: string;
  public municipio: string;
  public colonia: string;
  public calle: string;
  public numExt: string;
  public numInt: string;
  public porcentaje: number;
  public fechaCreacion: string;
  public activo: boolean;
  constructor(
  ) { }
}
export class filtro{


  constructor(
    public idGiro: string,
    public idAreaAccion: string,
    public idRubro: string
  ) { }
}

export class ProyectosCompetencias {
  constructor(
    public idCompetencia: number,
    public activo: boolean,
    public idProyecto?: number,
    public proyecto?: string,
    public competencia?: string,
  ) { }
}
export class ProyectosCarreras {
  constructor(
    public idCarrera: number,
    public activo: boolean,
    public idProyecto?: number,
    public proyecto?: string,
    public carrera?: string,
  ) { }
}

export class ODS {
  constructor(
    public id: number,
    public ods: string,
    public activo: boolean,
    public proyecto?: string,
  ) { }
}
