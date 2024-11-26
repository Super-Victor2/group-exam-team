import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';

export const handler = middy(async (event) => {
    return sendResponse(200)
}).use(validateKey());