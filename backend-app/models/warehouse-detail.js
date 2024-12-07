const db = require("../database/db-config");

const { Schema } = db;

const warehouseDetailModel = new Schema({
  bookId: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  currency: { type: String },
});

module.exports = db.model("WarehouseDetail", warehouseDetailModel);
