import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Unique } from "typeorm";

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

  @Column()
  @IsAlphanumeric()
  password: string

  @Column()
  @IsNumber()
  balance: number

  @Column()
  @IsNotEmpty()
  accountNumber: string
  Unique: true;
  userRepository: any;
}
