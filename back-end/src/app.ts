import express from "express";
import { router } from "./routes/router";

const app = express();
const port = process.env.PORT || 4444;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`listening on port ${port}`));