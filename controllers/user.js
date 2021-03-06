import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const loginUser = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Users']
  // email 유무 체크
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // console.log(userExists)
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  // password 매칭
  // const isMatched = await bcrypt.compare(password, user.password);

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    res.status(409);
    throw new Error("Password is not matched");
  }
  // console.log(i)

  // response
  res.json({
    // test: isMatched,
    success: isMatched,
    token: generateToken(user._id),
  });
});

const registerUser = asyncHandler(async (req, res) => {
  /*
  #swagger.tags = ['Users']
  */

  const { name, email, password } = req.body;

  // email 유무 체크
  // password 암호화 / 프로필 이미지 자동 생성
  // response

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // const hashedPassword = await bcrypt.hash(password, 10);
  //
  // const avatar = gravatar.url(
  //     email,
  //     {
  //         s: '200',
  //         r: 'pg',
  //         d: 'mm',
  //         protocol: 'https'
  //     }
  // )

  // const newUser = new User ({
  //     name,
  //     email,
  //     password,
  // });
  //
  // const user = await newUser.save();

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.json({
      msg: "Sign up",
      user,
    });
  } else {
    res.status(422);
    throw new Error("Invailed user Data");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Users']
  const { name, email, password, bio, address, profileImg } = req.body;
  console.log(req.user);

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.bio = bio || user.bio;
    user.address = address || user.address;
    user.profileImg = profileImg || user.profileImg;

    const updateduser = await user.save();
    res.json({
      msg: "updated at " + req.user._id,
      user: updateduser,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserOnlyAdmin = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Users']
  const { name, email, password, bio, address, profileImg } = req.body;
  console.log(req.user);

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.bio = bio || user.bio;
    user.address = address || user.address;
    user.profileImg = profileImg || user.profileImg;

    const updateduser = await user.save();
    res.json({
      msg: "updated at " + req.user._id,
      user: updateduser,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getProfile = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Users']
  res.json({
    msg: "profile",
    user: req.user,
  });
});

export { loginUser, registerUser, updateUser, updateUserOnlyAdmin, getProfile };
