import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';
import { validateTokenAdmin } from '../../middlewares/validateTokenAdmin.mjs';

export const handler = middy(async (event) => {
    try {
        const params = {
            TableName: 'restuarant-orders',
        };

        const result = await db.scan(params);

        return sendResponse(200, result.Items);
    } catch(error) {
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler())
  .use(validateTokenAdmin());

/**
 * Författare: Victor
 * Funkar att hämta orders från db. 
 */