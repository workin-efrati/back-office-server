import { Router } from "express";
import { getAllChildTagIdsDeepPopulate } from "../BL/service/tags.service.js";

const tagsRouter = Router();

tagsRouter.get("/tagsWithChildren/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const tagsIds = await getAllChildTagIdsDeepPopulate(id);
    res.send(tagsIds);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default tagsRouter;
