import { Comment } from './comment'
import { Posology } from './posology'

export class Presentation {
    drug: string;
    medicines: string[];
    posologies: Posology[];
    form: string;
    concentration: string;
    quantity: string;
    comments: Comment[]
}