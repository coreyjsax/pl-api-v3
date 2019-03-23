const request = require('request-promise-cache');

const headers = { Authorization: `Bearer ${process.env.TDL_API_KEY}` }
console.log(process.env.TDL_API_KEY)
const postHeader = {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.TDL_API_KEY}`,
    "Content-Type": 'application/json'
}

exports.authorize = () => {
    
}

exports.getFormById = (id) => {
    return request({
        url: `https://www.formstack.com/api/v2/form/${id}.json`,
        headers: headers,
        accept: 'application/json',
        "Content-Type": 'application/json'
    }).then((res) => JSON.parse(res))
      .catch((err) => err)
}

exports.getAllForms = () => {
    return request({
        url: `https://www.formstack.com/api/v2/form.json`,
        headers: headers,
        accept: 'application/json',
        "Content-Type": 'application/json'
    }).then((res) => JSON.parse(res))
      .catch((err) => err)
}

exports.postFormById = (id, data) => {
    return request({
        url:`https://www.formstack.com/api/v2/form/${id}/submission.json`,
        body: data,
        headers: postHeader,
        method: "POST"
    }).then((res) => JSON.parse(res))
      .catch((err) => err)
}

