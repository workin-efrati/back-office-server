import cors from "cors";
import "dotenv/config";
import express from "express";
import { connect } from "./DL/connect.js";
import genericQueryRouter from "./Routes/genericQuery.router.js";

import 'dotenv/config';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

connect();
app.use("/api/genericQuery", genericQueryRouter);


import playlistRouter from './Routes/playlist.router.js';
app.use('/playlist', playlistRouter)

app.get('/', (req, res) => {
   res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port 'http://localhost:${PORT}'`);
}); 
