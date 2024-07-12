import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  amount: number

  @Column({enum: ["credit", "debit"], nullable: false})
  transactionType: string

  @Column()
  senderName: string

  @Column({nullable: false})
  senderAccountNumber: string

  @Column()
  recipientName: string
  
  @Column()
  recipientAccountNumber: string

  @Column({nullable: false})
  date: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}