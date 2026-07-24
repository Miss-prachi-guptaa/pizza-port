import { Router } from 'express';
import * as menuController from '../controllers/menu.controller.js';

const router = Router();

// Public — customer can browse menu without logging in (login only needed at checkout)
router.get('/', menuController.getFullMenu);                      // all categories + items (isAvailable items only)
router.get('/categories', menuController.getCategories);
router.get('/categories/:categoryId/items', menuController.getItemsByCategory);
router.get('/items/:id', menuController.getItemById);

export default router;