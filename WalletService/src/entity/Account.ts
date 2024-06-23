import { Entity, PrimaryGeneratedColumn, Column, JoinColumn , OneToOne} from "typeorm"
import { User } from "./User"

@Entity()
export class Account {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  accountNumber: number

  @Column()
  balance: number

  // @Column()
  // userId: string

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn()
  user: User;

  @Column()
  transaction: string
}