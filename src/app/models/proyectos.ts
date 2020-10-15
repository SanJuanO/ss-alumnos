
export class Proyecto {
  public proyecto: string;
  public descripcion: string;
  public objetivo: string;
  public idOrganizacion: number;
  public organizacion: string;
  public idArea: number;
  public area: string;
  public idRango: number;
  public rango: string;
  public idPoblacion: number;
  public poblacion: string;
  public beneficioInstitucional: string;
  public comentarios: string;
  public recursosEconomicos: boolean;
  public horasProyecto: number;
  public descripcionFormacion: string;
  public constanciaParticipacion: boolean;
  public descripcionBeneficiosAlumno: string;
  public descripcionImpactoSocial: string;
  public indicadoresImpactoSocial: string;
  public noVacantes: number;
  public fechaInicio: string;
  public fechaTermino: string;
  public idPeriodo: number;
  public periodo: string;
  public disponible: boolean;
  public idUniversidad: number;
  public universidad: string;
  public idEstadoProyecto: number;
  public estadoProyecto: string;
  public observaciones: string;
  public activo: boolean;
  public listaApoyos: Array<listaApoyosModel>;
  public listaLineasTrabajo: Array<listaLineasTrabajoModel>;
  public id: number
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
