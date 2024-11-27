import { keys } from "../data/keys.mjs";

export const validateKey = () => ({
    before : (handler) => {
        const { key } = handler.event.queryStringParameters;

        if(!key) {
            throw new Error('Måste skicka med en giltig nyckel');
        }

        if(!keys.some(k => k === key)) {
            throw new Error('Din nyckel finns inte');
        }
        return;
    }
});

/**
 * Författare: Victor
 * Validate key funkar, används inte just nu. Måste se om det ska användas
 */