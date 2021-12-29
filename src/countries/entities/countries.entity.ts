import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'countries' })
export class Countries {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  
  @Column({ nullable: false })
  @ApiProperty()
  name: string;

}
