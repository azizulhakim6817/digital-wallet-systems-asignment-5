import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { walletRoute } from "./routes/wallet.route";
import { authRoute } from "./routes/auth.routes";
import { tarnsactionRoute } from "./routes/transaction.routes";
import { adminRoute } from "./routes/admin.routes";
import { userhRoute } from "./routes/user.routes";


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userhRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/wallet", walletRoute);
app.use("/api/v1transactions", tarnsactionRoute);

export default app;
