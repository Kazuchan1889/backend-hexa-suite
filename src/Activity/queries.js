const insertActivityQuery = `
    INSERT INTO user_activity (idk, activity_data, created_at) 
    VALUES ($1, $2, $3) RETURNING *;
`;

module.exports = {
    insertActivityQuery
};
