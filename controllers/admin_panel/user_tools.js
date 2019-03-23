const request = require('request-promise-cache');

exports.getUser = (userId) => {
    return request(`https://www.googleapis.com/admin/directory/v1/users/${userId}`)
    .then((data) => {
        console.log(userId)
       
        return data;
    }).catch((err) => {
        return err;
    })
}
