import * as express from 'express';
import loginRoutes from './routes/Login';
import teamsRoutes from './routes/teams';
import matchesRoutes from './routes/matches';
import leaderboardRoutes from './routes/leaderboard';
import errorHandler from './middleware/errorhandler';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', loginRoutes);
    this.app.use('/teams', teamsRoutes);
    this.app.use('/matches', matchesRoutes);
    this.app.use('/leaderboard', leaderboardRoutes);

    this.app.use(errorHandler);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`App listem on, port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
