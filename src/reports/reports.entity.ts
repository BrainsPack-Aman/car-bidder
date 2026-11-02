import { Entity , Column , PrimaryGeneratedColumn  , ManyToOne} from "typeorm";
import {User} from "../users/users.entity.js";
import { UserDto } from "../users/dtos/user.dto.js";



@Entity()
export class Report {
    
    
    @PrimaryGeneratedColumn()
    id : number ;

    @Column({default:false})
    approved : boolean;

    
    @Column()
    price : number;
    
    @Column()
    make : string;
    
    @Column()
    model : string;
    
    @Column()
    year : number;
    
    @Column()
    lng : number;
    
    @Column()
    lat : number;
    
    @Column()
    mileage : number
    
   @ManyToOne('User', (user: User) => user.reports, { onDelete: 'CASCADE' })
    user: User;
}