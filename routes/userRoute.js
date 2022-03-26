import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import mongoose from "mongoose";

const router = express.Router()


// Login, Sign up, Profile

router.post('/', asyncHandler(async (req, res) => {

    const {name, email, password} = req.body;

    // email 유무 체크
    // password 암호화 / 프로필 이미지 자동 생성
    // response

    const userExists = await User.findOne({ email } );
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const avatar = gravatar.url(
        email,
        {
            s: '200',
            r: 'pg',
            d: 'mm',
            protocol: 'https'
        }
    )

    // const newUser = new User ({
    //     name,
    //     email,
    //     password,
    // });
    //
    // const createdUser = await newUser.save();

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImg: avatar,
    })

    if (user) {
        res.json({
            msg:"Sign up",
            user
        })
    } else {
        res.status(408);
        throw new Error("Invailed user Data");
    }

}))


router.post('/login', asyncHandler(async(req, res) => {
    // email 유무 체크
    const {email, password} = req.body;
    const user = await User.findOne({ email } );
    // console.log(userExists)
    if (!user) {
        res.status(404);
        throw new Error("User Not Found");
    }
    // password 매칭
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        res.status(409);
        throw new Error("Password is not matched");
    }

    // response
    res.json({
        msg: "Login Success",
        user
    })
}))

router.get('/', asyncHandler(async (req, res) => {
    res.json({
        msg: "profile",
    })
}))







export default router;













