import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { ticketRouter } from './ticket.routes.js';
import { orderRouter } from './order.routes.js';


export const apiRouter = Router();


apiRouter.use('/auth', authRouter);
apiRouter.use('/ticket', ticketRouter);
apiRouter.use("/order", orderRouter)