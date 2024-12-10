import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';
import { menuSchema } from '../../models/menuSchema.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', event);
    try {
        const body = JSON.parse(event.body);

        // Validate input
        const { error } = menuSchema.validate(body);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }

        // Generate orderId
        const orderId = body.orderId || uuidv4(); // Reuse orderId if provided, else create a new one

        // Create a new product object
        const newProduct = {
            id: uuidv4(), // Unique ID for the product
            name: body.name,
            ingredients: body.ingredients,
            type: body.type,
            price: body.price,
            class: body.class,
            quantity: body.quantity,
        };

        // Fetch existing order data from the database
        const existingOrder = await db.get({
            TableName: 'restaurant-orders',
            Key: { orderId }
        }).promise();

        let products = [];
        if (existingOrder.Item) {
            products = existingOrder.Item.products || [];
        }

        // Add the new product to the products array
        products.push(newProduct);

        // Save updated data back to the database
        await db.put({
            TableName: 'restaurant-orders',
            Item: {
                orderId,
                products
            }
        }).promise();

        // Return success response
        return sendResponse(200, { message: 'Order updated successfully', orderId, products });
    } catch (error) {
        console.error('Caught error:', error.message);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());
