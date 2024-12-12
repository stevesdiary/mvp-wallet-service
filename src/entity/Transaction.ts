import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
// import { User } from "./User"
@Entity()
export class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  amount!: number

  @Column({enum: ["credit", "debit"]})
  transactionType!: string

  @Column()
  senderAccountNumber!: string

  @Column()
  recipientAccountNumber!: string

  @Column()
  date!: Date

  // @ManyToOne(() =>  User, (user) => user.transaction)
  // user: User

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn()
  deletedAt!: Date
}

export default Transaction;