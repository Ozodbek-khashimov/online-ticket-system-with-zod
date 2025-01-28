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
  user: z.string().length(24, { message: "Invalid user ID format. Must be 24 characters long." }), // MongoDB ObjectId'ga mos uzunlik
  tickets: z
    .array(
      z.object({
        ticket: z.string().length(24, { message: "Invalid ticket ID format. Must be 24 characters long." }), // MongoDB ObjectId'ga mos
        quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
        price: z.number().positive({ message: "Price must be a positive number." }),
      })
    )
    .min(1, { message: "At least one ticket is required." }),
  totalPrice: z.number().positive({ message: "Total price must be a positive number." }),
  paymentMethod: z.enum(["stripe", "paypal", "cash"], { message: "Invalid payment method." }),
  status: z.enum(["pending", "paid", "cancelled"], { message: "Invalid status value." }),
});