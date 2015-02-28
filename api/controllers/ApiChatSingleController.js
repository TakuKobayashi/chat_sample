/**
 * ApiChatSingleController
 *
 * @description :: Server-side logic for managing Apichatsingles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res){
  	User.findOne({name: req.param('name')}).exec(function(err, user){
      ApiChatSingle.create({userId: user.id, message: req.param('message')}).exec(function(err, api_chat_single){
        //req.socket.emitだとリクエストがあったユーザーのみにsocketを送られる
        sails.io.sockets.emit("comment", {userId: user.id, user_name: user.name, message: api_chat_single.message});
      });
    });
  }
};

