import jwt from "jsonwebtoken";

const SECRET = 'digitalcollege'

export const singToken = (payload) => jwt.sign(payload, SECRET);

export const verifyToken = (access_token) => {
    const decoded = jwt.verify(access_token, SECRET);
    return decoded;
} 

export const userAlreadyExists = async ({ email }) => {

}

