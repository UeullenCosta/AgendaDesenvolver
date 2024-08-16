const {Users} = require('../models/UsersModel');
//rota get
exports.index = (req, res) => {
  res.render('cadastro')
}



//rota post
exports.registerUser = async (req, res) => {

  try {
    const userModel = new Users(req.body); 
    await userModel.register();

    if(userModel.errors.length > 0){
      req.flash('errors', userModel.errors);
      req.session.save(function() {
        return res.redirect('back');
      });
      return;
    };
    req.flash('success', 'Cadastro realizado com sucesso');
    return res.redirect('back');
  } catch (error) {
    res.render('404')
    console.log(error);
    
  }
}
