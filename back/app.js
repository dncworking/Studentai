import express from "express";
import studentsRoute from "./routes/studentsRoute.js";
import subjectsRoute from "./routes/subjectsRoute.js";

const app = express();
app.use(express.json());

app.use("/api/v1/students", studentsRoute);
app.use("/api/v1/subjects", subjectsRoute);


//centralizes error handling middleware, if first functions arguments is error , express will know that this is error handling middleware
app.use((err, req, res, next) => {
  // const {statusCode, status, message} = err
  const statusCode = err.statusCode || 500;
  const errstatus = err.status || "error";
  const errmessage = err.message || "internal server error";

  res.status(statusCode).json({ status: errstatus, message: errmessage });
});

export default app;