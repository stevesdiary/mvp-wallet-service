import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
// import { Transaction } from "./Transaction";
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName: string

  @Column()
  @IsString()
  @IsNotEmpty()
  lastName: string

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  @IsString()
  @IsNotEmpty()
  userType: string

  @Column({ nullable: false })
  @IsAlphanumeric()
  password: string

  @Column({ nullable: false, default: 0 })
  @IsNumber()
  balance: number

  @Column({nullable: false, unique: true})
  @IsNotEmpty()
  accountNumber: string
  userRepository: any;

  // @OneToMany(() => Transaction, (transaction) => transaction.user)
  // transaction: Transaction[];
}
