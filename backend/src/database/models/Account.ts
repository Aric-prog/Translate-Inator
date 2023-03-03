export default class Account {
    id: number;
    username: string;
    email: string;
    hashedpassword: string;
    isadmin: boolean;
    salt: string;
}
