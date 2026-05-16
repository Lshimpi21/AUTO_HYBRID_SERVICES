import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// In-memory storage
let orders = [];

// Comprehensive services data with pricing
const BASE_SERVICES = [
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
  { id: '19', name: 'Brake Oil Change', category: 'Brake System', price: 600, duration: '30-45 mins', description: 'Fresh brake fluid replacement', icon: '🔴', rating: 4.6 },
  { id: '20', name: 'Brake Inspection', category: 'Brake System', price: 350, duration: '20-30 mins', description: 'Complete brake system inspection', icon: '✅', rating: 4.9 },

  // Suspension & Steering
  { id: '21', name: 'Shock Absorber Replacement', category: 'Suspension', price: 7500, duration: '1-2 hours', description: 'Premium shock absorber replacement', icon: '🌊', rating: 4.7 },
  { id: '22', name: 'Wheel Alignment', category: 'Suspension', price: 500, duration: '45 mins', description: 'Professional wheel alignment service', icon: '📐', rating: 4.8 },
  { id: '23', name: 'Wheel Balancing', category: 'Suspension', price: 400, duration: '30 mins', description: 'Precision wheel balancing', icon: '⚖️', rating: 4.6 },
  { id: '24', name: 'Power Steering Repair', category: 'Suspension', price: 6000, duration: '2-3 hours', description: 'Expert power steering repair', icon: '🎯', rating: 4.7 },

  // Electrical Services
  { id: '25', name: 'Battery Replacement', category: 'Electrical', price: 6500, duration: '30 mins', description: 'Quality car battery replacement', icon: '🔋', rating: 4.8 },
  { id: '26', name: 'Alternator Repair', category: 'Electrical', price: 4500, duration: '2-3 hours', description: 'Professional alternator repair service', icon: '⚡', rating: 4.7 },
  { id: '27', name: 'Starter Motor Repair', category: 'Electrical', price: 3200, duration: '1-2 hours', description: 'Starter motor repair and replacement', icon: '🚀', rating: 4.6 },
  { id: '28', name: 'Wiring Repair', category: 'Electrical', price: 2500, duration: '1-3 hours', description: 'Electrical wiring repair and diagnostics', icon: '🔌', rating: 4.7 },
  { id: '29', name: 'Headlight Replacement', category: 'Electrical', price: 1100, duration: '30-45 mins', description: 'LED/HID headlight replacement', icon: '💡', rating: 4.8 },

  // AC & Cooling
  { id: '30', name: 'AC Gas Refill', category: 'AC & Cooling', price: 2500, duration: '30-45 mins', description: 'Professional AC refrigerant refill', icon: '❄️', rating: 4.8 },
  { id: '31', name: 'AC Compressor Repair', category: 'AC & Cooling', price: 12500, duration: '2-4 hours', description: 'AC compressor repair and replacement', icon: '🧊', rating: 4.7 },
  { id: '32', name: 'Radiator Repair', category: 'AC & Cooling', price: 5000, duration: '1-2 hours', description: 'Radiator repair and flushing', icon: '🌡️', rating: 4.6 },
  { id: '33', name: 'Cooling Fan Replacement', category: 'AC & Cooling', price: 2750, duration: '1-2 hours', description: 'Cooling fan replacement service', icon: '🌀', rating: 4.7 },

  // Bodywork & Painting
  { id: '34', name: 'Dent Removal', category: 'Bodywork', price: 1500, duration: '1-2 hours', description: 'Professional dent removal per panel', icon: '🎯', rating: 4.8 },
  { id: '35', name: 'Full Body Painting', category: 'Bodywork', price: 50000, duration: '2-3 days', description: 'Complete vehicle repainting service', icon: '🎨', rating: 4.9 },
  { id: '36', name: 'Scratch Removal', category: 'Bodywork', price: 1500, duration: '1 hour', description: 'Expert scratch removal and touch-up', icon: '✏️', rating: 4.7 },
  { id: '37', name: 'Bumper Repair', category: 'Bodywork', price: 2500, duration: '1-2 hours', description: 'Bumper repair and restoration', icon: '🛡️', rating: 4.6 },

  // Detailing & Cleaning
  { id: '38', name: 'Car Wash', category: 'Detailing', price: 500, duration: '45 mins', description: 'Professional car wash and dry', icon: '💦', rating: 4.7 },
  { id: '39', name: 'Interior Cleaning', category: 'Detailing', price: 2000, duration: '1-2 hours', description: 'Deep interior cleaning service', icon: '🧹', rating: 4.8 },
  { id: '40', name: 'Full Vehicle Detailing', category: 'Detailing', price: 6000, duration: '3-4 hours', description: 'Complete exterior and interior detailing', icon: '✨', rating: 4.9 },
  { id: '41', name: 'Ceramic Coating', category: 'Detailing', price: 30000, duration: '4-6 hours', description: 'Premium ceramic paint protection coating', icon: '🛡️', rating: 4.9 },

  // Tyre Services
  { id: '42', name: 'Tyre Replacement', category: 'Tyres', price: 6000, duration: '1 hour', description: 'Premium tyre replacement per tyre', icon: '🛞', rating: 4.8 },
  { id: '43', name: 'Puncture Repair', category: 'Tyres', price: 200, duration: '20-30 mins', description: 'Quick puncture repair service', icon: '🔧', rating: 4.7 },
  { id: '44', name: 'Nitrogen Filling', category: 'Tyres', price: 120, duration: '15 mins', description: 'Nitrogen gas filling for tyres', icon: '💨', rating: 4.6 },
  { id: '45', name: 'Tyre Rotation', category: 'Tyres', price: 500, duration: '45 mins', description: 'Professional tyre rotation service', icon: '🔄', rating: 4.7 },

  // Advanced Services
  { id: '46', name: 'ECU Diagnostics', category: 'Advanced Services', price: 1200, duration: '30-45 mins', description: 'Engine Control Unit diagnostics', icon: '💻', rating: 4.8 },
  { id: '47', name: 'Vehicle Scanning', category: 'Advanced Services', price: 600, duration: '30 mins', description: 'Complete vehicle diagnostic scan', icon: '📊', rating: 4.7 },
  { id: '48', name: 'Turbo Repair', category: 'Advanced Services', price: 25000, duration: '3-6 hours', description: 'Turbocharger repair and replacement', icon: '💨', rating: 4.8 },
  { id: '49', name: 'Hybrid System Check', category: 'Advanced Services', price: 5000, duration: '1-2 hours', description: 'Hybrid vehicle system diagnostics', icon: '🔋', rating: 4.9 },

  // Accessories & Add-ons
  { id: '50', name: 'Reverse Camera Installation', category: 'Accessories', price: 5000, duration: '1-2 hours', description: 'Professional reverse camera setup', icon: '📹', rating: 4.7 },
  { id: '51', name: 'Music System Installation', category: 'Accessories', price: 10000, duration: '2-3 hours', description: 'Premium audio system installation', icon: '🎵', rating: 4.8 },
  { id: '52', name: 'Seat Cover Fitting', category: 'Accessories', price: 5000, duration: '1-2 hours', description: 'Custom seat cover installation', icon: '💺', rating: 4.7 },
  { id: '53', name: 'Central Locking Installation', category: 'Accessories', price: 4000, duration: '1-2 hours', description: 'Central locking system setup', icon: '🔒', rating: 4.8 },
];

