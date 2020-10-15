export class Convocatoria {
    constructor(
        public convocatoria: string,
        public tipo: number,
        public id: number,
        public universidad: string,
        public idUniversidad: number,
        public idPeriodo: number,
        public periodo: string,
        public fechaInicio:Date,
        public fechaTermino:Date,
        
        public activo: boolean,
        public descripcion: string

        
    ) { }

} 
export class Tipo {
    constructor(
        public tipo: number

        
    ) { }

} 
