/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res) {
  	console.log(req.allParams());
  	console.log(req.socket);
    Room.findOne({id: req.param('room_id')}).exec(function(err, room){
      Comment.find().where({roomId: req.param('room_id')}).exec(function(err, comments){
        //User.subscribe(req.socket);
        //Commentの更新を通知するためにsubscribeを追加
        Comment.subscribe(req.socket);
        res.json(comments);
      });
    });
  },
  create: function(req, res){
  	//console.log(req.allParams());
    Comment.create({userId: req.param('user_id'), roomId: req.param('room_id'), message: req.param('message')}).exec(function(err, comment){
      Comment.publishCreate(comment);
      res.json(comment)
    });
  }
};

