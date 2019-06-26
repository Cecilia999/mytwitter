const objectId = require("mongodb").ObjectID;

module.exports = function makeDataStuff(db) {
  const TwitsRef = db.model("Twits");
  const UserRef = db.model("Users");
  
  return {
    saveTwit: function(twitObject) {
      return TwitsRef.insertOne(twitObject).exec();
    },
    
    getAllTwits: function() {
      return TwitsRef.find()
        .sort({ created_at: -1 })
        .exec();
    },
    
    createUser: function(newUser) {
      console.log(UserRef.findOne({name: newUser.name}));
      return UserRef.findOne({name: newUser.name}) == {} ?  false :  UserRef.insertOne(newUser).exec();
    },

    findUser: function(userName){
      return UserRef.findOne({name: userName}) != {} ?  UserRef.findOne({name: userName}):  false;
    }


  };
};
