const express = require("express");
const router = express.Router()
const checkAuth = require("../middleware/check-auth");
 
const ordersController =require("../controller/orders");

router.get("/",checkAuth,ordersController.orders_get_all);
router.post("/",checkAuth,ordersController.orders_create_orders);
  
  
router.get("/:orderId",checkAuth,ordersController.orders_get_order);
router.delete("/:orderId",checkAuth,ordersController.orders_delete_order)


module.exports = router;