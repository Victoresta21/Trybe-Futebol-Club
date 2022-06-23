import * as express from 'express';
import validateToken from '../middleware/tokenValidation';
import MatchesController from '../controllers/matches';

const matchesController = new MatchesController();

const router = express.Router();

router.get('/', matchesController.getMatches);
router.post('/', validateToken, matchesController.create);
router.patch('/:id/finish', validateToken, matchesController.update);
router.patch('/:id', validateToken, matchesController.updateCurrentMatch);

export default router;
