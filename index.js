const https = require('https');

function postRequest(message, hookURI){

    const payload =  { "text": `${message}` };

    const data = JSON.stringify(payload);

    const options = {
        hostname: 'hooks.slack.com',
        path: hookURI,
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let rawData = '';

            res.on('data', chunk => {
                rawData += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    body: `${rawData}`
                });
            });
        });

        req.on('error', err => {
            reject(new Error(err));
        });

        req.write(data);
        req.end();
    });
};

module.exports = {postRequest}