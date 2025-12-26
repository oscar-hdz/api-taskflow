import express from "express";
import authRoutes from "./modules/auth/auth.routes";

const PORT: number = 3000;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
