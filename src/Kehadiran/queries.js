const getKehadiran = [
    `
    select kh.id as "id", 
    kh.idk as "id karyawan",
    ka.nama as nama,
    kh.year as tahun,
    kh.total_jam_overtime as "total jatah overtime (jam)",
    (kh.total_jam_overtime/8) as "total jatah overtime (hari)", 
    coalesce(kh.total_hari_absensi, 0) as "total absensi",
    coalesce(kh.jumlah_hari_cuti, 0)  as "total hari cuti"
    from kehadiran  kh left join karyawan ka on ka.id = kh.idk
    where kh.year = $1
    order by kh.id asc 
    `
    ,
    `
    select kh.id as "id", 
    kh.idk as "id karyawan",
    ka.nama as nama,
    kh.year as tahun,
    kh.total_jam_overtime as "total jatah overtime (jam)",
    (kh.total_jam_overtime/8) as "total jatah overtime (hari)", 
    coalesce(kh.total_hari_absensi, 0) as "total absensi",
    coalesce(kh.jumlah_hari_cuti, 0)  as "total hari cuti"
    from kehadiran  kh left join karyawan ka on ka.id = kh.idk
    where kh.idk = $1 and kh.year = $2
    order by kh.id asc 
    `
    ,
    `
    select kh.id as "id", 
    kh.idk as "id karyawan",
    ka.nama as nama,
    kh.year as tahun, 
    kh.total_jam_overtime as "total jatah overtime (jam)",
    (kh.total_jam_overtime/8) as "total jatah overtime (hari)", 
    coalesce(kh.total_hari_absensi, 0) as "total absensi",
    coalesce(kh.jumlah_hari_cuti, 0)  as "total hari cuti"
    from kehadiran kh left join karyawan ka on ka.id = kh.idk

    order by kh.id asc 
    `
    ,
];

const exportKehadiran = `
    select kh.id, kh.idk as "id karyawan",
    ka.nama as nama,
	ka.username as username,
	ka.email as email,
    kh.year as tahun,
    kh.total_jam_overtime as "total jatah overtime (jam)",
    (kh.total_jam_overtime/8) as "total jatah overtime (hari)", 
    coalesce(kh.total_hari_absensi, 0) as "total absensi",
    coalesce(kh.jumlah_hari_cuti, 0)  as "total hari cuti"
    from kehadiran kh left join karyawan ka on ka.id = kh.idk
    order by kh.id asc 
`;

module.exports = {
    getKehadiran,

    exportKehadiran
    
}