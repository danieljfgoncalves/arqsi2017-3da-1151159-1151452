import { Fill } from './fill'
import { Posology } from './posology'
import { Presentation } from './presentation'

export class Prescription {
    expirationDate: Date;
    quantity: number;
    presentation: Presentation;
    posology: Posology;
    medicine: string;
    fills: Fill[];
}