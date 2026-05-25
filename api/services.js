import { services } from './serviceStore.js';

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
    // Get all services
    if (req.method === 'GET') {
      res.status(200).json(services);
    }
    // Add new service
    else if (req.method === 'POST') {
      const { name, description, price, category, duration, icon, rating } = req.body;
      
      if (!name || !price || !category) {
        return res.status(400).json({ error: 'Missing required fields: name, price, category' });
      }
      
      const newService = {
        id: Date.now().toString(),
        name,
        description: description || '',
        price: Number(price),
        category,
        duration: duration || '',
        icon: icon || '🔧',
        rating: rating ? Number(rating) : 4.5,
      };
      services.push(newService);
      res.status(201).json(newService);
    }
    // Update service (not available on collection endpoint)
    else if (req.method === 'PUT') {
      res.status(405).json({ error: 'Method not allowed on this endpoint. Use /api/services/:id instead.' });
    }
    // Delete service (not available on collection endpoint)
    else if (req.method === 'DELETE') {
      res.status(405).json({ error: 'Method not allowed on this endpoint. Use /api/services/:id instead.' });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
