import express from "express";
import { appConfig } from "./config/config.js";
import { cors } from "./middlewares/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { auth } from "./middlewares/auth.js";
import { authRouter } from "./routes/auth.js";
import { usersRouter } from "./routes/users.js";

const app = express();

app.use(cors);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', auth, usersRouter);

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

app.use(errorHandler);

app.listen(appConfig.port, () => {
    console.log(`Listening on port ${appConfig.port}`);
});