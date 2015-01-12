var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('comment', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    room_id: { type: 'int', notNull: true},
    user_id: { type: 'int', notNull: true},
    comment: 'string',
    updatedAt: 'datetime',
    createdAt: 'datetime'
  }, function(){
    db.addIndex('comment', 'comment_room_id_index', 'room_id', function(){
      db.addIndex('comment', 'comment_user_id_index', 'user_id', callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('comment', callback);
};
