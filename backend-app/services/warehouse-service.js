const WarehouseDetail = require("../models/warehouse-detail");

const allowedParamKeys = ["quantity", "price", "currency"];

const getAllWarehouseDetails = async (params) => {
  const query = {};
  for (const paramKey in params) {
    if (allowedParamKeys.includes(paramKey)) {
      query[paramKey] = params[paramKey];
    }
  }

  if (Object.values(params).length > 0 && Object.values(query).length < 1) {
    return [];
  }

  return await WarehouseDetail.find(query);
};

const getWarehouseDetailById = async (id) => {
  const warehouseDetail = await WarehouseDetail.findById(id);
  if (!warehouseDetail) {
    throw `WarehouseDetail (${id}) not found`;
  }
  return warehouseDetail;
};

module.exports = {
  getAllWarehouseDetails,
  getWarehouseDetailById,
};