export function sendResponse(status, data) {
    return {
        statusCode: status,
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({data}),
    };
}

export function sendError(status, data) {
    return {
        statusCode: status,
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({success : false, data}),
    };
}
