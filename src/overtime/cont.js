const pool = require("../../db");
const queries = require("./queries");
const check = require("../../public");
const kehadiran = require("../Kehadiran/cont");

const postOverTime = async (req, res) => {
    const {
        note,
        mulai,
        selesai,
        tanggal_overtime,
        //boolean
        tipe,
        breaktime,
    } = req.body;
    try {
        // console.log("API is running");
        const post = await pool.query(queries.postOvertime, [note, req.userId, mulai, selesai, tanggal_overtime, tipe, breaktime]);
        return res.status(200).send("success");

    } catch (error) {
        return res.send(error);
    }
};

const getOverTime = async (req, res) => {
    const getOT = await pool.query(queries.getOvertime);
    return res.status(200).send(getOT.rows);
}

const patchOverTimeStataprove = async(req, res)=>{
    if (check.checkOperation("UPDATE_CUTI", req.userOperation, res)) return;
    const statusId = req.params.Id;
    console.log(statusId);

    //bool body request
    const {
        status
    }=req.body
    
    try{
        const findPost = await pool.query(`select * from overtime where id=${statusId}`);
        console.log(findPost)
        if(findPost.rowCount < 1 ){
            console.log('tidak ditemukan')
            return res.status(204).send("post tidak ditemukan");
        } 
            await pool.query(queries.patchApprove,[status,statusId]);
            kehadiran.checkKehadiranKaryawan();
            return res.status(200).send("Success");
       
    }catch(error){
        return res.send(error);
    }

}

const getUserHours = async(req,res)=>{

    try{
        const defaultHour = 8 || process.env.DEFAULT_HOUR;
        const userId = req.params.Id;
        const result = await pool.query(queries.getUserOvertimeHours,[userId]);
        
        console.log((result.rows[0].duration)/defaultHour);
        return res.status(200).send({
            jam_overtime: Number(result.rows[0].duration),
            total_hari: (result.rows[0].duration)/defaultHour
        });

    }catch(error){
        return res.json(error);
    }
};

//tidak dapat berkerja jika telah diacc ato direject
const patchSelfOvertimeById = async(req,res)=>{
    try{
        const {
            note,
            mulai,
            selesai,
            tipe,
            tanggal_overtime,
            istirahat,
            photo,
            patchSelfOvertime
        }=req.body;
        const overtimeId = req.params.Id;
        const selfId = req.userId;
        const result = await pool.query(queries.patchSelfOvertime,[
            note,
            mulai,
            selesai,
            tipe,
            tanggal_overtime,
            istirahat,
            photo,
            patchSelfOvertime,
            
            overtimeId,
            selfId
        ]);
        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }


};

module.exports = {
    postOverTime,
    getOverTime,
    patchOverTimeStataprove,
    getUserHours,
}