// SECTION[epic=routes] - List routes

// NOTE - Imports
import { Router } from 'express';

// NOTE - Imports controllers
import { ListController } from '../controllers/index.js';

const listRouter = Router();

// NOTE - Routes
listRouter.post('/', ListController.create);

listRouter.patch('/:id', ListController.update);
listRouter.patch('/:id/toggleArchive', ListController.toggleArchive);

listRouter.delete('/:id', ListController.delete);

listRouter.get('/', ListController.findAll);
listRouter.get('/:id', ListController.findOne);
listRouter.get('/active', ListController.findActive);

// NOTE - Exporting route
listRouter.routerName = 'listRouter';
listRouter.path = '/api/lists';
export default listRouter;

// !SECTION
