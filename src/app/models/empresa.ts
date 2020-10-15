
export class Empresa {
    constructor(
        public estadoOrganizacion: string,
        public universidad:  string,
        public imagen: string,
        public organizacion: string,
        public mision: string,
        public objetivo: string,
        public logros: string,
        public descripcion: string,
        public reconocimiento: string,
        public web: string,
        public cp: string,
        public pais: string,
        public estado: string,
        public municipio:string,
        public ciudad:string,
        public colonia: string,
        public calle: string,
        public noExt: string,
        public noInt: string,
        public activo: boolean,
        public configuracion: number,
        public observaciones: string,
        public id:number,
        public legionario: Boolean=false,
        public disponible:  boolean,
        public idEstadoOrganizacion: number,
        public idUniversidad: number,
        public idTipoOrganizacion: number,
        public idGiroOrganizacion: number,
        public idClasificacionOrganizacion: number,
        public indigenas: number,
        public jovenes: number,
        public mujeres: number,
        public ninos: number,

        public ancianos: number,
        public discapacitados: number,
  public listaAreasAccion:any,
  public listaRubros: any,
  public responsable:any

//   { "nombre": "" ,"apellidos": "","genero": "",
//   "puesto": "","departamento": "",  "disponible": false,"usuario": "","contrasena": true ,
//   "telefono": "",  "correo": false,"id": 0,"activo": true,"fechaCreacion":"" }

  


  
    ) { }


    

}
export class estadoActualizar {
    constructor(
        public idEstado: number,
        public observaciones: string,
        public idOrganizacion: number

        
    ) { }    

}

export class listaRubrosModel {
    constructor(
        public idRubro: number,
        public activo: boolean,

        
    ) { }    

}
export class Responsablemodel {
    constructor(
        public nombre: string,
        public apellidos: string,
        public correo: string,
        public departamento: string,
        public telefono: string,
        public genero: string,
        public puesto: string,
        public usuario: string,
        public contrasena: string,
        public activo: boolean,
        public disponible: boolean,


  
        
    ) { }    

}

export class listaAreasModel {
    constructor(
        public idAreaAccion: number,
        public activo: boolean,

        
    ) { }    

}
export class check {
    constructor(
        public jerarquia: string,
        public disponible: string,

        
    ) { }    

}


