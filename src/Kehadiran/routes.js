const { Router } = require("express");
const cont = require("./cont");
const verifyToken = require("../../verifyToken");

const router = Router();

router.use(verifyToken);

router.get("/list",cont.getKehadiranList);
router.get("/list/karyawan/:Id",cont.getKehadiranListByID);
router.get("/list/all",cont.getAllYearKehadiran);

router.patch("/update/:Id",cont.updateKehadiranKaryawan);

module.exports = router;