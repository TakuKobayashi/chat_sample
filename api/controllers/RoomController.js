/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req,res) {
    User.findOne({id: req.param('user_id')}).exec(function(err, user){
      var page = req.param('page') || 1;
      Room.find().paginate({page: page, limit: 10}).exec(function(err, rooms){
        res.view({rooms: rooms, user: user, page: page});
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