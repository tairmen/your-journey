import { Controller, Get, Post, Param, Body, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ConfirmPhoneDto } from './dto/confirm.dto';

@Controller('')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('feedback')
  @UseInterceptors(FilesInterceptor('files', 10))
  getAndCheckFeedback(
    @Body() feedbackData: CreateFeedbackDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<Feedback> {
    console.log('Files', files);
    return this.feedbackService.checkAndSaveFeedback(feedbackData);
  }

  @Post('confirm')
  confirmPhone(@Body() codeData: ConfirmPhoneDto): Promise<Feedback> {
    return this.feedbackService.confirmPhone(codeData);
  }
}