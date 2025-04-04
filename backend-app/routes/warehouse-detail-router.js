const express = require("express");
const {
  getAllWarehouseDetails,
  getWarehouseDetailById,
  deleteWarehouseDetailById
} = require("../services/warehouse-service");
const { isValidJwt } = require("../middleware/auth.middleware");

const warehouseDetailRouter = express.Router();

warehouseDetailRouter.get("/warehouse-details", isValidJwt, async (req, res) => {
  const { query } = req;
  await getAllWarehouseDetails(query)
    .then((warehouseDetails) => res.json(warehouseDetails))
    .catch((error) => res.status(400).send({ error }));
});

warehouseDetailRouter.get("/warehouse-details/:id", isValidJwt, async (req, res) => {
  const id = req.params.id;
  await getWarehouseDetailById(id)
    .then((warehouseDetail) => res.json(warehouseDetail))
    .catch((error) => res.status(404).send({ error }));
});

warehouseDetailRouter.delete("/warehouse-details/:id", isValidJwt, async (req, res) => {
  const id = req.params.id;
  await deleteWarehouseDetailById(id)
    .then((result) => res.json(result))
    .catch((error) => res.status(404).send({ error }));
});

module.exports = warehouseDetailRouter;
