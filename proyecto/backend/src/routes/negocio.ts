import { Router } from 'express';
import NegocioController from '@controllers/NegocioController';
import { checkAuth } from '@middlewares/checkAuth';
import { checkRole } from '@middlewares/checkRole';
import { validateData } from '@middlewares/validateData';
import {
    negocioUpdateSchema,
    horarioCreateSchema,
    horarioUpdateSchema,
    horarioIdSchema,
    fechaDeshabilitadaCreateSchema,
    fechaDeshabilitadaIdSchema
} from '@schemas/negocioSchemas';

const router = Router();

// Todas las rutas requieren autenticación y rol de owner o admin
router.use(checkAuth);
router.use(checkRole(['owner', 'admin']));

// === NEGOCIO ===
router.get('/', NegocioController.get);
router.put('/', validateData(negocioUpdateSchema), NegocioController.update);

// === HORARIOS ===
router.get('/horarios', NegocioController.getHorarios);
router.post('/horarios', validateData(horarioCreateSchema), NegocioController.createHorario);
router.put('/horarios/:id', validateData(horarioIdSchema, 'params'), validateData(horarioUpdateSchema), NegocioController.updateHorario);
router.patch('/horarios/:id/toggle', validateData(horarioIdSchema, 'params'), NegocioController.toggleHorarioActivo);
router.delete('/horarios/:id', validateData(horarioIdSchema, 'params'), NegocioController.deleteHorario);

// === FECHAS DESHABILITADAS ===
router.get('/fechas-deshabilitadas', NegocioController.getFechasDeshabilitadas);
router.post('/fechas-deshabilitadas', validateData(fechaDeshabilitadaCreateSchema), NegocioController.createFechaDeshabilitada);
router.delete('/fechas-deshabilitadas/:id', validateData(fechaDeshabilitadaIdSchema, 'params'), NegocioController.deleteFechaDeshabilitada);

export default router;