import multer from "multer"
import path from "path"
import { nanoid } from "nanoid";
import { User } from "./user.model";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'public/uploads'))
    },
    filename: function (req, file, cb) {
        const filename = `${file.fieldname}.${nanoid()}${path.extname(
            file.originalname
        )}`
        cb(null, filename)
    }
})

const upload = multer({ storage: storage }).single("avatar")

export const avatar = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            next(err)
            return
        }

        console.log(req.user)

        const avatar = path.join(
            "/",
            path.basename(req.file.destination),
            "/",
            req.file.filename
        ).split("\\").join("/")

        User.update(
            { "id": req.user.id }, { avatar }
        ).then(() => {
            res.json({
                avatar
            })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    })
}

export const update = async (req, res, next) => {
    try {

        const user = req.user
        const name = req.body.name
        const phone = req.body.phone

        const _user = await User.update({ id: req.user.id }, { name: name, phone: phone })

        res.json({
            _user: {
                name: _user.name,
                phone: _user.phone
            }
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}