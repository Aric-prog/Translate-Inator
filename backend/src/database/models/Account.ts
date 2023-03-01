export default class Account {
    id: number;
    username: string;
    email: string;
    hashedPassword: string;
    isAdmin: boolean;
    salt: string;
}
