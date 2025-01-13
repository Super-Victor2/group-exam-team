import { hashpassword } from '../../utils/index.mjs';

export const adminUser = {
    username: "admin",
    password: await hashpassword("admin"),
    role: "admin"
};