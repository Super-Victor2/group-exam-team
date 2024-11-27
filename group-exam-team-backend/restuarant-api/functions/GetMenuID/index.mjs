import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

export const handler = middy(async (event) => {
    try {
        const id = event.pathParameters?.id;

        if (!id) {
            return sendResponse(400, { error: 'Menu item ID is required' });
        }

        const params = {
            TableName: 'restuarant-menu',
            Key: { id },
        };

        const result = await db.send(new GetCommand(params));

        if (!result.Item) {
            return sendResponse(404, { error: 'Menu item not found' });
        }

        return sendResponse(200, result.Item);
    } catch (error) {
        console.error('Error fetching menu item:', error);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());


/**
 * Författare: Victor
 * Jobbar med att hämta meny med specifikt ID. De blir internal server error just nu.
 * Buggfix: Fixade så att de går att se specifkt ID. De var db som krånglade
 */