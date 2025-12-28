import { appConfig } from "./config/config.js";
import { cors } from "./middlewares/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import express from "express";

const app = express();

app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

app.use(errorHandler);

app.listen(appConfig.port, () => {
    console.log(`Listening on port ${appConfig.port}`);
});