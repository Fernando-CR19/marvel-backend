import jwt from "jsonwebtoken";
import { readDBAsync } from "./db/db";
const SECRET = 'digitalcollege'

export const singToken = (payload) => jwt.sign(payload, SECRET);

export const verifyToken = (access_token) => {
    const decoded = jwt.verify(access_token, SECRET);
    return decoded;
} 

export const userAlreadyExists = async ({ email }) => {
    try {
        const db = await readDBAsync();
        return db.users.findIndex((user) => user.email === email) !== -1;
    } catch (error) {
        console.log(error)
        return false;
    }
}

