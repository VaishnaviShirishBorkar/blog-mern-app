import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login',signin);
router.post('/register',signup);

export default router;