const { Router } = require("express");
const cont = require("./cont");
const verifyToken = require("../../verifyToken");
/// ip:port/api/export
const router = Router();

router.use(verifyToken);

//get
router.get("/get/all",cont.getGeoLocationAll);
router.get("/get/karyawan/:Id",cont.getGeoLocationPerson);
router.get("/get/koordinat/all",cont.getGeoLocationOnly);
router.get("/get/koordinat/absensi/:Id",cont.getGeoLocationOnlyFromAbsensi);

router.get("/get/kantor/all",cont.getLokasiKantorAll);
router.get("/get/kantor/id/:Id",cont.getLokasiKantorByID);


//post
router.post("/post/self",cont.postGeolocationSelf);

router.post("/post/kantor",cont.postLokasiKantor);

//patch
router.patch("/patch/kantor/:Id",cont.patchLokasiKantorByID);

//delete
router.delete("/delete/absensi/:Id",cont.deleteGeolocationByID);

router.delete("/delete/kantor/:Id",cont.deleteLokasiKantorByID);

module.exports = router;