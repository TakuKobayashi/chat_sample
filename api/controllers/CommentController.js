/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res){
    console.log(req.socket.id);
    Comment.create({userId: req.param('user_id'), roomId: req.param('room_id'), message: req.param('message')}).exec(function(err, comment){
      //req.socket.emitだとリクエストがあったユーザーのみにsocketを送られる
      //sails.io.socketsで受信イベントを設定している人全員にsocketが送られる
      sails.io.sockets.to(req.param('room_id')).emit("comment", comment);
      /*
      Socket.find().where({connectionType: "Room", connectionId: comment.roomId}).exec(function(err, models){
        console.log(models);
        console.log(models.map(function(s){ return s.socketId; }));
        if (err) {return res.serverError();}
        sails.io.sockets.socket(models.map(function(s){ return s.socketId; })).emit("comment", comment);
      });
      */
    });
  },

};

