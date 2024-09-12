import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ConfirmPhoneDto } from './dto/confirm-phone.dto'

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  findByUserId(userId: number): Promise<Feedback[]> {
    return this.feedbackRepository.find({ where: { user_id: userId } });
  }

  checkAndSaveFeedback(feedback: CreateFeedbackDto): Promise<Feedback> {
    return this.feedbackRepository.save(feedback);
  }

  confirmPhone(confirm: ConfirmPhoneDto): void {
    return;
  }
}