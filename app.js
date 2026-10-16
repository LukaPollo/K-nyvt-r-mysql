import express from 'express';
import router from "./routes/kolcsonzes.js";
import routerOlvasok from "./routes/olvasok.js";
import routerKonyvek from "./routes/konyvek.js";

const app = express();

app.use(express.json());
app.use("/kolcsonzesek", router);
app.use("/olvasok", routerOlvasok);
app.use("/konyvek", routerKonyvek)

const port = 3000;
app.listen(port, () => {
    console.log("http://localhost:3000")
})