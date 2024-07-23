import tags_data from "../data/tags_data.js";
import { create, update } from "../DL/controller/tags.controller.js";

require("dotenv").config();
require("./DL/db.js").connect();
function extractNameAndChildren(obj) {
  return {
    name: obj.name,
    children: obj.children ? obj.children.map(extractNameAndChildren) : [],
  };
}

const transformedData = tags.map((obj) => extractNameAndChildren(obj));
async function createTag(tag, fatherId) {
  const father = await create({
    name: tag.name,
    parent: fatherId || null,
  });
  if (tag.children?.length > 0) {
    const childPromises = tag.children.map(async (child) => {
      return await createTag(child, father._id);
    });
    const childrenId = await Promise.all(childPromises);
    await update(father._id, { childrenTags: childrenId });
  }
  return father._id;
}
// (async () => {
//   const tag = await tgController.readOne({ _id: "669e02b05f4c45816d2f4136" });
//   console.log(tag);
// })();
