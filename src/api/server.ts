import http from 'http';
import express from 'express';
import fileUpload from 'express-fileupload'
import serveStatic from 'serve-static'
import routes from './routes'

export const app = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
// router.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

app.use('/', routes); /* Routes */
app.use(fileUpload()); 
app.use(serveStatic('/test'))

/** Error handling */
app.use((req, res, next) => {
    return res.status(404).send(
        "message: error.message "
    );
});

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.SERVER_PORT || 6060; // env variable not working!!!
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));