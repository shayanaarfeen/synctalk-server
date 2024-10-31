import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            trim: true,
        },
        reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },
    },
    {
        timeStamp: true,
    }
)


export const Message = mongoose.model("Message", messageSchema)