import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';
import { validateTokenAdmin } from '../../middlewares/validateTokenAdmin.mjs';

export const handler = middy(async (event) => {
    try {
        const orderId = event.pathParameters?.id;

        if (!orderId) {
            console.error('No orderId provided');
            return sendResponse(400, { error: 'Order item ID is required' });
        }

        await db.update({
            TableName: 'restuarant-orders',
            Key : { orderId },
            UpdateExpression: 'SET #status = :status',
            ExpressionAttributeNames: {
                '#status': 'status',
            },
            ExpressionAttributeValues: {
                ':status': 'confirmed',
            }
        });

        return sendResponse(200, { orderId, status: 'confirmed' });
    } catch(error) {
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler())
  .use(validateTokenAdmin());