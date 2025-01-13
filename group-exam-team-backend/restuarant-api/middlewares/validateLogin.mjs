import { comparePasswords, hashpassword } from '../utils/index.mjs';

export const validateLogin = () => ({
    before: async (handler) => {
        let body = handler.event.body;

        if (typeof body === 'string') {
            body = JSON.parse(handler.event.body);
        }

        const adminUser = {
            username: "admin",
            password: await hashpassword("admin"),
            role: "admin"
        };

        const { username, password, role } = body || {};

        if (!role || !username || !password) {
            console.error('Missing required fields');
            throw new Error('Missing required fields: username, password, and role');
        }

        const isEqual = await comparePasswords(password, adminUser.password);

        if (role === 'admin' && (username !== adminUser.username || !isEqual)) {
            console.error('Invalid admin credentials or permission denied');
            throw new Error('Invalid admin credentials or permission denied');
        }
    }
});
