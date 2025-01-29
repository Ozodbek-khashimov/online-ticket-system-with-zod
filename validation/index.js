export * from './login.js';
import { z } from 'zod';


export const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
});


export const ticketQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(['price', 'date']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});
// import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(["concert", "sport", "theater"]),
  status: z.enum(["available", "sold", "expired"]),
  price: z.number(),
  date: z.string(),
  location: z.string(),
  totalQuantity: z.number(),
});
// paginationschema
export const paginationSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  orderBy: z.enum(['ASC', 'DESC']).optional(),
});

//params schema

export const ticketIdSchema = z.object({
  ticketId: z.string(),
});

export const orderSchema = z.object({
  user: z.string().length(24), 
  tickets: z
    .array(
      z.object({
        ticket: z.string().length(24), 
        quantity: z.number().min(1),
        price: z.number().positive(),
      })
    )
    .min(1),
  totalPrice: z.number().positive(),
  paymentMethod: z.enum(["stripe", "paypal", "cash"]),
  status: z.enum(["pending", "paid", "cancelled"]),
});