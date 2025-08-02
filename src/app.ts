import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { walletRoute } from "./routes/wallet.route";
import { authRoute } from "./routes/auth.routes";
import { tarnsactionRoute } from "./routes/transaction.routes";
import { adminRoute } from "./routes/admin.routes";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/wallet", walletRoute);
app.use("/api/transactions", tarnsactionRoute);

export default app;
