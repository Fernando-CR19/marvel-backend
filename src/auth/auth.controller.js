import { makeSalt, encryptPassword, singToken } from "./auth.service"
import { Forbidden, Unathorized } from "../utils/http-error/http-error"
import { User } from "../api/user/user.model"

export const signInWithEmail = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const query = await User.query("email").eq(email).exec()

        if (query.count === 0) {
            throw new Error("user does not exist")
        }

        const user = query[0]

        if (user._hashedPassword !== encryptPassword(password, user._salt)) {
            throw new Error("Password does not match")
        }

        const access_token = singToken(user.id)

        res.json({
            access_token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        console.log(err)
        next(new Unathorized())
    }
};

export const signUpWithEmail = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const query = await User.query("email").eq(email).exec()

        if (query.count > 0) {
            throw new Error("User already exist");
        }

        const user = query[0]

        const _salt = makeSalt();
        const _hashedPassword = encryptPassword(password, _salt)

        const newUser = new User({
            name,
            email,
            _salt,
            _hashedPassword
        })

        await newUser.save()

        const access_token = singToken(newUser.id)

        res.json({
            access_token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        })

    } catch (err) {
        next(new Forbidden())
    }
};

export const changePassword = async (req, res, next) => {
    try {

        console.log(req.user)

        const _hashedPassword = encryptPassword(req.body.password, req.user._salt)

        if (req.body.newPassword?.length < 8) {
            throw new Error("Password is short")
        }

        if (_hashedPassword !== req.user._hashedPassword) {
            throw new Error("Password does not match")
        }

        const _newSalt = makeSalt();
        const _newHashedPassword = encryptPassword(req.body.newPassword, _newSalt)

        await User.update({ id: req.user.id }, { _salt: _newSalt, _hashedPassword: _newHashedPassword })

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        next(new Unathorized())
    }
}