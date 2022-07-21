import { Request, Response, NextFunction } from 'express';
import Teams from '../database/models/teams';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const homeTeamExists = await Teams.findOne({ where: { id: homeTeam } });
  const awayTeamExists = await Teams.findOne({ where: { id: awayTeam } });

  if (!homeTeamExists || !awayTeamExists) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateMatch;
