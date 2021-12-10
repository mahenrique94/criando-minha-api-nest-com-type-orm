import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './modules/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
