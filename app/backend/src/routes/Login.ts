import * as express from 'express';
import LoginController from '../controllers/Login';

const loginController = new LoginController();

const router = express.Router();

router.post('/', loginController.login);
router.get('/validate', loginController.validate);

export default router;
