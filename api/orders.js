let orders = [];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Get all orders
  if (req.method === 'GET') {
    const { email } = req.query;
    if (email) {
      const userOrders = orders.filter(o => o.email === email);
      res.status(200).json(userOrders);
    } else {
      res.status(200).json(orders);
    }
  }
  // Create new order
  else if (req.method === 'POST') {
    const { email, phone, services: orderServices, totalPrice, date } = req.body;
    
    if (!email || !phone || !orderServices || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrder = {
      id: Date.now().toString(),
      email,
      phone,
      services: orderServices,
      totalPrice,
      date: date || new Date(),
      status: 'pending',
      createdAt: new Date(),
    };
    
    orders.push(newOrder);
    res.status(201).json(newOrder);
  }
  // Get single order
  else if (req.method === 'GET' && req.query.id) {
    const order = orders.find(o => o.id === req.query.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  }
  // Update order
  else if (req.method === 'PUT') {
    const { id } = req.query;
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
    orders = orders.filter(o => o.id !== id);
    res.status(200).json({ success: true });
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
