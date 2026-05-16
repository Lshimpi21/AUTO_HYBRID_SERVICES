import express from 'express';
import { db } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('services').get();
    const services = [];
    snapshot.forEach(doc => {
      services.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('services').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Add new service
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image, duration } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const serviceData = {
      name,
      description: description || '',
      price: parseFloat(price),
      category,
      image: image || '',
      duration: duration || '1-2 hours',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('services').add(serviceData);
    res.json({
      id: docRef.id,
      ...serviceData
    });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'Failed to add service' });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category, image, duration } = req.body;

    await db.collection('services').doc(req.params.id).update({
      name,
      description,
      price: parseFloat(price),
      category,
      image,
      duration,
      updatedAt: new Date()
    });

    res.json({ success: true, id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('services').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
