var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('socket', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    connectionType: { type: 'string', notNull: true},
    connectionId: { type: 'int', notNull: true},
    socketId: { type: 'string', notNull: true},
    updatedAt: 'datetime',
    createdAt: 'datetime'
  }, function(){
    db.addIndex('socket', 'socket_connection_type_id_index', ['connectionType', 'connectionId'], function(){
      db.addIndex('socket', 'socket_connection_id_index', 'socketId', callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('socket', callback);
};
