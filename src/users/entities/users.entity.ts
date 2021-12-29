import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  
  @Column({ nullable: true })
  @ApiProperty()
  name: string;
  
  @Column({ nullable: true })
  @ApiProperty()
  admin: boolean;
  
  @Column({ nullable: false })
  @ApiProperty()
  rights: boolean;

  @Column({ nullable: false })
  @ApiProperty()
  username: string;

  @Column({ nullable: false })
  @ApiProperty()
  password: string;
 
}
