import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'types' })
export class Types {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  
  @Column({ nullable: false })
  @ApiProperty()
  name: string;

}
