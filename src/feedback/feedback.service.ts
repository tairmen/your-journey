import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ConfirmPhoneDto } from './dto/confirm.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  findByUserPhone(userPhone: string): Promise<Feedback[]> {
    return this.feedbackRepository.find({ where: { phone: userPhone } });
  }

  async checkAndSaveFeedback(feedback: CreateFeedbackDto): Promise<Feedback> {
    let records = await this.findByUserPhone(feedback.phone);
    if (records.length > 0) {
      
    } else {

    }
    return this.feedbackRepository.create(feedback);
  }

  confirmPhone(confirm: ConfirmPhoneDto): void {
    return;
  }
}