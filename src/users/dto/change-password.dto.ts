import { ApiProperty  } from '@nestjs/swagger'

export class ChangePasswordDto
   { 
    @ApiProperty()   
    password: string
}