import http from 'http';
import express from 'express';
import routes from './routes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());
app.use(express.text());
/** handle browser preflight conditions */
app.use(cors());
app.options('*', cors())

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

app.use('/', routes);

/** Error handling */
app.use((req, res, next) => {
    return res.status(404).send(
        "message: error.message "
    );
});

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT
httpServer.listen(PORT, () => console.log(`*** The server is running on port ${PORT} ***`));

export default {
  app
}