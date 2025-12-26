import express from "express";

const PORT: number = 3000;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
