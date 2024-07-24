import { data } from "./tags_data.js";
import { create, update } from "../DL/controller/tags.controller.js";
import "dotenv/config";
import { connect } from "../DL/connect.js";
connect();
async function createTag(tag, parentId) {
  const parent = await create({
    name: tag.name,
    parent: parentId || null,
  });
  if (tag.children?.length > 0) {
    const childPromises = tag.children.map(async (child) => {
      return await createTag(child, parent._id);
    });
    const childrenId = await Promise.all(childPromises);
    await update(parent._id, { children: childrenId });
  }
  return parent._id;
}
data.forEach(async (tags) => {
  await createTag(tags);
});
