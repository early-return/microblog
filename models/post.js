var db = require('./db');

db.run('create table if not exists posts(user text not null, post text not null, time);');

function Post(username, post, time) {
  this.user = username;
  this.post = post;
  if (time) {
    this.time = time;
  } else {
    this.time = new Date();
  }
};
module.exports = Post;

Post.prototype.save = function save(callback) {
  var post = {
    user: this.user,
    post: this.post,
    time: this.time,
  };

  db.run('insert into posts values(?, ?, ?);', [post.user, post.post, post.time], function(err){
    console.log(err);
    return callback(err);
  });
}

Post.get = function get(username, callback) {
  console.log(username);
  if(username){
    var sql = 'select * from posts where user="'+username+'" order by time desc;';
  } else {
    var sql = 'select * from posts order by time desc;';
  }
  db.all(sql, function(err, rows){
    if(err){
      return callback(err);
    }
    if(!rows){
      return callback(null, null);
    }
    callback(null, rows);
  });
}
