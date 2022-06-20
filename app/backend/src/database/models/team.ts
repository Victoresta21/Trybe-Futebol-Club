import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Matche from './matche';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

Matche.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeams' });
Matche.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeams' });

Team.hasMany(Matche, { foreignKey: 'homeTeam', as: 'homeTeams' });
Team.hasMany(Matche, { foreignKey: 'awayTeam', as: 'awayTeams' });

export default Team;