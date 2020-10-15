import { Binary } from '@angular/compiler';

export class Documentos {
    constructor(
        public documento: string,
        public configuracion:  number,
        public id: number,
        
  


  
    ) { }


    

}

export class DocumentosCadena {
    constructor(
        public idEstado:  number,

        public idOrganizacion: number,
        public iddocumento:  number,
        public ruta: string,
        public Estado:  string,
        public file:  any



  
    ) { }


    

}
export class Documentosfile {
    constructor(
        public file:  any


  
    ) { }


    

}