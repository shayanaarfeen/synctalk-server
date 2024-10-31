import express from "express";
import cors from "cors";
import { notFound, errorHandler } from './middleware/error.middleware.js'

const app = express();

app.use(cors());

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     Credentials: true
// }))

app.use(express.json({ limit: "16kb" }))



//routes import

import userRoutes from './Routes/user.routes.js'
import chatRoutes from './Routes/chat.routes.js'
import messageRoutes from './Routes/message.routes.js'

//routes declaration

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

export { app }