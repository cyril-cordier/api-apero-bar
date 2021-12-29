import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Categories {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  
  @Column({ nullable: false })
  @ApiProperty()
  name: string;

}
