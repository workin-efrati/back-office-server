import tagsModel from "../models/tags.model.js";

// CRUD
export const create = (data) => tagsModel.create(data);

export const read = (filter) => tagsModel.find(filter);

export const readOne = (filter) => tagsModel.findOne(filter);

export const readOneById = (id) => tagsModel.findById(id);

export const update = (id, newData) => tagsModel.findByIdAndUpdate(id, newData);

export const del = (id) => tagsModel.findByIdAndUpdate(id, { isActive: false });
