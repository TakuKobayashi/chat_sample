var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('apiChatSingle', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    userId: { type: 'int', notNull: true},
    message: 'string',
    updatedAt: 'datetime',
    createdAt: 'datetime'
  }, function(){
    db.addIndex('apiChatSingle', 'comment_user_id_index', 'userId', callback);
  });
};

exports.down = function(db, callback) {
  db.dropTable('apiChatSingle', callback);
};
