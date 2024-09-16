import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ConfirmPhoneDto } from './dto/confirm.dto';
import { Status } from './enums/status.enum';
import { firstValueFrom } from 'rxjs';
import { SmsService } from './sms/sms.service'


@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private readonly smsService: SmsService
  ) { }

  generateNumber(digits: number) {
    let minm = 10 ** (digits - 1);
    let maxm = 10 ** digits - 1;
    return Math.floor(Math
      .random() * (maxm - minm + 1)) + minm;
  }

  findByUserPhone(userPhone: string): Promise<Feedback[]> {
    return this.feedbackRepository.find({ where: { phone: userPhone } });
  }

  async checkAndSaveFeedback(feedback: CreateFeedbackDto): Promise<Feedback> {
    let createdFeedback = this.feedbackRepository.create(feedback);
    let records = await this.findByUserPhone(feedback.phone);
    if (records.length > 0) {
      createdFeedback.status = Status.NO_PAYMENT;
    } else {
      createdFeedback.status = Status.PENDING_OTP;
      createdFeedback.user_id = this.generateNumber(8);
      const code = this.generateNumber(6).toString();
      this.smsService.smsSend(code);
      createdFeedback.code = code
    }

    return this.feedbackRepository.save(createdFeedback);
  }

  confirmPhone(confirm: ConfirmPhoneDto): void {
    return;
  }
}