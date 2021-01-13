import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";


export interface UserEmail {
    email: string;
    user: User;
}

export const EmailSchema : mongoose.Schema<UserEmail> = new Schema({
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true,
        uppercase: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { id: false, timestamps: true })