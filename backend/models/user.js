const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trime: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      trime: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trime: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trime: true,
      text: true,
      uniqueL: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      // trime: true,
    },
    picture: {
      type: String,
      // required: [true, "first name is required"],
      // trime: true,
      // text: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trime: true,
    },
    bYear: {
      type: Number,
      required: true,
      trime: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trime: true,
    },
    bDay: {
      type: Number,
      required: true,
      trime: true,
    },
    verified: {
      type: Number,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    follower: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [{ user: { type: ObjectId, ref: "User" } }],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
