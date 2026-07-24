import { Router } from 'express';

import {authRoutes} from './auth.route.js';
// import menuRoutes from './menu.route.js';
// import customerRoutes from './customer.route.js';
// import ownerRoutes from './owner.route.js';
// import adminRoutes from './admin.route.js';

const router = Router();

router.use('/auth', authRoutes);
// router.use('/menu', menuRoutes);
// router.use('/', customerRoutes);     // /cart, /addresses, /orders (role-guarded inside)
// router.use('/owner', ownerRoutes);
// router.use('/admin', adminRoutes);

export default router;

// In app.js / server.js:
// import routes from './routes/index.js';
// app.use('/api/v1', routes);