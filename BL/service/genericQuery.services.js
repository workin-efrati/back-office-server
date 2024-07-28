import genericFilterWithPagination from "../../DL/controller/genericQuery.js";
import QAModel from "../../DL/models/qa.model.js";
import tagsModel from "../../DL/models/tags.model.js";

const modelsNames = {
  qa: QAModel,
  tags: tagsModel,
};
export async function genericQuestionsAndAnswers(userQuery) {
  const { modelName } = userQuery;
  console.log(userQuery);
  try {
    userQuery.modelRead = modelsNames[modelName];
    return await genericFilterWithPagination(userQuery);
  } catch (e) {
    console.error(e);
  }
}
