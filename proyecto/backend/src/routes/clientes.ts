import { Router } from 'express';
import ClienteController from '@controllers/ClienteController';
import { checkAuth } from '@middlewares/checkAuth';
import { checkRole } from '@middlewares/checkRole';
import { validateData } from '@middlewares/validateData';
import {
    clienteCreateSchema,
    clienteUpdateSchema,
    clienteIdSchema,
    clienteSearchSchema
} from '@schemas/clienteSchemas';

const router = Router();

// Todas las rutas requieren autenticación y rol de owner, admin o employee
router.use(checkAuth);
router.use(checkRole(['owner', 'admin', 'employee']));

// === CLIENTES ===
router.get('/', ClienteController.getAll);
router.get('/search', validateData(clienteSearchSchema, 'query'), ClienteController.search);
router.get('/:id', validateData(clienteIdSchema, 'params'), ClienteController.getById);
router.post('/', validateData(clienteCreateSchema), ClienteController.create);
router.put('/:id', validateData(clienteIdSchema, 'params'), validateData(clienteUpdateSchema), ClienteController.update);
router.delete('/:id', validateData(clienteIdSchema, 'params'), ClienteController.delete);

export default router;