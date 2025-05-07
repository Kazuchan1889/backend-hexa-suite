const getGeoLocation = [`
select ab.id , ab.idk as "id karyawan", ka.nama, ka.username, 
ka.email,ge.id as "Location id", ge.longitude, ge.lokasi
ge.latitude, ab.masuk, ab.keluar, ab.date from absensi ab 
left join karyawan ka on ka.id = ab.idk 
left join geoloc ge on ge.absensi_id = ab.id;`,
`
select ab.id , ab.idk as "id karyawan", ka.nama, ka.username, 
ka.email,ge.id as "Location id", ge.longitude, ge.lokasi
ge.latitude, ab.masuk, ab.keluar, ab.date from absensi ab 
left join karyawan ka on ka.id = ab.idk 
left join geoloc ge on ge.absensi_id = ab.id
where ka.id = $1;`,
`
select * from geoloc;
`
,
`
select * from geoloc where absensi_id = $1;
`
];

const getLokasiKantor = [
    `select * from lokasikantor;`,
    `select * from lokasikantor where id = $1;`
];

const postLocation = `
    INSERT INTO geoloc(longitude, latitude,absensi_id, lokasi) VALUES($1, $2, $3, $4) 
    ON CONFLICT (absensi_id) DO UPDATE SET longitude = $1, latitude = $2, lokasi = $4 returning id;
`;

const postLokasiKantor = `
    INSERT INTO lokasikantor(longitude, latitude, lokasi) VALUES($1, $2, $3) returning *;
`;

const patchLokasiKantor = `
    update lokasikantor 
    set longitude = $1,
    latitude = $2,
    lokasi = $3 
    where id = $4 returning *;
`;

const deleteGeolocation = `
    delete from geoloc where id = $1 returning *;
`;

const deleteLokasiKantor = `
    delete from lokasikantor where id = $1 returning *;
`;

module.exports={
    getGeoLocation,
    getLokasiKantor,
    postLocation,
    postLokasiKantor,
    patchLokasiKantor,
    deleteGeolocation,
    deleteLokasiKantor,
}