// const express = require('express'),
import { Router } from "express";
import { genericQuestionsAndAnswers } from "../BL/service/genericQuery.services.js";

const genericQueryRouter = Router();

genericQueryRouter.post("/", async (req, res) => {
  try {
    console.log("------------------- ROUTER IN  ----------------------");
    const result = await genericQuestionsAndAnswers(req.body);
    // console.log(result);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.msg || err.message || "wrong");
  }
});

export default genericQueryRouter;
