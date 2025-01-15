import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { userSchema } from '../../models/userSchema.mjs';
import { hashpassword } from '../../utils/index.mjs';

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

        if (role === "admin") {
            console.error("User cant be created!")
            throw new Error("User can not be created!")
        }

        const newUser = {
            username: username,
            password: await hashpassword(password),
            role: role,
        };

        const params = {
            TableName: 'restuarant-guest',
            Item: newUser,
        };

        await db.put(params);

        return sendResponse(200, { message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error during user creation:', error);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());


