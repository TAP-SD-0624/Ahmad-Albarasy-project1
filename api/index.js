const http = require('http');
const { promisify } = require('util');
const url = require('url');
const fs = require('node:fs');
const port = 80;

const readData = async (relativeFilePath) => {
    const fileData = await promisify(fs.readFile)(relativeFilePath, 'utf-8');
    const dataObject = await JSON.parse(fileData);
    return dataObject;
};

const extractQueriesFromUrl = (requestUrl) => {
    let query = url.parse(requestUrl).query;
        if (!query) {
            return null;
        }
    query = query.split('&');
    const queryObject = {};
    for (pair of query) {
        pair = pair.split('=');
        queryObject[pair[0]] = pair[1];
    }
    return queryObject;
};

const startServer = async () => {
    const data = await readData('./topics.json');
    const server = http.createServer((req, res) => {
        if (req.url === "/") {
            res.writeHead(200, {'Content-type' : 'application/json'});
            return res.end(JSON.stringify(data));
        }
        else if (req.url.startsWith('/topic')){
            const query = extractQueriesFromUrl(req.url);
            if (!query) {
                res.writeHead(404, {'Content-type' : 'application/json'});
                return res.end(`Bad request.`);
            }
            for (topic of data) {
                if ((`${topic.id}`) === query.id){
                    res.writeHead(200, {'Content-type' : 'application/json'});
                    return res.end(`${JSON.stringify(topic)}`);
                }
            }
            return res.end(`Topic not found, ID:${query.id || ' No ID provided.'}`);
        }
        else {
            return res.end('<h1>Resource not found</h1>');
        }
    });
    server.listen(port, ()=> { console.log(`Server is listening on port ${port}`) });
};

startServer();