import { Router } from "express";
import { orderController } from "../controllers/index.js";
import { orderSchema } from "../validation/index.js";
import { validateData } from "../middlewares/validationmiddleware.js";
import { ValidationError ,validate } from "express-validation";


export const orderRouter = Router();


orderRouter.post(
  '/register',
  validateData(orderSchema),
  orderController.create,
);

orderRouter.get(
  "/", 
  validateData(orderSchema),
  orderController.getAll
);
orderRouter.get("/:id", orderController.getById);
// orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.delete);

