import sequelize from '../database/models';

const query = `
SELECT team_name AS name,
SUM(CASE 
  WHEN (mat.home_team_goals - mat.away_team_goals > 0) THEN 3
  WHEN (mat.home_team_goals - mat.away_team_goals = 0) THEN 1 ELSE 0 END) AS totalPoints,
COUNT(mat.home_team) AS totalGames,
SUM(CASE WHEN (mat.home_team_goals - mat.away_team_goals > 0) THEN 1 ELSE 0 END ) AS totalVictories,
  SUM(CASE WHEN (mat.home_team_goals - mat.away_team_goals = 0) THEN 1 ELSE 0 END ) AS totalDraws,
  SUM(CASE WHEN (mat.home_team_goals - mat.away_team_goals < 0) THEN 1 ELSE 0 END ) AS totalLosses,
SUM(mat.home_team_goals) AS goalsFavor,
    SUM(mat.away_team_goals) AS goalsOwn,
    (SUM(mat.home_team_goals) - SUM(mat.away_team_goals)) AS goalsBalance,
  ROUND((SUM(CASE 
  WHEN (mat.home_team_goals - mat.away_team_goals > 0) THEN 3
  WHEN (mat.home_team_goals - mat.away_team_goals = 0) THEN 1 ELSE 0 END)
  /
  (COUNT(mat.home_team) * 3) * 100), 2) AS efficiency
FROM teams AS tea
INNER JOIN matches AS mat
ON mat.home_team = tea.id
WHERE mat.in_progress=0
GROUP BY tea.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn ASC;
`;

const getLeaderboard = async () => {
  const [leaderboard] = await sequelize.query(query);

  return leaderboard;
};

export default { getLeaderboard };
