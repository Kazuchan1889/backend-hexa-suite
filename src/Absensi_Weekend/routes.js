const { Router } = require("express");
const cont = require("./cont");
const verifyToken = require("../../verifyToken");
/// ip:port/api/absensi
const router = Router();

router.use(verifyToken);

//get
router.get('/get/list',cont.getWeekendAbsensiList);
router.get('/get',cont.getWeekendAbsensiSelf);

//post
router.post("/post/self",cont.postRequestSelfAbsensiWeekend);
router.post("/post/user",cont.postRequestAbsensiWeekend);

//patch
router.patch("/patch/list/:Id",cont.patchApproveAbsenWeekend);

//delete
router.delete("/delete/:Id",cont.deleteAbsensiWeekend);

module.exports = router;