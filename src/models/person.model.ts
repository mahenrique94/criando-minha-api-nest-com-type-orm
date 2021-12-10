import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column('int')
  age: number;

  @Column({ length: 255 })
  email: string;
}
