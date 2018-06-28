var connection = require('../db');
var userServices = module.exports = {};

userServices.findUser = function (userid, callback) {
    var resultData = {"success" : true, "message" : "All Users Data Fetched Successfully"};
    connection.query('SELECT * FROM wl_users WHERE usersId = ? OR email = ?', [userid, userid], function (err, result) {
        if (err) {
            resultData.success = false;
            resultData.message = "There was a database error when attempting to complete this action.";
            callback(resultData);
        }
        if(result && result.length > 0) {
            resultData.success = true;
            resultData.userData = result;
            callback(resultData);
        } else {
            resultData.success = false;
            resultData.message = "No User Exists";
            callback(resultData);
        }
    });
};