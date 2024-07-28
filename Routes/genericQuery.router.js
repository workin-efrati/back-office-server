// const express = require('express'),
import { Router } from "express";
import { genericQuestionsAndAnswers } from "../BL/service/genericQuery.services.js";
const genericQueryRouter = Router();
export default genericQueryRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    console.log("------------------- ROUTER IN  ----------------------");
    const result = await genericQuestionsAndAnswers(req.body);
    // console.log(result);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.msg || err.message || "wrong");
  }
});

// export default genericQueryRouter;
