import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'bouteilles' })
export class Bouteilles {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  
  @Column({ nullable: true })
  @ApiProperty()
  categoryId: number;
  
  @Column({ nullable: true })
  @ApiProperty()
  typeId: number;
  
  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  vintage: number;
 
  @Column({ nullable: true })
  @ApiProperty()
  details: string;
 
  @Column({ nullable: true })
  @ApiProperty()
  image: string;

  @Column({ nullable: true })
  @ApiProperty()
  countryId: number;
  
  @Column({ nullable: true })
  @ApiProperty()
  volume: string;

  @Column({ nullable: true })
  @ApiProperty()
  alcohol: number;

  @Column({ nullable: true })
  @ApiProperty()
  quantity: number;

  @Column({ nullable: true })
  @ApiProperty()
  display: boolean;

  @Column({nullable: true  })
  @ApiProperty()
  toBuy: boolean;
}
