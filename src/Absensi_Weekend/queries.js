const postRequestAbsensi = 
    `insert into absensi_weekend(idk,date) values ($1,$2) returning *;`;

module.exports = {
    postRequestAbsensi,
}