export interface JwtPayload{
    email: string;
    documentType?:string;
    document?:number;
    name?: string;
    lastName?:string;
    sex?:string;
    location?:string;
    phone?:number;
    photography?:string;
    createAt?:Date;
    updateAt?:Date;
    
}