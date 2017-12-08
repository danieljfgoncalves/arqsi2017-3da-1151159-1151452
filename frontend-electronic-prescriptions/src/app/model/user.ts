import { Role } from './role'

export class User {
    name: string;
    email: string;
    password: string;
    roles: Role[];
}