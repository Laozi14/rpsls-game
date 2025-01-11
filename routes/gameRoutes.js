import express from 'express';
import { showGame, playGame } from '../controllers/gameController.js';

const router = express.Router();

router.get('/', showGame);
router.post('/play', playGame);

export default router;
