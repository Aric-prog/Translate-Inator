import { createNewUser } from "../repository/AuthRepository.js";

export const signUp = async (username: string, password: string) => {
    createNewUser(username, password);
    return;
};
