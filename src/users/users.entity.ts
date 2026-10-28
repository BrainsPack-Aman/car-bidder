import { Column , Entity , PrimaryGeneratedColumn , AfterInsert , AfterRemove , AfterUpdate  } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id : number ;

    @Column()
    email : string ;

    @Column()
    password : string;

    @AfterInsert()
    logInsert(){
        console.log(`A user is added with id : ${this.id}`)
    }
    @AfterRemove()
    logRemove(){
        console.log(`A user is Removed with id : ${this.id}`)
    }
    @AfterUpdate()
    logUpdate(){
        console.log(`A user is Updated with id : ${this.id}`)
    }
}