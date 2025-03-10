import mongose from "mongoose";

// user schema
const userSchema = new mongose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    followers: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    profilePic: {
      id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongose.model("User", userSchema);
