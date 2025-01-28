import { Router } from "express";
import { ticketController } from "../controllers/index.js";
import { ticketSchema,ticketQuerySchema } from "../validation/index.js";
import { validateData } from "../middlewares/validationmiddleware.js";
import { ValidationError ,validate } from "express-validation";

export const ticketRouter = Router();


ticketRouter.post(
  '/register',
  validateData(ticketSchema),
  ticketController.create,
);
ticketRouter.get("/", ticketController.getAll);
ticketRouter.get("/:id", ticketController.getById);
ticketRouter.put("/:id", ticketController.update);
ticketRouter.delete("/:id", ticketController.delete);


ticketRouter.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});