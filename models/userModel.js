import mongoose from "mongoose";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "Man",
    },
    // 객체로도가능
    address: {
      type: String,
    },
    profileImg: {
      type: String,
    },
    isAdmin: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    console.log("entered");

    const avatar = gravatar.url(this.email, {
      s: "200",
      r: "pg",
      d: "mm",
      protocol: "https",
    });
    this.profileImg = avatar;
    // const salt = await bcrypt.getSalt('10')
    const passwordHash = await bcrypt.hash(this.password, 10);
    this.password = passwordHash;

    console.log("exited");

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (inputPassword) {
  // bcrypt.compare(inputPassword, this.password, function (err, isMatched) {
  //     if (err) return cb(err);
  //     cb(null, isMatched);
  // })

  const isMatched = await bcrypt.compare(inputPassword, this.password);
  return isMatched;
};

const User = mongoose.model("user", userSchema);

export default User;
