const { Router } = require("express");
const cont = require("./cont");
const verifyToken = require("../../verifyToken");

const router = Router();

router.use(verifyToken);

router.post("/activity", cont.postActivity);

router.get("/activity/:idk", cont.getActivity);

// Tidak perlu route untuk snapshot karena otomatis berjalan lewat cron

module.exports = router;
