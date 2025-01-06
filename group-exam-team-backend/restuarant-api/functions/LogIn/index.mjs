import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';

export const handler = middy(async (event) => {
    console.log('Received event:', event);
    try {
        const { username, password } = JSON.parse(event.body);

        if (!username || !password) {
            return sendResponse(400, { error: 'Username and password are required' });
        }

        const userId = body.userId || uuidv4();
        const newLogin = {
            userId,
            username: body.username,
            password: body.password,
        }

        const params = {
            TableName: 'restuarant-user',
            user: newLogin,
        };

        await db.put(params)

        if (result.Items.length === 0) {
            return sendResponse(401, { error: 'Invalid username or password' });
        }

        const user = result.Items[0];

        if (user.password !== password) {
            return sendResponse(401, { error: 'Invalid username or password' });
        }

        return sendResponse(200, { message: 'Login successful', user: { username: user.username } });
    } catch (error) {
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());
