import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';
import { userSchema } from '../../models/userSchema.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    try {
        if (!event.body) {
            console.error('Event body is undefined');
            return sendResponse(400, { error: 'Request body is required' });
        }

        body = JSON.parse(event.body);
    } catch (err) {
        console.error('Invalid JSON in request body:', event.body);
        return sendResponse(400, { error: 'Invalid JSON in request body' });
    }

    try {
        const { error } = userSchema.validate(body);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }

        const userId = body.userId || uuidv4();
        const newLogin = {
            userId,
            username: body.username,
            password: body.password,
            role: body.role
        };

        const params = {
            TableName: 'restuarant-user',
            Item: newLogin,
        };

        await db.put(params);

        return sendResponse(200, 'Login successful', newLogin);
    } catch (error) {
        console.error('Caught error:', error);
        return sendResponse(500, { error: error.message || 'Internal Server Error' });
    }
}).use(errorHandler());
