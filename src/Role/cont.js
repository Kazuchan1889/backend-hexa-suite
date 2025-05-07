const pool = require("../../db");
const queries = require("./queries");
const check = require("../../public");



/*

API Controller untuk tabel role, pastikan tabelnya ada
Jika ada yang ingin diubah tolong kontak dulu sebelum ada apa - apa
Kita gada documentation cok, jadi kalo lu ubah tiba2 gw belum tentu tau dimana

*/


const createRole = async(req,res)=>{
    try{
        const {
            role,
            operation = Int8Array
        } = req.body;
        // if(check.checkOperation(""))
        const result = await pool.query(queries.CreateRole,[role,operation]);
        return res.status(200).send(result.rows);
    }catch(error){
        return res.json(error);
    }

};

const getRoleList = async(req,res)=>{
    try{
        console.log(req.userOperation);
        const result = await pool.query(queries.GetRoleList);
        return res.status(200).send(result.rows);

    }catch(error){
        return res.send(error);
    }
};

const getRoleId = async(req,res)=>{
    try{
        const Id = req.params.Id;
        const result = await pool.query(queries.GetRoleId,[Id]);
        return res.status(200).send(result.rows[0]);
    }catch(error){
        return res.send(error);
    }

};

const getRoleWithOperation = async(req,res)=>{
    try{
        //search by name not tested yet
        const requestSearch = req.params.Name;
        const result = await pool.query(queries.GetRoleWithOperation,[requestSearch]);
        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }

};

const patchOperationRoleByID = async(req,res)=>{

    try{
        const ID = req.params.Id;
        const {
            operation=Int8Array
        }=req.body;
        const findOperation = await pool.query(queries.FindOperation,[operation,ID]);
        // console.log(findOperation.rows);
        console.log(operation);
        if(findOperation.rowCount > 0){
            return res.status(400).json({message: "An Operation Exists"})
        }
        const result = await pool.query(queries.PatchOperationRoleByID,[operation,ID]);
        return res.status(200).send(result.rows);
        // return res.status(200).send(findOperation.rows);

    }catch(error){
        return res.json(error);
    }
};

const patchRoleByID = async(req,res)=>{
    try{
        const ID = req.params.Id;
        const {
            role
        }=req.body;
        const result = await pool.query(queries.PatchRoleById,[role,ID]);
        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }
};

const deleteRoleByID = async(req,res)=>{
    try{
        const ID = req.params.Id;
        const result = await pool.query(queries.DeleteRoleById,[ID]);
        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }
};

const deleteOperationInRoleByID = async(req,res)=>{
    try{
        const ID = req.params.Id;
        const {
            operation
        }=req.body;
        const result = await pool.query(queries.DeleteOperationRoleById,[operation,ID]);
        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }
};


/* 

    kolom roleid berada di tabel karyawan
    API Controller untuk user role

*/

//patchUserRoleByID menggunakan patch untuk mengganti roleid di data karyawan
const patchUserRoleByID = async(req,res)=>{
    const {
        roleId
    }=req.body;
    const userId = req.params.Id;
    try{
        const addRole = await pool.query(queries.AddRole,[roleId, userId]);
        return res.status(200).send(addRole.rows);
    }catch(error){
        return res.json(error);
    }
};

const getUserWithRole = async(req,res)=>{
    try{
        const result = await pool.query(queries.GetUserWithRole[0]);
        return res.status(200).send(result.rows);
    }catch(error){
        return res.json(error);
    }
};


//by karyawan id
const getUserWithRoleByID = async(req,res)=>{
    try{
        const userId = req.params.Id;
        const result = await pool.query(queries.GetUserWithRole[1],[userId]);
        return res.status(200).send(result.rows);
        
    }catch(error){
        return res.json(error);
    }
};


module.exports={
    //Role
    createRole,
    getRoleList,
    getRoleId,
    getRoleWithOperation,
    patchOperationRoleByID,
    patchRoleByID,
    deleteRoleByID,
    deleteOperationInRoleByID,
    getRoleId,

    //User
    patchUserRoleByID,
    getUserWithRole,
    getUserWithRoleByID,
}