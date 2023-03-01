export const insertUser = (
    email: string,
    username: string,
    hashedPassword: string,
    salt: string
): number => {
    const userId = 0;
    return userId;
};

export const grantAdminPrivilege = async (userId: number) => {
    return;
};

export const isUserAdmin = (userId: number): boolean => {
    return false;
};
