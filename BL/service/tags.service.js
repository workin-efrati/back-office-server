import { populate } from "dotenv";
import {
  create,
  read,
  readOne,
  readOneById,
} from "../../DL/controller/tags.controller.js";

export async function getAllChildTagIdsDeepPopulate(tagId) {
  // Initial query to find the tag and populate its children
  const tag = await readOneById(tagId)
    .populate({
      path: "children",
      populate: {
        path: "children",
        populate: {
          path: "children",
          populate: {
            path: "children",
            populate: {
              path: "children",
              populate: {
                path: "children",
                populate: {
                  path: "children",
                },
              },
            },
          },
        },
      },
    })
    .exec();

  function extractChildIds(tag) {
    let ids = [tag._id.toString()];

    function traverseChildren(children) {
      for (const child of children) {
        ids.push(child._id.toString());
        if (child.children && child.children.length > 0) {
          traverseChildren(child.children);
        }
      }
    }

    if (tag && tag.children && tag.children.length > 0) {
      traverseChildren(tag.children);
    }

    return ids;
  }

  return extractChildIds(tag);
}
