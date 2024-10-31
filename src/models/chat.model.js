import mongoose, { Schema } from "mongoose";


const chatSchema = new Schema(
    {
        chatName: { type: String },
        isGroupChat: { type: Boolean },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timeStamp: true,
    }
)


export const Chat = mongoose.model("Chat", chatSchema)