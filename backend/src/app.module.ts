import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://yashamanmeena1:28CGXOYIv5auk9hw@ahoum.swqlg50.mongodb.net/jobmanagement'),
    JobsModule,
  ],
})
export class AppModule {}
