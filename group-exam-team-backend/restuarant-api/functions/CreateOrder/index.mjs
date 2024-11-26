import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';

export const handler = middy(async (event) => {
    try {
        const body = JSON.parse(event.body);
        const newOrder = {
            id: uuidv4(),
            name: body.name,
            ingredients: body.ingredients,
            type: body.type,
            price: body.price
        };

        const params = {
            TableName: 'restuarant-orders',
            Item: newOrder
        };

        await db.put(params);
    
        return sendResponse(200, 'Ny order är tillagd')
    } catch (error) {
        console.error(error);
        return sendResponse(500, { error: 'Internal Server Error' });
    }


}).use(errorHandler());