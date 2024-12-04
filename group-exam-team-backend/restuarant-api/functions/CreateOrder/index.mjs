import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';
import { menuSchema } from '../../models/menuSchema.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', event);
    try {
        const body = JSON.parse(event.body);

        const { error } = menuSchema.validate(body);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }

        const newOrder = {
            orderId: uuidv4(),
            name: body.name,
            ingredients: body.ingredients,
            type: body.type,
            price: body.price,
        };

        const params = {
            TableName: 'restuarant-orders',
            Item: newOrder,
        };

        await db.put(params);

        return sendResponse(200, 'New order has been added', newOrder);
    } catch (error) {
        console.error('Caught error:', error.message);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());

/**
 * Författare: Victor
 * Skapa order till menyn, skapat upp lite grund.
 * Buggfix: Bytte id till orderId
 * Ska fixas: Måste göras så att mer än price och type skickas med.
 */