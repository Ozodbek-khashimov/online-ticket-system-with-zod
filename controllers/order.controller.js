import { Order } from '../models/Order.js';

export const orderController = {
  async create(req, res, next) {
    try {
      const body = req.body;

      if (!body.user) {
        throw new Error('User detail not complited!.');
      }
      const newOrder = new Order(req.body);

      await newOrder.save();

      return res.status(201).json({
        message: 'Created',
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    try {
      const data = await Order.find()
        .populate('user', { email: 1 })
        .populate('ticket');
      return res.status(200).json({
        message: 'All orders',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
    async getById(req, res, next){
    try {
      const ticket = await Order.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  },
  
  async update(req, res, next){
      try {
        const ticketId = req.params.id; 
        const updateData = req.body; 
    
        const ticket = await Order.findById(ticketId);
    
        if (!ticket) {
          return res.status(404).json({ message: 'Order not found' });
        }
    
        
        Object.assign(ticket, updateData); 
    
        
        await ticket.save();
    
        res.status(200).json(ticket); 
      } catch (error) {
        next(error); 
      }
  },
  async delete(req, res, next){
      try {
        const ticketId = req.params.id; 
    
        const ticket = await Order.findById(ticketId);
  console.log(ticket);  
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }
  
  
  try {
    await Order.deleteOne({ _id: ticketId });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.log(error);  
    next(error);
  }
  
      } catch (error) {
        next(error); 
      }
    }
  }