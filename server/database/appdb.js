/**
 * Created by Administrator on 2017/8/8.
 */
var mongoose = require('mongoose');
var config = require("../config/config")
// 引入 mongoose 模块
mongoose.connect(config.mongodb.url+"/appdb", {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("MongoDB Opened!");
});

var userSchema = new mongoose.Schema({
  LOGIN_NAME: String,
  SIGN: String,
  SESSION_ID: String,
  CUST_ID: String,
  SID: String,
  SYSTEM_TYPE: String
},{collection:"app_user_session"});

var User = mongoose.model('app_user_session', userSchema);
var thunkify = require('thunkify');

var findOne = thunkify(function () {
  User.findOne.apply(User, arguments)
});

module.exports = {
  findOneBySign: function* (jsondata){
    if(config.env="local"){
      console.log("Start to invoke mongodb : " ,"app_user_session")
      console.log("Invoke mongodb data is : ", jsondata);
    }else if(config.debug){
      self.logger.request("Start to invoke mongodb : " ,"app_user_session");
      self.logger.request("Invoke mongodb data is : ", jsondata);
    }
    try {
      var user = yield findOne(jsondata);
      if(config.env="local"){
        console.log("Finish to invoke mongodb : ", "app_user_session");
        console.log("Invoke mongodb data is : ", user);
      }else if(config.debug){
        self.app.logger.request("Finish to invoke mongodb : ", "app_user_session");
        self.app.logger.request("Invoke mongodb data is: ", user);
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}
