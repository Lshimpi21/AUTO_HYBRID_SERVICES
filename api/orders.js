let orders = [];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Get all orders or orders by email
    if (req.method === 'GET') {
      const { email, id } = req.query;
      
      if (id) {
        const order = orders.find(o => o.id === id);
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
        return res.status(200).json(order);
      }
      
      if (email) {
        const userOrders = orders.filter(o => o.email === email);
        return res.status(200).json(userOrders);
      }
      
      return res.status(200).json(orders);
    }
    // Create new order
    else if (req.method === 'POST') {
      const { email, phone, services: orderServices, totalPrice, date } = req.body;
      
      if (!email || !phone || !orderServices || !totalPrice) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          required: ['email', 'phone', 'services', 'totalPrice']
        });
      }

      const newOrder = {
        id: Date.now().toString(),
        email,
        phone,
        services: orderServices,
        totalPrice: Number(totalPrice),
        date: date || new Date().toISOString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      orders.push(newOrder);
      res.status(201).json(newOrder);
    }
    // Update order
    else if (req.method === 'PUT') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Order ID is required' });
      }
      
      const orderIndex = orders.findIndex(o => o.id === id);
      if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      orders[orderIndex] = { ...orders[orderIndex], ...req.body };
      res.status(200).json(orders[orderIndex]);
    }
    // Delete order
    else if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Order ID is required' });
      }
      
      const initialLength = orders.length;
      orders = orders.filter(o => o.id !== id);
      
      if (orders.length === initialLength) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      res.status(200).json({ success: true, message: 'Order deleted' });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
