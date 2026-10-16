import express from 'express';
import db from '../data/db.js'
const router = express.Router();

router.get("/", async (req, res) => {
    let sql = 'SELECT kolcsonzesek.*, konyvek.cim, olvasok.nev FROM  kolcsonzesek JOIN konyvek ON kolcsonzesek.konyvId = konyvek.id JOIN olvasok ON kolcsonzesek.olvasoId = olvasok.id'
    let eredmeny = await db.query(sql);
    const eredmeny2 = eredmeny.map(k => {
        return {
            ...k,
            visszahozva: k.visszahozva === "true"
        };
    });

    res.json(eredmeny2);
});

router.post("/", async(req, res) => {
    const konyvId = req.body.konyvId
    const olvasoId = req.body.olvasoId
    const datum = new Date().toISOString().slice(0,10);

    let sql = "INSERT INTO kolcsonzesek (konyvId, olvasoId, datum, visszahozva) VALUES (?,?,?, 'false')";
    const eredmeny = await db.query(sql, [konyvId, olvasoId, datum])

    res.status(201).json({message: "sikeres"});

});

router.patch("/:id/visszahoz", async(req, res) => {
    const id = Number(req.params.id);

    let sql = "SELECT * FROM kolcsonzesek WHERE id = ?"; 
    const talalat = await db.query(sql, id);

    if(talalat.length === 0) return res.status(400).json({message: "nincs"})

    let sql2 = "UPDATE kolcsonzesek SET visszahozva = 'true' WHERE id = ?"
    await db.query(sql2, id)

    res.json({message: "siekres"})
});

export default router