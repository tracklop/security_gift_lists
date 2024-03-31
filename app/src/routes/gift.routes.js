// SECTION[epic=routes] - Gift routes

// NOTE - Imports
import { Router } from 'express';

// NOTE - Imports controllers
import { GiftController } from '../controllers/index.js';

const giftRouter = Router();

// NOTE - Routes
giftRouter.post('/', GiftController.create);

giftRouter.delete('/:id', GiftController.delete);

giftRouter.patch('/:id', GiftController.update);
giftRouter.patch('/:id/toggleReservation', GiftController.toggleReservation);
giftRouter.patch('/:id/updatePrice', GiftController.updatePrice);

giftRouter.get('/', GiftController.findAll);
giftRouter.get('/:id', GiftController.findOne);

// NOTE - Exporting route
giftRouter.routerName = 'giftRouter';
giftRouter.path = '/api/gifts';
export default giftRouter;

// !SECTION
