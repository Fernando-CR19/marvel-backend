import multer from "multer"
import path from "path"
import { nanoid } from "nanoid";

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
        if(err) {
            next(err)
            return
        }

        // s3 ou cloudinary

        res.json({
           avatar: path.join(
            "/",
            path.basename(req.file.destination),
            "/",
            req.file.filename
           ),
        })
    })
}
