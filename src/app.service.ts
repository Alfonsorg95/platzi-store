import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('Task') private task: any[],
    private config: ConfigService,
  ) {}

  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    const database = this.config.get('DATABASE_NAME');
    //console.log(this.task);
    return `Hello World! API: ${apiKey}, DB: ${database}`;
  }
}
