import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tickets: { type: [ticketSchema], required: true }, // Obyektlar massivi
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['stripe', 'paypal', 'cash'], required: true },
  status: { type: String, enum: ['pending', 'paid', 'cancelled'], required: true },
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
