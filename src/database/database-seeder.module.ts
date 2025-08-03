import { Module } from '@nestjs/common';
import { DatabaseSeederService } from './database-seeder.service';

@Module({
  providers: [DatabaseSeederService],
})
export class DatabaseSeederModule {}
