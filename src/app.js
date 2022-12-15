import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import cors from "cors";

import { checkIfIsAutenticated, logErrors } from "./middlewares";
import { fetchApi } from "./api";
import { singToken, userAlreadyExists, verifyToken, makeSalt,encryptPassword, passwordAlreadyExists } from "./auth";
import { readDBAsync } from "./DB/db";
import { writeDBAsync } from "./DB/db";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.get('/characters', async (req, res, next) => {
  try {
    const response = await fetchApi("/characters")
    const data = await response.json()
    const resultado = data.data.results
    res.json(resultado)
  } catch (error) {
    console.log(error)
  }
})

app.post('/auth/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!password) {
      throw new Error("Password is a required field")
    }
    
    const userExist = await userAlreadyExists({ email });

    if(userExist) {
      throw "Access is denied due to invalid credentials"
    }

    const db = await readDBAsync()
    const lastAddedUser = db.users[db.users.length - 1]
    const id = lastAddedUser ? lastAddedUser.id + 1 : 0;

    const _salt = makeSalt();
    const _hashedPassword = encryptPassword(password, _salt)

    const _user = {
      id,
      name,
      email,
      password,
      _salt,
      _hashedPassword
    };

    const user = {
      id,
      name,
      email,
    }

    const access_token = singToken({ email });

    db.users.push(_user);

    await writeDBAsync(db)
    res.status(200).json({user, access_token});


  } catch (err) {
    next(createError(401));
  }
});

app.post("/auth/signin", async (req, res, next) => {
  try {

    const { email, password } = req.body

    const userExist = await userAlreadyExists({ email });

    if(!userExist){
      throw "Access is denied due to invalid credentials"
    }

    const db = await readDBAsync()

    const _user = db.users.find((user) => user.email === email)


    const _hashedPassword = encryptPassword(password, _user._salt)

    if (_user._hashedPassword !== _hashedPassword) {
      throw "Access is denied due to invalid credentials"
    }

    const user = {
      id : _user.id,
      name : _user.name,
      email : _user.email,
      
    }

    const access_token = singToken({ email });
    res.status(200).json({user, access_token }); 

  } catch (err) {
    next(createError(401));
  }
})

app.get("/private",checkIfIsAutenticated,(req,res,next) => {
  console.log(req.query);
  console.log(req.headers);
  res.json({})
})


app.use(logErrors)

export default app;