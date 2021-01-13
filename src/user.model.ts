import mongoose, { Schema } from "mongoose";
import { v4 } from "uuid";
import { UserEmail } from "./user-email.model";

export interface User {
    id: string
    userName: string
    emails: UserEmail[]
}

export const UserSchema : mongoose.Schema<User> = new Schema({
    id: {
        type: Schema.Types.String,
        default: v4(),
        unique: true,
    },
    userName: {
        type: Schema.Types.String,
        unique: true,
        required: true,
        lowercase: true,

    },
    emails: [{
        type: Schema.Types.ObjectId,
        ref: 'Email',
        unique: true,
    }]
}, { timestamps: true })
