import { User } from './user'
import { Prescription } from './prescription'

export class MedicalReceipt {
    prescriptions: Prescription[];
    creationDate: Date[];
    physician: User;
    patient: User;
}