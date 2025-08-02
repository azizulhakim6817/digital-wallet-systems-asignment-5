// src/server.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Database is connected");

    app.listen(port, () => {
      console.log(`Server is port : http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Server Not Found!:", err);
  }
}

bootstrap();
