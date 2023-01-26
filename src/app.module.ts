import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { enviroments } from './enviroment';
import config from './config';
import configSchema from './configSchema';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'Task',
      useFactory: async (http: HttpService) => {
        const task = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
          { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } },
        );
        const value = Promise.resolve(firstValueFrom(task));
        return value; // This task is only for educational purpose
      }, // Is not recomended to call an external API
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
