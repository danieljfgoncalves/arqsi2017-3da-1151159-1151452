import { User } from './user'
import { Prescription } from './prescription'

export class MedicalReceipt {
    prescriptions: Prescription[];
    creationDate: Date;
    physician: User;
    patient: User;

    constructor(
        prescriptions: Prescription[],
        creationDate: Date,
        physician: User,
        patient: User
    ) {
        this.prescriptions = prescriptions;
        this.creationDate = creationDate;
        this.physician = physician;
        this.patient = patient;
    }
}