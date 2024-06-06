const http = require('http');
const { promisify } = require('util');
const fs = require('node:fs');

const readData = async (relativeFilePath) => {
    const fileData = await promisify(fs.readFile)(relativeFilePath, 'utf-8');
    const dataObject = await JSON.parse(fileData);
    return dataObject;
};

const startServer = async () => {
    const data = await readData('./topics.json');
    const server = http.createServer((req, res) => {
        if (req.url === "/") {
            res.writeHead(200, {'Content-type' : 'application/json'});
            console.log(typeof(data));
            return res.end(JSON.stringify(data));
        }
        else if (req.url.startsWith('/?id=')){
            const topicID = req.url.split('=');
            return res.end(`${topicID[1]}`)
        }
        else {
            return res.end('<h1>Resource not found</h1>');
        }
    });
    server.listen(80, ()=> { console.log("Server is listening on port 80") });
};

startServer();