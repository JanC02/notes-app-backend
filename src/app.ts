import express from "express";
import { appConfig } from "./config/config.js";
import { cors } from "./middlewares/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { auth } from "./middlewares/auth.js";
import { authRouter } from "./routes/auth.js";
import { usersRouter } from "./routes/users.js";
import { notesRouter } from "./routes/notes.js";

const app = express();

app.use(cors);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', auth, usersRouter);
app.use('/notes', auth, notesRouter);

app.use(errorHandler);

app.listen(appConfig.port, () => {
    console.log(`Listening on port ${appConfig.port}`);
});