import express, { json } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

app.get("/up", (req, res) => {
  res.json({ status: "Server is up and running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
