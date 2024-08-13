const express = require('express')
const path = require('path');
const router = express.Router();
const loginController = require('./src/controllers/loginController');
const agendaController = require('./src/controllers/agendaController');
const cadastroUsuarioController = require('./src/controllers/cadastroUsuarioControlle');
const {loginRequired }= require('./src/middlewares/middlewares')


router.get('/agenda', loginRequired, agendaController.index);
router.post('/agenda', loginRequired, agendaController.schedule);


//Cadastro de usuarios
router.get('/cadastroUsuario', cadastroUsuarioController.index);
router.post('/cadastroUsuario', cadastroUsuarioController.registerUser);

router.post('/login', loginController.login);
router.get('/', loginController.index);
router.get('/logout', loginController.logout);

router.get('/agenda/edit/:id', agendaController.buscaId);
router.post('/agenda/edit/:id', agendaController.edit)

router.get('/agenda/editStatus/:id/:status', agendaController.editStatus)

module.exports = router;