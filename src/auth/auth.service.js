import jwt from "jsonwebtoken";
import crypto from "crypto";

const SECRET = "digitalcollege"
export const singToken = (sub) => jwt.sign({ sub }, SECRET);

export const verifyToken = (access_token) => {
    const decoded = jwt.verify(access_token, SECRET);
    return decoded;
};

export const makeSalt = () => {
    return crypto.randomBytes(16).toString("base64")
};

export const encryptPassword = (plainPassword = "", salt = "") => {
    return crypto
        .pbkdf2Sync(plainPassword, salt, 100000, 64, "sha512")
        .toString("base64");
}