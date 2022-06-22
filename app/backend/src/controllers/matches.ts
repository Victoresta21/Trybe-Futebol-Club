import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches';

class MatchesController {
  public service = new MatchesService();

  public getMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const progressOption = req.query.inProgress;
      if (progressOption === 'true' || progressOption === 'false') {
        const { status, matchesData } = await this.service.getByProgress(progressOption);
        return res.status(status).json(matchesData);
      }
      const { status, matchesData } = await this.service.getAll();
      return res.status(status).json(matchesData);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = req.body;
      const createdMatch = await this.service.create(match);
      return res.status(201).json(createdMatch);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.update(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
