import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Social-Media-project",
    });

    console.log("Conected to database");
  } catch (error) {
    console.log(error);
  }
};
