export class CreateFeedbackDto {
    readonly phone: string;
    readonly comment?: string;
    sku_name?: string;
    readonly link?: string;
    readonly design: number;
    readonly flavor: number;
    filter?: number;
    readonly factory: string;
}