// Function to generate 1000 services
function generateServices1000() {
  const services = [];
  let id = 1;
  const carBrands = ['Maruti Suzuki', 'Hyundai', 'Honda', 'Tata', 'Toyota', 'Mahindra', 'Ford', 'Skoda', 'Volkswagen', 'BMW', 'Audi', 'Mercedes', 'Kia', 'Jeep', 'MG'];
  const serviceTypes = ['Premium', 'Budget', 'Standard', 'Express', 'Economy', 'Luxury', 'Professional', 'Elite', 'Classic', 'Advanced'];
  
  // Generate variations for each base service
  BASE_SERVICES.forEach(baseService => {
    for (let i = 0; i < 19; i++) {
      const carBrand = carBrands[i % carBrands.length];
      const serviceType = serviceTypes[i % serviceTypes.length];
      const priceMultiplier = 0.7 + (i * 0.08);
      
      services.push({
        id: String(id++),
        name: `${baseService.name} - ${carBrand}`,
        category: baseService.category,
        price: Math.round(baseService.price * priceMultiplier),
        duration: baseService.duration,
        description: `${serviceType} ${baseService.description} for ${carBrand}`,
        icon: baseService.icon,
        rating: Math.min(4.9, 4.5 + Math.random() * 0.4),
        carBrand,
        serviceType,
        reviews: Math.floor(Math.random() * 100) + 5,
      });
    }
  });
  
  return services;
}

const SERVICES = generateServices1000();

// API Routes - Services
app.get('/api/services', (req, res) => {
  res.json(SERVICES);
});

app.get('/api/services/:id', (req, res) => {
  const service = SERVICES.find(s => s.id === req.params.id);
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ error: 'Service not found' });
  }
});

app.post('/api/services', (req, res) => {
  const service = { id: Date.now().toString(), ...req.body };
  SERVICES.push(service);
  res.json(service);
});

app.put('/api/services/:id', (req, res) => {
  const index = SERVICES.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    SERVICES[index] = { ...SERVICES[index], ...req.body };
    res.json({ success: true, service: SERVICES[index] });
  } else {
    res.status(404).json({ error: 'Service not found' });
  }
});

app.delete('/api/services/:id', (req, res) => {
  const index = SERVICES.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    SERVICES.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Service not found' });
  }
});

// API Routes - Orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const order = { id: Date.now().toString(), createdAt: new Date(), ...req.body };
  orders.push(order);
  res.json(order);
});

app.put('/api/orders/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...req.body };
    res.json({ success: true, order: orders[index] });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), servicesCount: SERVICES.length });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📊 Total Services: ${SERVICES.length}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/services`);
});