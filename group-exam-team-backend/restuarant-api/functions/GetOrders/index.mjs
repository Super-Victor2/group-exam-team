import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { menu } from '../../data/menu.mjs';

export const handler = middy(async (event) => {
    return sendResponse(200, menu)
}).use(validateKey()).use(errorHandler());