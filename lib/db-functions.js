const objectId = require("mongodb").ObjectID;

module.exports = function makeDataStuff(db) {
  const TwitsRef = db.collection("twits");
  const UserRef = db.collection("users");
  const LikeRef = db.collection("likes");

  return {
    saveTwit: function(twitObject, cb) {
      TwitsRef.insertOne(twitObject, cb);
    },

    getAllTwits: function(cb) {
      TwitsRef.find()
        .sort({ created_at: -1 })
        .toArray(cb);
    },

    createUser: function(newUser, cb) {
      UserRef.insertOne(newUser);
    },

    findUser: function(userName, cb) {
      UserRef.findOne({ name: userName }, cb);
    },
    likeTwit: function(likeTwit_id, cb) {
      TwitsRef.findOne({ _id: objectId(likeTwit_id) }, (err, data) => {
        console.log(data);
        const newData = data;
        newData.likecount++;
        TwitsRef.updateOne({ _id: objectId(likeTwit_id) }, newData, null, cb);
      });
    }
  };
};
