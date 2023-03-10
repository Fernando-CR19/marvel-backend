import dynamoose from "dynamoose"
import { nanoid } from "nanoid"

export const CharacterSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        index: true,
        default: nanoid(),
        required: true,
    },
});

export const Character = dynamoose.model("Character", CharacterSchema)