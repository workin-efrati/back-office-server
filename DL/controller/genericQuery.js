import tagsModel from "./DL/models/tags.model.js";
import { ObjectId } from "mongodb";
/**
 * פונקציה לחיפוש עם פילטרים ומיון במודל Mongoose.
 *
 * @param {Object} params - פרמטרים לפונקציה.
 * @param {Object} params.modelRead - המודל של Mongoose לחיפוש.
 * @param {Object} params.filters - פילטרים כלליים לחיפוש.
 * @param {Object} [params.regFilter] - פילטרים עם ביטויים רגולריים (שדה `searchType`, `searchValues`).
 * @param {string} [params.queryFilterType="$and"] - סוג השאילתא ($and או $or).
 * @param {Object} [params.includeFilter] - פילטרים עם ערכים שונים (שדה `searchType`, `searchValues`).
 * @param {Array} [params.selector] - שדות לבחירה או הסרה מהתוצאות.
 * @param {Array} [params.sorter] - קריטריונים למיון התוצאות.
 * @param {Object} [params.pages] - פרמטרים לדפי תוצאות (שדות `pageLoc` ו-`pageAmount`).
 * @param {Array} [params.populate] - קשרים לפופולציה עם שדות לבחירה.
 *
 * @example
 * const objToSearch = {
 *   modelRead: tagsModel,
 *   filters: { isActive: false },
 *   includeFilter: {
 *     searchType: "$and",
 *     searchValues: [
 *       { field: "_id", values: ["669e258bffbe0a8191e0877b"], searchType: "$or" },
 *       { field: "name", values: ["שבת"], searchType: "$or" },
 *     ],
 *   },
 *   regFilter: {
 *     searchType: "$and",
 *     searchValues: [
 *       { fields: ["name"], value: "שבת ו", searchType: "$or" },
 *     ],
 *   },
 *   selector: "-topicImages -isActive",
 *   sorter: [["name", -1]],
 *   pages: { pageLoc: 0, pageAmount: 4 },
 *   populate: [{ name: "parent", selectors: "name" }],
 * };
 * genericFilterWithPage(objToSearch);
 */
async function genericFilterWithPagination({
  modelRead,
  filters,
  regFilter,
  queryFilterType = "$and",
  includeFilter,
  selector,
  sorter,
  pages,
  populate,
}) {
  let queryFilter = { [queryFilterType]: [filters] };
  if (regFilter?.searchValues.length > 0) {
    const regexFilters = regFilter.searchValues.map((searchValue) => {
      const regex = new RegExp(searchValue.value, "i");
      return {
        [searchValue.searchType]: searchValue.fields.map((field) => ({
          [field]: { $regex: regex },
        })),
      };
    });
    const regSearch = {
      [regFilter.searchType]: regexFilters,
    };
    queryFilter[queryFilterType].push(regSearch);
  }
  if (includeFilter?.searchValues.length > 0) {
    const inFilters = includeFilter.searchValues.map((searchValue) => ({
      [searchValue.field]: {
        $in:
          searchValue.field !== "_id"
            ? searchValue.values
            : searchValue.values.map((v) => ObjectId.createFromHexString(v)),
      },
    }));
    const inFilter = {
      [includeFilter.searchType]: inFilters,
    };
    queryFilter[queryFilterType].push(inFilter);
  }
  let query = modelRead.find(queryFilter);
  if (selector?.length > 0) query = query.select(selector);
  if (sorter?.length > 0) query.sort(sorter);

  const newData = query.clone();
  const arrLength = await newData.countDocuments();

  if (pages && pages.pageLoc !== undefined) {
    query.skip(pages.pageLoc * pages.pageAmount).limit(pages.pageAmount);
  }
  if (populate?.length > 0) {
    populate.forEach((pop) => {
      query.populate(pop.name, pop.selectors);
    });
  }
  const res = await query.exec();
  console.log(res, arrLength);
  return { res, arrLength };
}
export default genericFilterWithPagination;

//example for query
const objToSearch = {
  modelRead: tagsModel,
  filters: { isActive: true },
  includeFilter: {
    searchType: "$or",
    searchValues: [
      {
        field: "_id",
        values: ["669e258bffbe0a8191e0877b", "66a0bc2cdc4f1cc14e6c3a3e"],
        searchType: "$or",
      },
    ],
  },
  regFilter: {
    searchType: "$or",
    searchValues: [{ fields: ["name"], value: "שבת ו", searchType: "$or" }],
  },
  selector: "-topicImages -isActive -childrenTags -parent",
  sorter: [["name", -1]],
  pages: { pageLoc: 0, pageAmount: 4 },
  populate: [{ selectors: "name", name: "parent" }],
};
