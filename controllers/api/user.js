const auth0 = require('../../controllers/util/auth0');
const getUserDeets = require('../../controllers/util/auth0');

exports.getAuthToken = (req, res) => {
    let userToken = ``;
    let token = getUserDeets.returnUserToken();
    token.then((data) => {
        let token = data;
        return token;
    }).then((token) => {
        res.json(token);
    });
};

exports.getUserProfile = (req, res) => {
    let email = req.params.userId;
    let userProfile = getUserDeets.getUserProfile2(email);
    userProfile.then((res) => {
        console.log(res);
        let data = res;
        return data;
    }).then((data) => {
        res.json(data);
    });
};

