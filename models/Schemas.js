const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: "Pritish"
    },
    password: {
        type: String,
        require: true,
        default: "myPass@123"
    }
})

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true,
        default: 'India'
    },
    imagefile: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    
})

// module.exports = {User: mongoose.model("InstaUser", UserSchema), database: "Mongodb"}
module.exports = {User: mongoose.model("InstaUser", UserSchema), Post:mongoose.model("InstaPost", PostSchema)}