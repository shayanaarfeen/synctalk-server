import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

connectDB()
    .then(() => {

        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        });

        const PORT = process.env.PORT || 8000;
        
        // Create an HTTP server
        const server = createServer(app);
        
        // Initialize socket.io with the server
        const io = new Server(server, {
            cors: {
                origin: "*", // Allow requests from this origin
                methods: ["GET", "POST"], // Allow these HTTP methods
                credentials: true // Allow credentials
            }
        });


        // Set up socket.io connection event
        io.on("connection", (socket) => {

            // console.log("A user connected");

            // handle setup events
            socket.on("setup", (user) => {
                socket.join(user.data._id);
                // console.log("User setup data: ", user.data._id);
                socket.emit("conneceted");
            });

        
            // Handle user joining
            socket.on("join chat", (room) => {
                socket.join(room);
                // console.log(`user joined room ${room}`);
            })    

            // handle new messages
            socket.on("new message", (newMessageStatus) => {
                const chat = newMessageStatus.chat;
                if(!chat.users){
                    return console.log("chat.users not defined");
                    
                }
                chat.users.forEach((user) => {
                    if(user._id == newMessageStatus.sender._id) return;
                    
                    socket.in(user._id).emit("meesage received", newMessageRecieved);
                })
                // console.log(`New message: ${message.content}`);
                io.to(message.chat).emit("new message", message);
            });



            // Handle disconnection
            // socket.on("disconnect", () => {
            //     console.log("A user disconnected");
            // });
        });

        // Start the server
        server.listen(PORT, () => {
            console.log(`⚙️ Server is running at port : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
