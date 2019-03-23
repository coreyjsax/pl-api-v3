const request = require('request-promise-cache');

let auth0Keys = {
    token2: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJESTRORE0zTlRkRVJUSTNSVVpGTnpSRU5VWkRNMFk0TTBOQk5ESTJRVUkxUXpsQ1FVSkZRZyJ9.eyJpc3MiOiJodHRwczovL3BpenphbHVjZS5hdXRoMC5jb20vIiwic3ViIjoiODRTejBXVFp5a2VjeVN2eWcwT2JvZmk5MlNaeXI2TFNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGl6emFsdWNlLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTUwMTAwNDU5LCJleHAiOjE1NTAxODY4NTksImF6cCI6Ijg0U3owV1RaeWtlY3lTdnlnME9ib2ZpOTJTWnlyNkxTIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.Z5AMAYoYyptANF-1IPRarW6S_xF7l4M5cpzg9--y5WvVXHp658DWRpfVZM02_tVXcRUV339hh6vOWbVXtSK_66pitC4Nc89gvONiUmyRidMm6sT_q2tIYYEvmSJkSn-KjeN6omGgwLTgiePg3_pc6NuvAn0Sfx4K-_A1U7hSsg5ez9p-Q_ksVqeiEgOklRRywKE_pSCL3eugtTfbQ3bQ0XwzgpB20KA-_ff-RggyhPw78rv4SlLDpyCiBi9u3nv0H_9A_y4reBWuDHySsqur0Csw4W7HAfuGc69ES8suL9ydPGV1xwj0f9EEZqRZ4CjFWv8J-DxeSwFHCBskDE63jQ'
}

exports.getAuth0token = () => {
    let options = {
        method: 'POST',
        url: 'https://pizzaluce.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: 
           { grant_type: 'client_credentials',
             client_id: process.env.AUTH0_CLIENT_ID,
             client_secret: process.env.AUTH0_CLIENT_SECRET,
             audience: 'https://pizzaluce.auth0.com/api/v2/' },
          json: true };
        
    return request(options)
}

exports.processToken = (tokenRes) => {
    let token = tokenRes.access_token;
    auth0Keys.token = token;
    return auth0Keys;
}


exports.getUserProfile = (userId) => {
   
    console.log(userId)
    console.log(auth0Keys.token)
    return request({
        url: `https://pizzaluce.auth0.com/api/v2/users/${userId}`,
        headers: {Authorization: auth0Keys.token}
    }).then((res) => {
        let user = JSON.parse(user);
        return user;
    }).catch((error) => {
        return error;
    })
}

exports.getUserProfile2 = (id, query) => {
    
    return request({
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users?${query}`,
        //qs: {user_id: `${id}`},
        headers: {
            Authorization: `Bearer ${auth0Keys.token}`
        }
    }).then((res) => {
        let user = JSON.parse(res);
        return user;
    }).catch((error) => {
        return error;
    })
}

exports.logOutUser = () => {
    return request({
        url: `${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}`,
        headers: {
            Authorization: `Bearer ${auth0Keys.token}`
        }
    });
}

exports.returnUserToken = () => {
    return exports.getAuth0token()
    .then(exports.processToken)
}

exports.returnUserToken();

