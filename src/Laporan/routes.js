const { Router } = require("express");
const cont = require("./cont");
const verifyToken = require("../../verifyToken");

const router = Router();

router.use(verifyToken);

router.get("/get/data/self", cont.getLaporanSelf);
router.post("/get", cont.getLaporan);
router.get("/get/tanggal/:Tgl",cont.getLaporanByTanggal);
router.get("/get/all",cont.getAllUserLaporan);


router.post("/post", cont.postLaporan);

//edit laporan
router.patch("/patch/:Id",cont.patchLaporanSelf);
module.exports = router;
