import express from 'express';
import { db } from '../config/firebase.js';

const router = express.Router();

// Comprehensive services data with pricing
const SERVICES_DATA = [
  // General Maintenance
  { name: 'Engine Oil Change', category: 'General Maintenance', price: 1500, duration: '30-45 mins', description: 'Professional engine oil and filter replacement with quality oil', icon: '🛢️' },
  { name: 'Air Filter Replacement', category: 'General Maintenance', price: 600, duration: '15-20 mins', description: 'Fresh air filter installation for optimal engine performance', icon: '💨' },
  { name: 'Fuel Filter Replacement', category: 'General Maintenance', price: 1200, duration: '20-30 mins', description: 'Quality fuel filter replacement for better fuel efficiency', icon: '⛽' },
  { name: 'Coolant Service', category: 'General Maintenance', price: 1500, duration: '30-45 mins', description: 'Coolant flush and refill for engine cooling efficiency', icon: '❄️' },
  { name: 'Battery Check & Service', category: 'General Maintenance', price: 200, duration: '15 mins', description: 'Complete battery health check and maintenance', icon: '🔋' },
  { name: 'General Vehicle Inspection', category: 'General Maintenance', price: 500, duration: '30-45 mins', description: 'Comprehensive vehicle inspection and diagnostics', icon: '🔍' },

  // Engine Repairs
  { name: 'Engine Tuning', category: 'Engine Repairs', price: 2200, duration: '1-2 hours', description: 'Expert engine tuning for optimal performance', icon: '🎚️' },
  { name: 'Spark Plug Replacement', category: 'Engine Repairs', price: 1200, duration: '45-60 mins', description: 'Quality spark plug replacement and installation', icon: '✨' },
  { name: 'Timing Belt Replacement', category: 'Engine Repairs', price: 5500, duration: '2-3 hours', description: 'Critical timing belt replacement service', icon: '⏱️' },
  { name: 'Head Gasket Repair', category: 'Engine Repairs', price: 16500, duration: '4-6 hours', description: 'Professional head gasket repair and replacement', icon: '🔧' },
  { name: 'Engine Overhaul', category: 'Engine Repairs', price: 50000, duration: '1-2 days', description: 'Complete engine overhaul and restoration', icon: '🏗️' },
  { name: 'Injector Cleaning', category: 'Engine Repairs', price: 2500, duration: '1-2 hours', description: 'Professional fuel injector cleaning service', icon: '💧' },

  // Transmission Services
  { name: 'Clutch Plate Replacement', category: 'Transmission', price: 8000, duration: '2-3 hours', description: 'Quality clutch plate replacement and adjustment', icon: '⚙️' },
  { name: 'Gearbox Oil Change', category: 'Transmission', price: 2000, duration: '45-60 mins', description: 'Premium gearbox oil change service', icon: '🛢️' },
  { name: 'Automatic Transmission Service', category: 'Transmission', price: 10000, duration: '2-3 hours', description: 'Complete automatic transmission servicing', icon: '🚗' },
  { name: 'Gearbox Repair', category: 'Transmission', price: 25000, duration: '4-8 hours', description: 'Expert gearbox repair and restoration', icon: '🔩' },

  // Brake System
  { name: 'Brake Pad Replacement', category: 'Brake System', price: 2500, duration: '1 hour', description: 'Premium brake pad replacement for safety', icon: '🛑' },
  { name: 'Brake Disc Replacement', category: 'Brake System', price: 6500, duration: '2-3 hours', description: 'Quality brake disc replacement service', icon: '💿' },
  { name: 'Brake Oil Change', category: 'Brake System', price: 600, duration: '30-45 mins', description: 'Fresh brake fluid replacement', icon: '🔴' },
  { name: 'Brake Inspection', category: 'Brake System', price: 350, duration: '20-30 mins', description: 'Complete brake system inspection', icon: '✅' },

  // Suspension & Steering
  { name: 'Shock Absorber Replacement', category: 'Suspension', price: 7500, duration: '1-2 hours', description: 'Premium shock absorber replacement', icon: '🌊' },
  { name: 'Wheel Alignment', category: 'Suspension', price: 500, duration: '45 mins', description: 'Professional wheel alignment service', icon: '📐' },
  { name: 'Wheel Balancing', category: 'Suspension', price: 400, duration: '30 mins', description: 'Precision wheel balancing', icon: '⚖️' },
  { name: 'Power Steering Repair', category: 'Suspension', price: 6000, duration: '2-3 hours', description: 'Expert power steering repair', icon: '🎯' },

  // Electrical Services
  { name: 'Battery Replacement', category: 'Electrical', price: 6500, duration: '30 mins', description: 'Quality car battery replacement', icon: '🔋' },
  { name: 'Alternator Repair', category: 'Electrical', price: 4500, duration: '2-3 hours', description: 'Professional alternator repair service', icon: '⚡' },
  { name: 'Starter Motor Repair', category: 'Electrical', price: 3200, duration: '1-2 hours', description: 'Starter motor repair and replacement', icon: '🚀' },
  { name: 'Wiring Repair', category: 'Electrical', price: 2500, duration: '1-3 hours', description: 'Electrical wiring repair and diagnostics', icon: '🔌' },
  { name: 'Headlight Replacement', category: 'Electrical', price: 1100, duration: '30-45 mins', description: 'LED/HID headlight replacement', icon: '💡' },

  // AC & Cooling
  { name: 'AC Gas Refill', category: 'AC & Cooling', price: 2500, duration: '30-45 mins', description: 'Professional AC refrigerant refill', icon: '❄️' },
  { name: 'AC Compressor Repair', category: 'AC & Cooling', price: 12500, duration: '2-4 hours', description: 'AC compressor repair and replacement', icon: '🧊' },
  { name: 'Radiator Repair', category: 'AC & Cooling', price: 5000, duration: '1-2 hours', description: 'Radiator repair and flushing', icon: '🌡️' },
  { name: 'Cooling Fan Replacement', category: 'AC & Cooling', price: 2750, duration: '1-2 hours', description: 'Cooling fan replacement service', icon: '🌀' },

  // Bodywork & Painting
  { name: 'Dent Removal', category: 'Bodywork', price: 1500, duration: '1-2 hours', description: 'Professional dent removal per panel', icon: '🎯' },
  { name: 'Full Body Painting', category: 'Bodywork', price: 50000, duration: '2-3 days', description: 'Complete vehicle repainting service', icon: '🎨' },
  { name: 'Scratch Removal', category: 'Bodywork', price: 1500, duration: '1 hour', description: 'Expert scratch removal and touch-up', icon: '✏️' },
  { name: 'Bumper Repair', category: 'Bodywork', price: 2500, duration: '1-2 hours', description: 'Bumper repair and restoration', icon: '🛡️' },

  // Detailing & Cleaning
  { name: 'Car Wash', category: 'Detailing', price: 500, duration: '45 mins', description: 'Professional car wash and dry', icon: '💦' },
  { name: 'Interior Cleaning', category: 'Detailing', price: 2000, duration: '1-2 hours', description: 'Deep interior cleaning service', icon: '🧹' },
  { name: 'Full Vehicle Detailing', category: 'Detailing', price: 6000, duration: '3-4 hours', description: 'Complete exterior and interior detailing', icon: '✨' },
  { name: 'Ceramic Coating', category: 'Detailing', price: 30000, duration: '4-6 hours', description: 'Premium ceramic paint protection coating', icon: '🛡️' },

  // Tyre Services
  { name: 'Tyre Replacement', category: 'Tyres', price: 6000, duration: '1 hour', description: 'Premium tyre replacement per tyre', icon: '🛞' },
  { name: 'Puncture Repair', category: 'Tyres', price: 200, duration: '20-30 mins', description: 'Quick puncture repair service', icon: '🔧' },
  { name: 'Nitrogen Filling', category: 'Tyres', price: 120, duration: '15 mins', description: 'Nitrogen gas filling for tyres', icon: '💨' },
  { name: 'Tyre Rotation', category: 'Tyres', price: 500, duration: '45 mins', description: 'Professional tyre rotation service', icon: '🔄' },

  // Advanced Services
  { name: 'ECU Diagnostics', category: 'Advanced Services', price: 1200, duration: '30-45 mins', description: 'Engine Control Unit diagnostics', icon: '💻' },
  { name: 'Vehicle Scanning', category: 'Advanced Services', price: 600, duration: '30 mins', description: 'Complete vehicle diagnostic scan', icon: '📊' },
  { name: 'Turbo Repair', category: 'Advanced Services', price: 25000, duration: '3-6 hours', description: 'Turbocharger repair and replacement', icon: '💨' },
  { name: 'Hybrid System Check', category: 'Advanced Services', price: 5000, duration: '1-2 hours', description: 'Hybrid vehicle system diagnostics', icon: '🔋' },

  // Accessories & Add-ons
  { name: 'Reverse Camera Installation', category: 'Accessories', price: 5000, duration: '1-2 hours', description: 'Professional reverse camera setup', icon: '📹' },
  { name: 'Music System Installation', category: 'Accessories', price: 10000, duration: '2-3 hours', description: 'Premium audio system installation', icon: '🎵' },
  { name: 'Seat Cover Fitting', category: 'Accessories', price: 5000, duration: '1-2 hours', description: 'Custom seat cover installation', icon: '💺' },
  { name: 'Central Locking Installation', category: 'Accessories', price: 4000, duration: '1-2 hours', description: 'Central locking system setup', icon: '🔒' },
];

// Seed all services into Firebase
router.post('/seed', async (req, res) => {
  try {
    const batch = db.batch();
    let count = 0;

    for (const service of SERVICES_DATA) {
      const docRef = db.collection('services').doc();
      batch.set(docRef, {
        ...service,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: '',
        rating: 4.8,
        reviews: Math.floor(Math.random() * 50) + 10,
      });
      count++;
    }

    await batch.commit();
    res.json({
      success: true,
      message: `Successfully seeded ${count} services`,
      count: count,
    });
  } catch (error) {
    console.error('Error seeding services:', error);
    res.status(500).json({ error: 'Failed to seed services', details: error.message });
  }
});

// Get all services grouped by category
router.get('/by-category', async (req, res) => {
  try {
    const snapshot = await db.collection('services').get();
    const servicesByCategory = {};

    snapshot.forEach(doc => {
      const service = doc.data();
      const category = service.category;
      if (!servicesByCategory[category]) {
        servicesByCategory[category] = [];
      }
      servicesByCategory[category].push({
        id: doc.id,
        ...service,
      });
    });

    res.json(servicesByCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

export default router;
