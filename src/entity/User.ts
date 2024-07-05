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
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  @IsString()
  @IsNotEmpty()
  userType: string

  @Column() //{select: false}
  @IsAlphanumeric()
  password: string

  @Column()
  @IsNumber()
  balance: number

  @Column({nullable: false, unique: true})
  @IsNotEmpty()
  accountNumber: string
  userRepository: any;

  // @OneToMany(() => Transaction, (transaction) => transaction.user)
  // transaction: Transaction[];
}
