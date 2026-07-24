import { Router } from 'express';
import * as dashboardController from '../controllers/owner/dashboard.controller.js';
import * as restaurantController from '../controllers/owner/restaurant.controller.js';
import * as menuItemController from '../controllers/owner/menuItem.controller.js';
import * as orderController from '../controllers/owner/order.controller.js';
import * as reportController from '../controllers/owner/report.controller.js';
import { verifyToken, authorize, attachOwnerRestaurant } from '../middlewares/auth.middleware.js';

const router = Router();

// Everything below requires a logged-in owner AND resolves req.restaurant
router.use(verifyToken, authorize('owner'), attachOwnerRestaurant);

// -------- Dashboard --------
router.get('/dashboard', dashboardController.getDashboardSummary);
// returns: restaurantStatus, ordersToday, salesToday, avgPrepTimeMinutes, pendingOrdersCount, recentOrders

// -------- Restaurant profile / status --------
router.get('/restaurant', restaurantController.getMyRestaurant);
router.patch('/restaurant', restaurantController.updateRestaurantProfile); // name, address, phone, logo, deliveryCharge etc.
router.patch('/restaurant/status', restaurantController.toggleOpenStatus); // body: { isOpen: true/false }

// -------- Menu management --------
router.get('/menu-items', menuItemController.getMyMenuItems);
router.post('/menu-items', menuItemController.createMenuItem);
router.patch('/menu-items/:id', menuItemController.updateMenuItem);         // edit fields, incl. isAvailable toggle
router.delete('/menu-items/:id', menuItemController.deleteMenuItem);        // soft delete (paranoid: true)

// -------- Order management --------
// status values: placed -> preparing -> out_for_delivery -> delivered
//                placed -> rejected | any active state -> cancelled
router.get('/orders', orderController.getIncomingOrders);        // ?status=placed|preparing|out_for_delivery
router.get('/orders/:id', orderController.getOrderDetail);
router.patch('/orders/:id/accept', orderController.acceptOrder); // placed -> preparing, sets acceptedAt
router.patch('/orders/:id/reject', orderController.rejectOrder); // placed -> rejected, sets closedAt
router.patch('/orders/:id/status', orderController.updateOrderStatus);
// body: { status: 'out_for_delivery' | 'delivered' } — writes an OrderStatusLog row each transition

// -------- Reports --------
router.get('/reports/sales', reportController.getSalesReport);           // weekly sales chart data
router.get('/reports/popular-items', reportController.getPopularItems);  // top items by order count

export default router;