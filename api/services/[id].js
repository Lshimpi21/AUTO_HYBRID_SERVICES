import { services } from '../serviceStore.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Service ID is required' });
  }

  try {
    const serviceIndex = services.findIndex((service) => service.id === id);
    if (serviceIndex === -1) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (req.method === 'GET') {
      res.status(200).json(services[serviceIndex]);
    } else if (req.method === 'PUT') {
      const { name, description, price, category, duration, image, icon, rating } = req.body;
      const priceValue = Number(price);

      if (!name || !category || price === undefined || price === null || price === '' || Number.isNaN(priceValue)) {
        return res.status(400).json({ error: 'Missing or invalid required fields: name, price, category' });
      }

      services[serviceIndex] = {
        ...services[serviceIndex],
        name,
        description: description || '',
        price: priceValue,
        category,
        duration: duration || services[serviceIndex].duration,
        image: image || services[serviceIndex].image || '',
        icon: icon || services[serviceIndex].icon || '🔧',
        rating: rating !== undefined && rating !== null ? Number(rating) : services[serviceIndex].rating,
      };

      res.status(200).json(services[serviceIndex]);
    } else if (req.method === 'DELETE') {
      services.splice(serviceIndex, 1);
      res.status(200).json({ success: true, message: 'Service deleted' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
