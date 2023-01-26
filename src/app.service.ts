import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('Task') private task: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private pgclient: Client,
  ) {}

  getHello(): string {
    const apiKey = this.configService.postgres.dbName;
    const database = this.configService.database.name;
    const dataport = this.configService.database.port;
    //console.log(this.task);
    return `Hello World! API: ${apiKey}, DB: ${database}, Port: ${dataport}`;
  }
}
