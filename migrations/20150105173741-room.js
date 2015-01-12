var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('room', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: { type: 'int', notNull: true},
    name: 'string',
    updatedAt: 'datetime',
    createdAt: 'datetime'
  }, function(){
    db.addIndex('room', 'room_user_id_index', 'user_id', callback);
  });
};

exports.down = function(db, callback) {
  db.dropTable('room', callback);
};
