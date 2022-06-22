import * as express from 'express';
import MatchesController from '../controllers/matches';

const matchesController = new MatchesController();

const router = express.Router();

router.get('/', matchesController.getMatches);

export default router;
