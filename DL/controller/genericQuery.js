import { ObjectId } from "mongodb";

async function genericFilterWithPagination({
  modelRead,
  filters = { isActive: true },
  regFilter,
  queryFilterType = "$and",
  includeFilter,
  selector, // array of selectors
  sorter,
  pages,
  populate,
}) {
  if (!modelRead) throw new Error("no model found ");

  let matchStage = { $match: { [queryFilterType]: [filters] } };
  if (includeFilter?.searchValues.length > 0) {
    const inFilters = includeFilter.searchValues.map((searchValue) => ({
      [searchValue.field]: {
        $in:
          searchValue.type !== "_id"
            ? searchValue.values
            : searchValue.values.map((v) => ObjectId.createFromHexString(v)),
      },
    }));
    matchStage.$match[queryFilterType].push({ [includeFilter.searchType]: inFilters });
  }

  let pipeline = [matchStage];

  if (regFilter?.searchValues.length > 0) {
    const regexConditions = regFilter.searchValues.map((searchValue) => {
      const words = searchValue.value.split(' ');
      return words.map((word) => ({
        $cond: {
          if: { $regexMatch: { input: `$${searchValue.fields[0]}`, regex: new RegExp(word, "i") } },
          then: 1,
          else: 0
        }
      }));
    }).flat();

    pipeline.push({
      $project: {
        matchCount: { $sum: regexConditions },
        document: "$$ROOT"
      }
    });

    const wordsCount = regFilter.searchValues.reduce((sum, searchValue) => sum + searchValue.value.split(' ').length, 0);
    const requiredMatches = Math.ceil(wordsCount * 0.75);
    pipeline.push({ $match: { matchCount: { $gte: requiredMatches } } });
    pipeline.push({ $replaceRoot: { newRoot: "$document" } });
  }


  const countPipeline = [...pipeline, { $count: "totalCount" }];
  const countResult = await modelRead.aggregate(countPipeline).exec();
  const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;


  if (selector?.length > 0) {
    pipeline.push({
      $project: selector.reduce((acc, field) => {
        acc[field.startsWith('-') ? field.slice(1) : field] = field.startsWith('-') ? 0 : 1;
        return acc;
      }, {})
    });
  }

  if (sorter?.length > 0) {
    pipeline.push({
      $sort: sorter.reduce((acc, [field, order]) => {
        acc[field] = order;
        return acc;
      }, {})
    });
  }

  if (pages && pages.pageLocation !== undefined) {
    pipeline.push({ $skip: pages.pageLocation * pages.pageLength });
    pipeline.push({ $limit: pages.pageLength });
  }


  if (populate?.length > 0) {
    populate.forEach((pop) => {
      pipeline.push({
        $lookup: {
          from: pop.name,
          let: { localIds: `$${pop.localField || pop.name}` },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$localIds"]
                }
              }
            },
            {
              $project: pop.selector || {} // Apply selector if provided
            }
          ],
          as: pop.name
        }
      });
      // pipeline.push({ $unwind: { path: `$${pop.name}`, preserveNullAndEmptyArrays: true } });
    });
  }

  const res = await modelRead.aggregate(pipeline).exec();
  return { res, totalCount };
}

export default genericFilterWithPagination;
