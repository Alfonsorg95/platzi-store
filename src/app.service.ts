import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('Task') private task: any[]) {}

  getHello(): string {
    console.log(this.task);
    return 'Hello World!';
  }
}
