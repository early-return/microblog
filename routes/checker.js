exports.login = function login(req, res, next) {
  if(!req.session.user){
    req.flash('error', '该页面需要登录后才能访问！');
    return res.redirect('/login');
  }
  next();
}

exports.notLogin = function notLogin(req, res, next) {
  if(req.session.user){
    req.flash('error', '你已经登录过了');
    return res.redirect('/');
  }
  next();
}