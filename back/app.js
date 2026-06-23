import express from "express";
import cors from "cors";
import studentsRoute from "./routes/studentsRoute.js";
import subjectsRoute from "./routes/subjectsRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/students", studentsRoute);
app.use("/api/v1/subjects", subjectsRoute);
app.use("/api/v1/auth", authRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errstatus = err.status || "error";
  const errmessage = err.message || "internal server error";
  res.status(statusCode).json({ status: errstatus, message: errmessage });
});

export default app;