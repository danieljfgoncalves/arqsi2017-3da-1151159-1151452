export class Posology {
    quantity: string;
    technique: string;
    interval: string;
    period: string;

    constructor(
        quantity: string,
        technique: string,
        interval: string,
        period: string
    ) {
        this.quantity = quantity;
        this.technique = technique;
        this.interval = interval;
        this.period = period;
    }
}