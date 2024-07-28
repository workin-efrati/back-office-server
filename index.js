<<<<<<< HEAD
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connect } from "./DL/connect.js";
import genericQueryRouter from "./Routes/genericQuery.router.js";
=======

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connect } from './DL/connect.js';
>>>>>>> 593a34ee8d7f1c5caba4641fd63ba7129b19e522
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

connect();
app.use("/api/genericQuery", genericQueryRouter);

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send("Hello, world!"); 
=======

import playlistRouter from './Routes/playlist.router.js'
app.use('/playlist', playlistRouter)

app.get('/', (req, res) => {
   res.send('Hello, world!');
>>>>>>> 593a34ee8d7f1c5caba4641fd63ba7129b19e522
});

app.listen(PORT, () => {
  console.log(`Server is running on port 'http://localhost:${PORT}'`);
}); 
