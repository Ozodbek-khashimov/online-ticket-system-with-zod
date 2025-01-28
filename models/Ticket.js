import { Schema, model } from 'mongoose';

const ticketModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['concert', 'sport', 'theater'],
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'expired'],
      default: 'available',
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    soldQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Ticket = model('Ticket', ticketModel);