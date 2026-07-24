import express from 'express';
import { getMenuItems } from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/', getMenuItems);

export const menuRoutes = router;