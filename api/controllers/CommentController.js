/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    console.log(req.allParams);
    User.findOne({id: req.param('user_id')}).exec(function(err, user){
      Room.findOne({id: req.param('room_id')}).exec(function(err, room){
        Comment.find().where({roomId: req.param('room_id')}).exec(function(err, comments){
          console.log(comments);
          res.view({user: user, room: room, comments: comments});
        });
      });
    });
  }
};

