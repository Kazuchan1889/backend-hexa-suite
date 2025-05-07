const { Router } = require("express");
const cont = require("./cont");
const verifyToken = require("../../verifyToken");
/// ip:port/api/absensi
const router = Router();

router.use(verifyToken);
//get
router.get("/list",cont.getOverTime);
router.get("/list/hour/:Id",cont.getUserHours);

//post
router.post("/post",cont.postOverTime);

//patch
router.patch("/status/:Id",cont.patchOverTimeStataprove);
router.patch("/update/self/:Id");

module.exports = router;