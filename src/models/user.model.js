import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        name: {
            type: String,
            requried: true,
        },
        email: {
            type: String,
            requried: true,
        },
        password: {
            type: String,
            requried: true,
        },
    },
    {
        timeStamp: true,
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next()
})


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export const User = mongoose.model("User", userSchema)