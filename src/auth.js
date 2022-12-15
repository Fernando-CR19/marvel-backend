import jwt from "jsonwebtoken";
import crypto from "crypto";
import { readDBAsync } from "./db/db";



const SECRET = 'digitalcollege'

export const singToken = (payload) => jwt.sign(payload, SECRET);

export const verifyToken = (access_token) => {
    const decoded = jwt.verify(access_token, SECRET);
    return decoded;
};

export const userAlreadyExists = async ({ email }) => {
    try {
        const db = await readDBAsync();
        return db.users.findIndex((user) => user.email === email) !== -1;
    } catch (error) {
        console.log(error)
        return false;
    }
};

export const makeSalt = () => {
    return crypto.randomBytes(16).toString("base64")
};

export const encryptPassword = (plainPassword = "", salt = "") => {
    return crypto
    .pbkdf2Sync(plainPassword , salt , 100000, 64, "sha512")
    .toString("base64");
}