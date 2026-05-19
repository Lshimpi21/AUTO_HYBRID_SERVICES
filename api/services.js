// In-memory storage (replace with database for production)
let services = [
  // General Maintenance
  { id: '1', name: 'Engine Oil Change', category: 'General Maintenance', price: 1500, duration: '30-45 mins', description: 'Professional engine oil and filter replacement with quality oil', icon: '🛢️', rating: 4.8 },
  { id: '2', name: 'Air Filter Replacement', category: 'General Maintenance', price: 600, duration: '15-20 mins', description: 'Fresh air filter installation for optimal engine performance', icon: '💨', rating: 4.7 },
  { id: '3', name: 'Fuel Filter Replacement', category: 'General Maintenance', price: 1200, duration: '20-30 mins', description: 'Quality fuel filter replacement for better fuel efficiency', icon: '⛽', rating: 4.6 },
  { id: '4', name: 'Coolant Service', category: 'General Maintenance', price: 1500, duration: '30-45 mins', description: 'Coolant flush and refill for engine cooling efficiency', icon: '❄️', rating: 4.8 },
  { id: '5', name: 'Battery Check & Service', category: 'General Maintenance', price: 200, duration: '15 mins', description: 'Complete battery health check and maintenance', icon: '🔋', rating: 4.5 },
  { id: '6', name: 'General Vehicle Inspection', category: 'General Maintenance', price: 500, duration: '30-45 mins', description: 'Comprehensive vehicle inspection and diagnostics', icon: '🔍', rating: 4.9 },

  // Engine Repairs
  { id: '7', name: 'Engine Tuning', category: 'Engine Repairs', price: 2200, duration: '1-2 hours', description: 'Expert engine tuning for optimal performance', icon: '🎚️', rating: 4.7 },
  { id: '8', name: 'Spark Plug Replacement', category: 'Engine Repairs', price: 1200, duration: '45-60 mins', description: 'Quality spark plug replacement and installation', icon: '✨', rating: 4.6 },
  { id: '9', name: 'Timing Belt Replacement', category: 'Engine Repairs', price: 5500, duration: '2-3 hours', description: 'Critical timing belt replacement service', icon: '⏱️', rating: 4.8 },
  { id: '10', name: 'Head Gasket Repair', category: 'Engine Repairs', price: 16500, duration: '4-6 hours', description: 'Professional head gasket repair and replacement', icon: '🔧', rating: 4.7 },
  { id: '11', name: 'Engine Overhaul', category: 'Engine Repairs', price: 50000, duration: '1-2 days', description: 'Complete engine overhaul and restoration', icon: '🏗️', rating: 4.9 },
  { id: '12', name: 'Injector Cleaning', category: 'Engine Repairs', price: 2500, duration: '1-2 hours', description: 'Professional fuel injector cleaning service', icon: '💧', rating: 4.6 },

  // Transmission Services
  { id: '13', name: 'Clutch Plate Replacement', category: 'Transmission', price: 8000, duration: '2-3 hours', description: 'Quality clutch plate replacement and adjustment', icon: '⚙️', rating: 4.8 },
  { id: '14', name: 'Gearbox Oil Change', category: 'Transmission', price: 2000, duration: '45-60 mins', description: 'Premium gearbox oil change service', icon: '🛢️', rating: 4.7 },
  { id: '15', name: 'Automatic Transmission Service', category: 'Transmission', price: 10000, duration: '2-3 hours', description: 'Complete automatic transmission servicing', icon: '🚗', rating: 4.8 },
  { id: '16', name: 'Gearbox Repair', category: 'Transmission', price: 25000, duration: '4-8 hours', description: 'Expert gearbox repair and restoration', icon: '🔩', rating: 4.9 },

  // Brake System
  { id: '17', name: 'Brake Pad Replacement', category: 'Brake System', price: 2500, duration: '1 hour', description: 'Premium brake pad replacement for safety', icon: '🛑', rating: 4.8 },
  { id: '18', name: 'Brake Disc Replacement', category: 'Brake System', price: 6500, duration: '2-3 hours', description: 'Quality brake disc replacement service', icon: '💿', rating: 4.7 },
  { id: '19', name: 'Brake Fluid Change', category: 'Brake System', price: 800, duration: '30-45 mins', description: 'Complete brake fluid replacement and bleeding', icon: '🔴', rating: 4.6 },
  { id: '20', name: 'Brake System Diagnosis', category: 'Brake System', price: 500, duration: '30 mins', description: 'Comprehensive brake system inspection and testing', icon: '🔧', rating: 4.8 },
];

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
    // Update service
    else if (req.method === 'PUT') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Service ID is required' });
      }
      
      const serviceIndex = services.findIndex(s => s.id === id);
      if (serviceIndex === -1) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      services[serviceIndex] = { ...services[serviceIndex], ...req.body };
      res.status(200).json(services[serviceIndex]);
    }
    // Delete service
    else if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Service ID is required' });
      }
      
      const initialLength = services.length;
      services = services.filter(s => s.id !== id);
      
      if (services.length === initialLength) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      res.status(200).json({ success: true, message: 'Service deleted' });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
