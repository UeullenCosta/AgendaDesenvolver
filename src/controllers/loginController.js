const {Users, Cadastros} = require('../models/UsersModel');
//rota get
exports.index = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  try {
    const user = new Cadastros(req.body); 
    await user.buscaUsurario();
    console.log(user)
    if(user.errors.length > 0){
      req.flash('errors', user.errors);
      req.session.save(function() {
        return res.redirect('back');
      });
      return;
    };
    req.session.user = user.user;
    req.session.save(function() {
      return res.redirect('/agenda');});

  } catch (error) {
    console.log(error);
    
    res.render('404')

    
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}