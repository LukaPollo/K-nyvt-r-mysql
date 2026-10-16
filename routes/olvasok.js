import express from "express";
import db from "../data/db.js"

const router = express.Router();

router.get("/:id/kolcsonzesek", async (req, res) => {
    const id = Number(req.params.id);
    let sql = "SELECT kolcsonzesek.*, konyvek.cim, olvasok.nev FROM kolcsonzesek JOIN konyvek ON kolcsonzesek.konyvId = konyvek.id JOIN olvasok ON kolcsonzesek.olvasoId = olvasok.id WHERE kolcsonzesek.olvasoId = ?";
    const [eredmeny] = await db.query(sql, id);
    const eredmeny2 = eredmeny.map(k => {
        return {
            ...k,
            visszahozva: k.visszahozva === "true"
        };
    });
    res.json({
        olvaso: eredmeny2[0].nev,
        kolcsonzesek: eredmeny2 
    });
});

export default router;