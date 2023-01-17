import dynamoose from "dynamoose"
import { nanoid } from "nanoid"

export const UserSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        index: true,
        default: nanoid(),
        required: true,
    },
    name: {
        type: String,
    },
    phone: String,
    email: {
        type: String,
        index: {
            name: "email-index",
            type: "global",
        },
        required: true,
    },
    avatar: String,
    _hashedPassword: String,
    _salt: String,
});

export const User = dynamoose.model("User", UserSchema)