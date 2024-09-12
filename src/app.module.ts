import { Module } from '@nestjs/common';
import { FeedbackModule } from './feedback/feedback.module';
import { DatabaseModule } from './config/database.module';
import { AppConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule, 
    DatabaseModule,
    FeedbackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

