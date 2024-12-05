import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';

export const handler = middy(async (event) => {
    try {

        const { id } = JSON.parse(event.body)

        console.log('Event Body:', event.body);

        if (!event.body) {
            return sendResponse(400, { error: 'Request body is required' });
        }

        if (!id) {
            return sendResponse(400, { error: 'ID is required' });
        }

        const params = {
            TableName: 'restuarant-orders',
            Key: { id }
        };

        await db.delete(params);

        return sendResponse(200, 'Order borttagen');
    } catch (error) {
        console.log(error)
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());