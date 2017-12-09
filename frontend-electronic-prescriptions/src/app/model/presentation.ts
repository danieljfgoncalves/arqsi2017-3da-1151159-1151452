import { Comment } from './comment'
import { Posology } from './posology'

export class Presentation {
    drug: string;
    medicines: string[];
    posologies: Posology[];
    form: string;
    concentration: string;
    quantity: string;
    comments: Comment[];

    constructor(
        drug: string,
        medicines: string[],
        posologies: Posology[],
        form: string,
        concentration: string,
        quantity: string,
        comments: Comment[]
    ) {
        this.drug = drug;
        this.medicines = medicines;
        this.posologies = posologies;
        this.form = form;
        this.concentration = concentration;
        this.quantity = quantity;
        this.comments = comments;
    }
}