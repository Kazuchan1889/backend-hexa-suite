const getLaporan = `select k.nama as nama,
l.id as id,
l.idk as idk,
TO_CHAR(l.date, 'DD/MM/YYYY') as tanggal,
TO_CHAR(l.targetdate, 'DD/MM/YYYY') as target,
TO_CHAR(l.jam::time , 'HH24:MI') as jam,
TO_CHAR(l.jamtarget::time , 'HH24:MI') as time,
l.lokasi as lokasi,
l.keterangan as keterangan,
l.jenis as jenis,
l.dokumen as dokumen ,
l.ontime as ontime,
l.deskripsi as deskripsi
from laporan l join karyawan k on l.idk = k.id 
where (l.targetdate = $1 or $1 is NULL) 
and l.jenis ilike $2
order by l.targetdate desc`;
const getLaporanMingguan = `select k.nama as nama,
l.id as id,
l.idk as idk,
TO_CHAR(l.date, 'DD/MM/YYYY') as tanggal,
to_char(l.targetdate,'DD/MM/YYYY') as target,
l.lokasi as lokasi,
TO_CHAR(l.jam::time , 'HH24:MI') as jam,
TO_CHAR(l.jamtarget::time , 'HH24:MI') as time,
l.keterangan as keterangan,
l.jenis as jenis,
l.dokumen as dokumen,
l.deskripsi as deskripsi

from laporan l join karyawan k on l.idk = k.id 
where 
l.targetdate >= $1 
and l.targetdate <= $2 
and l.jenis ilike $3
order by 
k.nama desc,
l.targetdate desc
`;
const getLaporanSelf = `select 
l.id as id,
k.nama as nama,
l.idk as idk,
TO_CHAR(l.date, 'DD/MM/YYYY') as tanggal,
to_char(l.targetdate,'DD/MM/YYYY') as target,
l.lokasi as lokasi,
TO_CHAR(l.jam::time , 'HH24:MI') as jam,
TO_CHAR(l.jamtarget::time , 'HH24:MI') as time,
l.keterangan as keterangan,
l.jenis as jenis,
l.dokumen as dokumen,
l.deskripsi as deskripsi
from laporan l join karyawan k on l.idk = k.id 
where k.id = $1 
order by l.targetdate desc;`;

const getAllLaporan = `select 
l.id as id,
k.nama as nama,
l.idk as idk,
TO_CHAR(l.date, 'DD/MM/YYYY') as tanggal,
to_char(l.targetdate,'DD/MM/YYYY') as target,
l.lokasi as lokasi,
TO_CHAR(l.jam::time , 'HH24:MI') as jam,
TO_CHAR(l.jamtarget::time , 'HH24:MI') as time,
l.keterangan as keterangan,
l.jenis as jenis,
l.dokumen as dokumen,
l.deskripsi as deskripsi
from laporan l join karyawan k on l.idk = k.id 
order by l.targetdate desc;`;

const postLaporan = `
insert into laporan 
(idk,date,lokasi,keterangan,jenis,dokumen,jam,targetdate,ontime,jamtarget, deskripsi) values 
($1,$2,$3,$4,$5,$6,now(),$7,$8,$9, $10) returning *`;

const excelLaporanPerOrang = `
select k.nama as nama,
TO_CHAR(l.date, 'DD/MM/YYYY') as "Tanggal Submit",
to_char(l.targetdate,'DD/MM/YYYY') as "Tanggal Tujuan Laporan",
l.lokasi as lokasi, 
TO_CHAR(l.jam::time , 'HH24:MI') as "Jam Mengisi",
TO_CHAR(l.jamtarget::time , 'HH24:MI') as "Jam Kerja",
l.keterangan as keterangan,
l.jenis as jenis,
l.deskripsi as deskripsi
from laporan l join karyawan k on l.idk = k.id 
where (k.id = $1 or $1 is NULL) and (l.targetdate = $2 or $2 is NULL) 
order by l.targetdate desc;
`;

const excelLaporan = `select k.nama as nama,
TO_CHAR(l.date, 'DD/MM/YYYY') as "Tanggal Submit",
to_char(l.targetdate,'DD/MM/YYYY') as "Tanggal Tujuan Laporan",
l.lokasi as lokasi, 
TO_CHAR(l.jam::time , 'HH24:MI') as "Jam Mengisi",
TO_CHAR(l.jamtarget::time , 'HH24:MI') as "Jam Kerja",
l.keterangan as keterangan,
l.jenis as jenis,
l.deskripsi as deskripsi
from laporan l join karyawan k on l.idk = k.id 
where (k.id = $1 or $1 is NULL) and (l.targetdate = $2 or $2 is NULL) 
order by l.targetdate desc`;

//, LEFT(SPLIT_PART(TO_CHAR(l.date),'T',2),5) as time


//update laporan
const PatchLaporan = `
update laporan set       
    lokasi = $1,
    keterangan = $2,
    jenis = $3,
    dokumen = $4,
    deskripsi = $5 where id = $6 and idk = $7
returning *;
`;

const getLaporanByDate = `select k.nama as nama,
l.id as id,
TO_CHAR(l.date, 'DD/MM/YYYY') as tanggal,
TO_CHAR(l.targetdate, 'DD/MM/YYYY') as target,
TO_CHAR(l.jam::time , 'HH24:MI') as jam,
TO_CHAR(l.jamtarget::time , 'HH24:MI') as time,
l.lokasi as lokasi,
l.keterangan as keterangan,
l.jenis as jenis,
l.dokumen as dokumen ,
l.ontime as ontime,
l.deskripsi as deskripsi
from laporan l join karyawan k on l.idk = k.id 
where
l.date = $1
order by l.targetdate desc`;


module.exports = {
  getLaporan,
  getLaporanMingguan,
  getLaporanSelf,
  postLaporan,
  excelLaporan,
  excelLaporanPerOrang,


  //getlaporanbydate
  getLaporanByDate,
  getAllLaporan,
  //patchlaporan
  PatchLaporan,
};
