/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req,res) {
    User.findOne({id: req.param('user_id')}).exec(function(err, user){
      var roomId = req.param('id');
      if(req.param('id')){
        Room.findOne({id: req.param('id')}).exec(function(err, room){
          Comment.find().where({roomId: req.param('id')}).exec(function(err, comments){
            //User.subscribe(req.socket);
            //Commentの更新を通知するためにsubscribeを追加
            res.view("room/show.ejs", {user: user, room: room, comments: comments});
          });
        });
      }else{
        var page = req.param('page') || 1;
        Room.find().paginate({page: page, limit: 10}).exec(function(err, rooms){
          res.view({rooms: rooms, user: user, page: page});
        });
      }
    });
  },
  show: function (req,res) {
    User.findOne({id: req.param('user_id')}).exec(function(err, user){
      console.log(req.allParams());
      Room.findOne({id: req.param('id')}).exec(function(err, room){
        Comment.find().where({roomId: req.param('id')}).exec(function(err, comments){
            Comment.subscribe(req.socket);
            //Commentの更新を通知するためにsubscribeを追加
            res.view({user: user, room: room, comments: comments});
        });
      });
    });
  },
  new: function (req,res) {
    User.findOne({id: req.param('user_id')}).exec(function(err, user){
      res.view({user: user});
    });
  },
  create: function (req,res) {
    User.findOne({id: req.param('user_id')}).exec(function(err, user){
      Room.create({userId: req.param('user_id'), name: req.param('name')}).exec(function(err, room){
        res.redirect("/room/?user_id=" + req.param('user_id'));
      });
    });
  }
};