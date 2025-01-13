import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    try {
        const params = {
            TableName: 'restuarant-menu',
        };

        const result = await db.scan(params);

        return sendResponse(200, result.Items);
    } catch (error) {
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());

/**
 * Författare: Victor
 * Funkar att hämta menyn från db. 
 */