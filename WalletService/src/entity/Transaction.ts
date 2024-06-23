import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  amount: number

  @Column()
  userId: string

  @Column()
  accountId: string

  @Column()
  date: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}