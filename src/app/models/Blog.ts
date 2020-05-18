export class Blog{
    constructor(        
        public title:string,
        public author:string,    
        public date:string,
        public text:string,
        public img_link:string,
        public id?:number,
    ){}
}