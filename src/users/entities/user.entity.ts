import{BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    documentType:string;

    @Column('varchar')
    document:number;

    @Column('varchar')
    name: string;
    
    @Column('varchar')
    lastName:string;

    @Column('varchar')
    sex:string;

    @Column('varchar')
    location:string;

    @Column('number')
    phone:number;

    @Column('varchar',{
        unique:true,})
    email:string;
    
    @Column('varchar')
    password:string;

    @Column('varchar')
    photography:string;

    @Column('date')
    createAt:Date;

    @Column('date')
    updateAt:Date;
    

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }
    @BeforeInsert()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }
}
