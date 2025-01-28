import { Ticket } from '../models/index.js';

export const ticketController = {
  async create(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        throw new Error('Ticket data is required');
      }
      if (
        !body.title ||
        !body.description ||
        !body.category ||
        !body.status ||
        !body.price ||
        !body.date ||
        !body.location ||
        !body.totalQuantity
      ) {
        throw new Error('All fields are required');
      }
      const ticket = new Ticket(body);
      await ticket.save();

      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    try {
      const query = req.query;

      const category = query.category || '';
      const status = query.status || '';
      const page = query.page || 1;
      const limit = query.limit || 10;
      const skip = (page - 1) * limit;

      
      const tickets = await Ticket.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      res.status(200).json(tickets);
    } catch (error) {
      next(error);
    }
  },
  async getById(req, res, next){
    try {
      const ticketId = req.params.id;  
      const ticket = await Ticket.findById(ticketId);  
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      res.status(200).json(ticket);  
    } catch (error) {
      next(error);  
    }
  },
  async update(req, res, next){
    try {
      const ticketId = req.params.id; 
      const updateData = req.body; 
  
      const ticket = await Ticket.findById(ticketId);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
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
  
      const ticket = await Ticket.findById(ticketId);
console.log(ticket);  
if (!ticket) {
  return res.status(404).json({ message: 'Ticket not found' });
}


try {
  await Ticket.deleteOne({ _id: ticketId });
  res.status(200).json({ message: 'Ticket deleted successfully' });
} catch (error) {
  console.log(error);  
  next(error);
}

    } catch (error) {
      next(error); 
    }
  }
}