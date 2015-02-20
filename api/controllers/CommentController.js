/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res) {
    Comment.watch(req.socket);
  },
  create: function(req, res){
    Comment.create({userId: req.param('user_id'), roomId: req.param('room_id'), message: req.param('message')}).exec(function(err, comment){
      sails.io.sockets.emit("comment", comment);
    });
  }
};

