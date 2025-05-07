//create
const CreateRole = `insert into role(role,operation) values ($1, $2) returning *;`;

//read
const GetRoleList = `select * from role;`;
const GetRoleId = `select * from role where id = $1;`;
const GetRoleWithOperation = `select * from role where $1 ilike some(operation);`;

//update
const PatchRoleById = `update role set role = $1 where id=$2 returning *;`;
const PatchOperationRoleByID = `update role set operation = array_cat(operation, $1) where id=$2 returning *;`;

//delete
const DeleteRoleById = `delete from role where id = $1 returning *;`;
const DeleteOperationRoleById = 
// `update role set operation = array_remove(operation, $1) where id=$2 returning *;`
`update role set operation = (SELECT array(SELECT unnest(operation) 
EXCEPT SELECT unnest($1::text[]))) where id = $2 returning *;
`
//note: deleteOperation use patch instead of delete because it edit role
;


//miscellaneous
const FindOperation = `select * from role where $1 && operation and id = $2;`;


/*

queries untuk user dan modifikasi role

*/

const AddRole = `
update karyawan set roleid = $1
from role where karyawan.roleid = role.id and karyawan.id = $2
returning karyawan.id, karyawan.username, karyawan.nama, 
karyawan.roleid, role.role, role.operation;
`;

const GetUserWithRole = [`
select ka.id, ka.nama, ka.username, ka.email, ka.roleid,
ro.role, ro.operation
from karyawan ka join role ro on ka.roleid = ro.id;
`,
`
select ka.id, ka.nama, ka.username, ka.email, ka.roleid,
ro.role, ro.operation
from karyawan ka join role ro on ka.roleid = ro.id where ka.id=$1;
`
,];


module.exports = {
    CreateRole,
    GetRoleList,
    GetRoleId,
    GetRoleWithOperation,
    PatchRoleById,
    PatchOperationRoleByID,
    DeleteRoleById,
    DeleteOperationRoleById,
    
    FindOperation,

    //user change
    AddRole,
    GetUserWithRole,
}