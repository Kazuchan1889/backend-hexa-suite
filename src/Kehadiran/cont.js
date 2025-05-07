const pool = require("../../db");
const queries = require("./queries");
const check = require("../../public");


//kehadiran semua per tahun
const getKehadiranList = async(req,res)=>{
    try{
        checkKehadiranKaryawan();
        const thisYear = new Date().getFullYear();
        const result = await pool.query(queries.getKehadiran[0],[thisYear]);

        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }
};


const getKehadiranListByID = async(req,res)=>{
    try{
        checkKehadiranKaryawan();

        const thisYear = new Date().getFullYear();
        const userId = req.params.Id;
        const result = await pool.query(queries.getKehadiran[1],[userId,thisYear]);
        // console.log(typeof(result.rows[0]["total jatah overtime (jam)"]))

        return res.status(200).send(result.rows);

    }catch(error){
        return res.json(error);
    }
};


const getAllYearKehadiran = async(req,res)=>{
    try{
        // const result = await pool.query(queries.getKehadiran[2]);
        checkKehadiranKaryawan();
        const result = await pool.query(queries.getKehadiran[2]);

        return res.status(200).send(result.rows);
    }catch(error){
        return res.json(error);
    }
};


//summary kehadiran berisi jam overtime dan jumlah hari absensi;
const checkKehadiranKaryawan = async()=>{
    try{
        const ListId = await pool.query(`select id from karyawan where tglkeluar is null;`);
        const currentYear = new Date().getFullYear();
        // console.log("kehadiran");
        // console.log(ListId.rowCount);
        // console.log(currentYear);
        for (let index = 0; index < ListId.rowCount; index++) {
            console.log("kehadiran2");
    
            const exist = await pool.query(`select exists(select 1 from kehadiran where year = $1 and idk = $2);`,[currentYear,ListId.rows[index].id])
            
            const totalAbsensi = await pool.query(`
                select count(*) from absensi 
                where extract(year from date) = $1 
                and idk = $2;
                `,[currentYear,ListId.rows[index].id]);
            const totalOvertime = await pool.query(`
                select sum (extract(hour from (selesai-mulai))) as duration 
                from overtime 
                where karyawan_id =$1 and status = true
                and extract(year from tanggal_overtime) = $2;
                `,[ListId.rows[index].id,currentYear]);
            const totalCuti = await pool.query(`
                select sum(selesai - mulai+1) from pengajuan 
                where idk = $1 and extract(year from date) = $2;
                `,[ListId.rows[index].id, currentYear]);
            const totalWeekend = await pool.query(`
                select count(*)*8 as count from absensi_weekend
                where idk = $1 and extract(year from date) = $2 and
                status is true;
                `,[
                    ListId.rows[index].id, currentYear
                ]);
            // console.log(totalWeekend.rows);
            if(exist.rows[0].exists == true){
                await pool.query(`
                        update kehadiran 
                        set total_jam_overtime = $1,
                        total_hari_absensi = $2,
                        jumlah_hari_cuti = $3
                        where idk = $4 and year = $5; 
                    `,[
                        (Number(totalOvertime.rows[0].duration) + Number(totalWeekend.rows[0].count)),
                        totalAbsensi.rows[0].count,
                        totalCuti.rows[0].sum,
    
                        ListId.rows[index].id,
                        currentYear
                    ]);
                // console.log("User Id is ", ListId.rows[index].id);
                // console.log("The year is ",currentYear);
                // console.log(totalAbsensi.rows);
                // console.log(totalOvertime.rows);
            }else{
                await pool.query(`
                        insert into kehadiran(idk, year, total_jam_overtime, total_hari_absensi, jumlah_hari_cuti)
                        values ($1,$2,$3,$4,$5);
                    `,[
                        ListId.rows[index].id,
                        currentYear,
                        (Number(totalOvertime.rows[0].duration) + Number(totalWeekend.rows[0].count)),
                        // totalOvertime.rows[0].duration,
                        totalAbsensi.rows[0].count,
                        totalCuti.rows[0].sum
                    ]);
                console.log("wut");
            }
        }
    }catch(error){
        console.log(error);
    }

    
};


//update dan dapat respon dari id karyawan tahun ini
const updateKehadiranKaryawan = async(req,res)=>{
    try{
        const userId = req.params.Id;
        // const ListId = await pool.query(`select id from karyawan where id = $1;`);
        const currentYear = new Date().getFullYear();
        const totalAbsensi = await pool.query(`
            select count(*) from absensi 
            where extract(year from date) = $1 
            and idk = $2;
            `,[currentYear,/*ListId.rows[0].id*/ userId]);
        const totalOvertime = await pool.query(`
            select sum (extract(hour from (selesai-mulai))) as duration 
            from overtime 
            where karyawan_id =$1 and status = true;
            `,[/*ListId.rows[0].id*/userId]);
        console.log(userId);
        console.log("The year is ",currentYear);
        console.log(totalAbsensi.rows);
        console.log(totalOvertime.rows);
        const result = await pool.query(`
            update kehadiran 
            set total_jam_overtime = $1,
            total_hari_absensi = $2

            where idk = $3 and year = $4 returning *;`,[
                totalOvertime.rows[0].duration,
                totalAbsensi.rows[0].count,
                /*ListId.rows[0].id*/ userId,
                currentYear
            ]);
        console.log("test2");

        return res.status(200).send(result.rows);
    }catch(error){
        return res.json(error);
    }
};

// const deleteKehadiranKaryawan = async(req,res)=>{

// };


module.exports = {
    getKehadiranList,
    getKehadiranListByID,
    getAllYearKehadiran,

    checkKehadiranKaryawan,

    updateKehadiranKaryawan,
}