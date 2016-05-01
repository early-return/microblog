var db = require('./db');

db.run('create table if not exists users(name text primary key, password text, face text, email text);');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.face = user.face;
  this.email = user.email;
};
module.exports = User;

User.prototype.save = function save(callback) {
  var user = {
    name: this.name,
    password: this.password,
    face: this.face,
    email: this.email,
  };
  
  db.run('insert into users values(?, ?, ?, ?);', [user.name, user.password, user.face, user.email], function(err) {
    return callback(err);
  });
}
  
User.get = function get(username, callback) {
  db.get('select * from users where name=?;', username, function(err, row) {
    if(err){
      return callback(err);
    }
    if(row){
      var user = new User(row);
      return callback(err, user);
    }
    callback(err, null);
  })
}


