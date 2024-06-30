import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  @IsString()
  @IsNotEmpty()
  firstName: string

  @Column({nullable: false, unique: true})
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column({nullable: false, enum: ["user", "admin"]})
  @IsString()
  @IsNotEmpty()
  userType: string

  @Column({select: false})
  @IsAlphanumeric()
  password: string

  @Column({nullable: true})
  @IsNumber()
  balance: number

  @Column({nullable: false, unique: true})
  @IsNotEmpty()
  accountNumber: string
  userRepository: any;
}
