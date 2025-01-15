import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse, sendResponseWithHeaders } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { userSchema } from '../../models/userSchema.mjs';
import { comparePasswords, hashpassword, generateJWT } from '../../utils/index.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    try {
        let body = event.body;
        if (typeof body === 'string') {
            body = JSON.parse(event.body);
        }

        const { username, password, role } = body;

        const { error } = userSchema.validate(body);
        console.log('Validation result:', error);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }

        const adminUser = {
            username: "admin",
            password: await hashpassword("admin"),
            role: "admin"
        };

        if (!role || !username || !password) {
            console.error('Missing required fields');
            throw new Error('Missing required fields: username, password, and role');
        }

        const isEqual = await comparePasswords(password, adminUser.password);

        if (role === 'admin' && (username !== adminUser.username || !isEqual)) {
            console.error('Invalid admin credentials or permission denied');
            throw new Error('Invalid admin credentials or permission denied');
        }

        const token = generateJWT(JSON.parse(event.body));
        console.log('token', token)
        
        const newLogin = {
            username,
            password,
            role,
        };

        const params = {
            TableName: 'restuarant-guest',
            Item: newLogin,
        };

        await db.put(params);

        if (!params.Item || Object.keys(params.Item).length === 0) {
            return sendResponse(404, { error: 'User not found' });
        }

        return sendResponseWithHeaders(200, { message: 'Login successful', newLogin, token });
    } catch (error) {
        console.error('Error during login:', error);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());