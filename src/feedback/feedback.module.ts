import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Photo } from './photo.entity';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    SmsModule,
    TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forFeature([Feedback])
  ],
  providers: [FeedbackService],
  controllers: [FeedbackController]
})
export class FeedbackModule {}