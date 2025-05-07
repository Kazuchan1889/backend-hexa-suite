const pool = require("../../db");
const queries = require("./queries");
const check = require("../../public");

const getWeekendAbsensiSelf = async(req,res)=>{
    try{
        // if(check.checkOperation("SELF_ABSENSI", req.userOperation, res)) return;
        const result = await pool.query(`select aw.id,idk, ka.nama, ka.username, 
            ka.email, aw.date,aw.status from absensi_weekend aw left join karyawan ka on aw.idk = ka.id
            where ka.id = $1;`,
            [req.userId],(err,result)=>{
            if(err){
                return res.json(err);
            }
            result.rows.forEach((row)=>{
                console.log(row);
            });
        return res.status(200).send(result.rows);
        });
    }catch(error){
        return res.json(error);
    }
};

const getWeekendAbsensiList = async (req,res)=>{
    try{
        // if(check.checkOperation("READ_ABSENSI", req.userOperation, res)) return;
        const result = await pool.query(`select aw.id,idk, ka.nama, ka.username, 
            ka.email, aw.date,aw.status from absensi_weekend aw left join karyawan ka on aw.idk = ka.id;`, 
            
            (err,result)=>{
            if(err){
                return res.json(err);
            }
            result.rows.forEach((row)=>{
                console.log(row);
            });
        return res.status(200).send(result.rows);
        });
    }catch(error){
        return res.json(error);
    }
}

const postRequestSelfAbsensiWeekend = async(req,res)=>{
    try{
        //user
        // if(check.checkOperation("SELF_ABSENSI",req.userOperation,res)) return;
        const {
            date
        }=req.body;
        const result = await pool.query(queries.postRequestAbsensi,[req.userId,date]);

        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }
};

const postRequestAbsensiWeekend = async(req,res)=>{
    try{
        //admin
        // if(check.checkOperation("READ_ABSENSI",req.userOperation,res)) return;
        const {
            userId,
            date
        }=req.body;
        const result = await pool.query(queries.postRequestAbsensi,[userId,date]);
        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }
};

const patchApproveAbsenWeekend = async(req,res)=>{

    try{
        // if(check.checkOperation("READ_ABSENSI",req.userOperation,res)) return;

        //true or false
        const{
            status
        }= req.body;
        const Id = req.params.Id;
        // const absen = await pool.query(`
        //     INSERT INTO absensi(idk, status,date) VALUES($1, 'masuk', $2) 
        //     ON CONFLICT (idk,date) DO UPDATE SET status = 'masuk';
        // `,[]);
        const result = await pool.query(`
            update absensi_weekend set status = $1 where id = $2 returning *;
        `,
        [
            status,Id
        ]);
        switch(status){
            case true:
                await pool.query(`
                    INSERT INTO absensi(idk, status,date) VALUES($1, $2, $3) 
                    ON CONFLICT (idk,date) DO UPDATE SET status = $2;
                `,[result.rows[0].idk, 'masuk', result.rows[0].date]);
                console.log("weekend masuk");
                break;
            case false:
                await pool.query(`
                    INSERT INTO absensi(idk, status,date) VALUES($1, $2, $3) 
                    ON CONFLICT (idk,date) DO UPDATE SET status = $2;
                `,[result.rows[0].idk, 'libur', result.rows[0].date]);
                console.log("weekend libur")
                break
        }
        return res.status(200).send(result.rows);

    }
    catch(error){
        return res.json(error);
    }

}

const deleteAbsensiWeekend = async(req,res)=>{
    try{
        if(check.checkOperation("READ_ABSENSI",req.userOperation,res)) return;

        const AbsensiWId = req.params.Id;
        const result = await pool.query(`
                delete from absensi_weekend where id = $1 returning *; 
            `,[AbsensiWId]);
        return res.status(200).send(result.rows);
    }catch(error){
        return res.json(error);
    }
};

module.exports = {
    getWeekendAbsensiSelf,
    getWeekendAbsensiList,
    postRequestSelfAbsensiWeekend,
    postRequestAbsensiWeekend,
    patchApproveAbsenWeekend,
    deleteAbsensiWeekend,
};