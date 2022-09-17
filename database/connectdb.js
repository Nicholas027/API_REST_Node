import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("Connect DB OK ✔");
} catch (error) {
  throw new Error("❌ Couldn't connect to MongoDB: " + error);
}
