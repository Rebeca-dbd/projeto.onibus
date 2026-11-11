
import { Router } from 'express';
import PaginaController from '../controllers/PaginaController.js';
import { autenticar, apenasAdmin } from '../middlewares/auth.js';
const router = Router();
router.get('/', PaginaController.listar); 
router.get('/:slug', PaginaController.buscar); 
router.post('/', autenticar, apenasAdmin, PaginaController.criar); 
export default router;


export function apenasAdmin(req, res, next) {
if (req.usuario.papel !== 'ADMIN') {
return res.status(403).json({ erro: 'Apenas administradores' });
}
next(); 
}
