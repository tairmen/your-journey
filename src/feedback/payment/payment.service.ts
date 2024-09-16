import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class PaymentService {
    private readonly apiUrl: string;
    private readonly secret: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.apiUrl = this.configService.get<string>('PAYMENT_API_URL');
        this.secret = this.configService.get<string>('PAYMENT_API_SECRET');
    }

    async sendRefill(phone: string): Promise<any> {
        try {
            const data = {
                "timeout": 30,
                "ops": [
                    {
                        "conv_id": 18566,
                        "type": "create",
                        "obj": "task",
                        "data": {
                            "PHONE_NUMBER": phone
                        }
                    }
                ]
            }
            const time = Math.floor(Date.now() / 1000);
            const signature = CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(time + this.secret + data + this.secret));
            const url = `${this.apiUrl}/${time}/${signature}`
            console.log(url)
            console.log(data)
            // const response = await firstValueFrom(this.httpService.post(url, data));
            return true;
        } catch (error) {
            console.error('API request error:', error.message);
            throw new Error('Payment API not respond');
        }
    }
}