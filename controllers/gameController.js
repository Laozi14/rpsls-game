import { query } from '../database.js';
import Game from '../models/gameModel.js';

const game = new Game();

export const showGame = async (req, res) => {
  try {
    // Fetch the top players for the leaderboard
    const leaderboard = await query(
      'SELECT name, wins, losses, ties FROM players ORDER BY wins DESC, ties DESC LIMIT 10'
    );
    res.render('index', { title: 'Rock-Paper-Scissors-Lizard-Spock', leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

export const playGame = async (req, res) => {
  const { playerName, choice: playerChoice } = req.body;
  const systemChoice = game.getRandomChoice();
  const result = game.determineWinner(playerChoice, systemChoice);

  try {
    // Check if the player exists
    let player = await query('SELECT * FROM players WHERE name = $1', [playerName]);
    if (player.length === 0) {
      await query('INSERT INTO players (name) VALUES ($1)', [playerName]);
    }

    // Update player stats
    if (result === 'player') {
      await query('UPDATE players SET wins = wins + 1 WHERE name = $1', [playerName]);
    } else if (result === 'system') {
      await query('UPDATE players SET losses = losses + 1 WHERE name = $1', [playerName]);
    } else {
      await query('UPDATE players SET ties = ties + 1 WHERE name = $1', [playerName]);
    }

    res.render('result', {
      title: 'Game Result',
      playerChoice,
      systemChoice,
      result,
    });
  } catch (error) {
    console.error('Error processing game:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
