import mongoose from "mongoose";

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
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);

export default User;