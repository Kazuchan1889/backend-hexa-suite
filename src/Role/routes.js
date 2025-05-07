const { Router } = require("express");
const cont = require("./cont");
const verifyToken = require("../../verifyToken");
const router = Router();

router.use(verifyToken);

//get
router.get("/list",cont.getRoleList);
router.get("/list/id/:Id",cont.getRoleId);
router.get("/list/operation/:Name",cont.getRoleWithOperation);

router.get("/list/user",cont.getUserWithRole);
router.get("/list/user/:Id",cont.getUserWithRoleByID);

//post
router.post("/create",cont.createRole);

//patch

//nama role
router.patch("/update/role/:Id",cont.patchRoleByID);

//operation yang ada pada id role
router.patch("/update/operation/:Id",cont.patchOperationRoleByID);

//delete operation yang ada pada role
router.patch("/update/delete/:Id",cont.deleteOperationInRoleByID);

//menambahkan role pada user
router.patch("/update/user/:Id",cont.patchUserRoleByID);


//delete
router.delete("/delete/:Id",cont.deleteRoleByID);


module.exports = router;