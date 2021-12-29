import { HttpService, Module, UseFilters } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common/common.service';
import { getConnectionOptions } from 'typeorm';
import { AuthenticationModule } from './auth/auth.module';
import { BouteillesModule } from './bouteilles/bouteilles.module';
import { BouteillesController } from './bouteilles/bouteilles.controller';
import { BouteillesService } from './bouteilles/bouteilles.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CategoriesModule } from './categories/categories.module';
import { CountriesModule } from './countries/countries.module';
import { TypesModule } from './types/types.module';
import { CategoriesController } from './categories/categories.controller';
import { CountriesController } from './countries/countries.controller';
import { TypesController } from './types/types.controller';
import { CategoriesService } from './categories/categories.service';
import { CountriesService } from './countries/countries.service';
import { TypesService } from './types/types.service';
import { SsoModule } from './sso/sso.module';
import { SsoController } from './sso/sso.controller';
import { SsoService } from './sso/sso.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    // TypeOrmModule.forRoot(
    //   {
    //   type: "mssql",
    //   host: "api-apero-bar.database.windows.net",
    //   port: 1433,
    //   username: "kdtoadmin",
    //   password: "t?wZc2RrrmK^a&CG",
    //   database: "dev",
    //   autoLoadEntities: true,
    //   synchronize: true
    // }
    AuthenticationModule,
    BouteillesModule,
    UsersModule,
    CategoriesModule,
    CountriesModule,
    TypesModule,
    SsoModule
  ],
  controllers: [
    AppController,
    UsersController,
    BouteillesController,
    CategoriesController, 
    CountriesController,
    TypesController,
    SsoController,
  ],
  providers: [
    AppService,
    CommonService,
    UsersService,
    BouteillesService,
    CategoriesService,
    CountriesService, 
    TypesService,
    SsoService,
  ],
})
export class AppModule {}
