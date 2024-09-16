import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SmsService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('SMS_API_URL');
    this.apiKey = this.configService.get<string>('SMS_API_KEY');
  }

  async smsSend(phone: string, code: string): Promise<any> {
    try {
      const data = {
        "messages": [
          {
            "sender": "Testing PM OTP",
            "destinations": [
              {
                "to": phone
              }
            ],
            "content": {
              "text": `Your verification code:${code}`
            }
          }
        ]
      }
      const response = await firstValueFrom(this.httpService.post(this.apiUrl, data, {
        headers: {
          Authorization: `App ${this.apiKey}`
        }
      }));
      return response.data;
    } catch (error) {
      console.error('API request error:', error.message);
      throw new Error('SMS API not respond');
    }
  }
}