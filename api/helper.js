

const friendModel = require('./models/Friend');

// handler for helper functions
const helperFunctions = {
    saveFriendList: function (id) {
        return new Promise(function (resolve, reject) {
            let friendObj = { profile_id: id };
            let newFriend = new friendModel(friendObj);
            newFriend.save(friendObj, (error, response) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
        })
    }
}


module.exports = {
  helperFunctions
}
