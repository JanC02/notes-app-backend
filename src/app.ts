import { appConfig } from "./config/config.js";
import { cors } from "./middlewares/cors.js";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors);

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

app.listen(appConfig.port, () => {
    console.log(`Listening on port ${appConfig.port}`);
});