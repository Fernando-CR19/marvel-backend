import { userAlreadyExists } from "../auth";
import { makeSalt, encryptPassword } from "./auth.service"

export const signInWithEmail = async (req, res, next) => { };
export const signUpWithEmail = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const query = await userAlreadyExists.query("email").eq(email).exec()

        if (!query.count) {
            throw new Error("User already exist");
        }

        const user = query[0]

        const _salt = makeSalt();
        const _hashedPassword = encryptPassword(password, _salt)

        const newUser = new user({
            name,
            email,
            _salt,
            _hashedPassword
        })

        await newUser.save()
    } catch (err) {
        
    }
};