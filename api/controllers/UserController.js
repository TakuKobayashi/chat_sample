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
    }
};

