var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('comment', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    roomId: { type: 'int', notNull: true},
    userId: { type: 'int', notNull: true},
    message: 'string',
    updatedAt: 'datetime',
    createdAt: 'datetime'
  }, function(){
    db.addIndex('comment', 'comment_room_id_index', 'roomId', function(){
      db.addIndex('comment', 'comment_user_id_index', 'userId', callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('comment', callback);
};
