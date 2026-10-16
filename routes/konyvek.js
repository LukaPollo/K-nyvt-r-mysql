import express from 'express';
import db from '../data/db.js';
const router = express.Router();

router.get('/elerheto', async (req, res) => {
    const sql = "SELECT * FROM konyvek JOIN kolcsonzesek ON konyvek.id = kolcsonzesek.konyvId AND kolcsonzesek.visszahozva = 'false'";
    const sor = await db.query(sql);
    res.json(sor);
});


export default router;