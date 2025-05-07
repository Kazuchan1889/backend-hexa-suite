const pool = require("../../db");
const queries = require("./queries");
const check = require("../../public");

const getGeoLocationAll = async(req,res)=>{
    try{
        // if (check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        
        const result = await pool.query(queries.getGeoLocation[0]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const getGeoLocationPerson = async(req,res)=>{
    try{
        // if (check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        const userId = req.params.Id;
        const result = await pool.query(queries.getGeoLocation[1],[userId]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const getGeoLocationOnly = async(req,res)=>{
    try{
        // if (check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        const result = await pool.query(queries.getGeoLocation[2]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const getGeoLocationOnlyFromAbsensi = async(req,res)=>{
    try{
        // if (check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        const absensiId = req.params.Id;
        const result = await pool.query(queries.getGeoLocation[3],[absensiId]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const getLokasiKantorAll = async(req,res)=>{
    try{
        // if (check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        const result = await pool.query(queries.getLokasiKantor[0]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const getLokasiKantorByID = async(req,res)=>{
    try{
        // if (check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        const LocationID = req.params.Id
        const result = await pool.query(queries.getLokasiKantor[1],[LocationID]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const postGeolocationSelf = async(req,res)=>{
    try{
        if (check.checkOperation("SELF_ABSENSI", req.userOperation, res)) return;
        const Today = new Date().toUTCString();
        const {
            longitude,
            latitude,
            lokasi
        }=req.body;

        console.log(`today is `,Today, req.userId);
        const selfAbsensi = await pool.query(`
            select id,idk from absensi where date = $1 and idk = $2;
            `,[Today,req.userId]);
        console.log(selfAbsensi.rows[0]);
        const result = await pool.query(queries.postLocation,[longitude,latitude,selfAbsensi.rows[0].id,lokasi]);
        return res.status(200).send(
            {   
                "id_koordinat":result.rows[0].id,
                "longitude":longitude,
                "latitude":latitude,
                "lokasi":lokasi,
                "absensi_id":selfAbsensi.rows[0].id,
                "userId":req.userId
            });

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const postLokasiKantor = async(req,res)=>{
    try{
        // if (check.checkOperation("SELF_ABSENSI", req.userOperation, res)) return;
        const {
            longitude,
            latitude,
            lokasi
        }=req.body;


        const result = await pool.query(queries.postLokasiKantor,[longitude,latitude,lokasi]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const patchLokasiKantorByID = async(req,res)=>{
    try{
        const {
            longitude,
            latitude,
            lokasi
        }=req.body;
        const LokasiKantorId = req.params.Id;

        const result = await pool.query(queries.patchLokasiKantor,[longitude,latitude,lokasi,LokasiKantorId]);
        return res.status(200).send(result.rows);
    }catch(error){
        return res.json(error);
    }
};

const deleteGeolocationByID = async(req,res)=>{
    try{
        // if (check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        const Id = req.params.Id;
        const result = await pool.query(queries.deleteGeolocation,[Id]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
};

const deleteLokasiKantorByID = async(req,res)=>{
    try{
        // if (check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        const Id = req.params.Id;
        const result = await pool.query(queries.deleteLokasiKantor,[Id]);
        return res.status(200).send(result.rows);

    }catch(error){
        console.log(error);
        return res.json(error);
    }
}



module.exports = {
    getGeoLocationAll,
    getGeoLocationPerson,
    getGeoLocationOnly,
    getGeoLocationOnlyFromAbsensi,

    getLokasiKantorAll,
    getLokasiKantorByID,

    postGeolocationSelf,

    postLokasiKantor,

    patchLokasiKantorByID,

    deleteGeolocationByID,

    deleteLokasiKantorByID,
};