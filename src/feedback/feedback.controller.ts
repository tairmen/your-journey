import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ConfirmPhoneDto } from './dto/confirm-phone.dto'

@Controller('')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('feedback')
  getAndCheckFeedback(@Body() feedbackData: CreateFeedbackDto): Promise<Feedback> {
    return this.feedbackService.checkAndSaveFeedback(feedbackData);
  }

  @Post('confirm')
  confirmPhone(@Body() codeData: ConfirmPhoneDto): void {
    return this.feedbackService.confirmPhone(codeData);
  }
}