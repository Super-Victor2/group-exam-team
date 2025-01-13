import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const hashpassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const comparePasswords = async (password, storedPassword) => {
    const isEqual = await bcrypt.compare(password, storedPassword);
    return isEqual;
};