import vodModel from "../models/vod.model.js";

// CRUD
export const create = (data) => vodModel.create(data);

export const read = (filter) => vodModel.find(filter);

export const readOne = (filter) => vodModel.findOne(filter);

export const update = (id, newData) => vodModel.findByIdAndUpdate(id, newData);

export const del = (id) => vodModel.findByIdAndUpdate(id, { isActive: false });
