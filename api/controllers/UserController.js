/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req,res) {
    // This will render the view: /path/to/chat_sample/views/user/index.ejs
    //res.send( 'Hello Sails!!!' );
    res.view({ hello: req.ip });
  },

  create: function (req,res) {
    var params = {name: req.param('name')};
    var model = User.findOne(params).exec(function(err, user){
      if(user){
        res.redirect("/room/?user_id=" + user.id);
        return;
      } else {
        User.create(params).exec(function(err, user){
          res.redirect("/room/?user_id=" + user.id);
          return;
        });
        return;
      }
    });
  }
};

