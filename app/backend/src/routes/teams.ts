import * as express from 'express';
import TeamsController from '../controllers/teams';

const teamsController = new TeamsController();

const router = express.Router();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.findById);

export default router;
