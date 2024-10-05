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

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  @IsString()
  @IsNotEmpty()
  userType: string

  @Column({select: false, nullable: false })
  @IsAlphanumeric()
  password: string

  @Column()
  @IsNumber()
  balance: number

  @Column({nullable: false})
  @IsNotEmpty()
  accountNumber: number;
  userRepository: any;

  // @OneToMany(() => Transaction, (transaction) => transaction.user)
  // transaction: Transaction[];
}
