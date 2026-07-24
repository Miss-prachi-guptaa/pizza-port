import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';
import * as addressController from '../controllers/address.controller.js';
import * as orderController from '../controllers/order.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// Everything below requires a logged-in customer
router.use(verifyToken, authorize('customer'));

// -------- Cart --------
// CartItem has unique(cart_id, menu_item_id, portion) — controller must upsert (qty++) not duplicate
router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addItemToCart);                 // body: { menu_item_id, portion, quantity }
router.patch('/cart/:cartItemId', cartController.updateCartItemQty); // body: { quantity }
router.delete('/cart/:cartItemId', cartController.removeCartItem);
router.delete('/cart', cartController.clearCart);

// -------- Addresses --------
router.get('/addresses', addressController.getAddresses);
router.post('/addresses', addressController.addAddress);
router.patch('/addresses/:id', addressController.updateAddress);
router.delete('/addresses/:id', addressController.deleteAddress);

// -------- Orders (checkout + tracking) --------
// POST /orders: reads cart -> snapshots items into OrderItem -> creates Order + Payment -> clears cart
router.post('/orders', orderController.placeOrder);                  // body: { addressId, payment_method: }
router.get('/orders', orderController.getMyOrders);                  // own order history
router.get('/orders/:id', orderController.getMyOrderById);            // includes items + statusHistory (stepper screen)
router.patch('/orders/:id/cancel', orderController.cancelOrder);       // only allowed while status === 'placed'

export default router;