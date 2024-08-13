const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { async } = require('regenerator-runtime');
const { login } = require('../controllers/loginController');


const UserSchema = new mongoose.Schema({
  nome: {type: String, require: true},
  senha: {type: String, require: true},
  cpf: {type: String, require: true},
  especialidade: {type: String, require: true},
});

const UsersModel = mongoose.model('User', UserSchema);


class Users {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate()
    if(this.errors.length > 0) return;
    await this.agendamentoExiste();

    if(this.errors.length > 0) return;

      const salt = bcryptjs.genSaltSync();
      this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

      //REGISTRANDO USUARIO NA BASE
      this.user = await UsersModel.create(this.body);

  }
  async agendamentoExiste(){
    const agendamento = await UsersModel.findOne({ cpf: this.body.cpf});

      if(agendamento){
        this.errors.push("Ja existe um registro com esse cpf");
        return;
      }
      return;
    }

  validate() {
    this.cleanData()
    const name = this.body.nome.toUpperCase()
    this.body.nome = name;

    if(this.body.cpf.length != 11) this.errors.push('CPF invalido');
  }

  cleanData() {
    for(let key in this.body){
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      nome: this.body.nome+ ' '+ this.body.sobrenome,
      cpf: this.body.cpf,
      senha: this.body.cpf,
      especialidade: this.body.especialidade
    }
  }
}
class Cadastros{
    constructor(usuario){
      this.body = usuario;
      this.errors = [];
      this.user = null;
    }
    async buscaUsurario() {
      this.validate()

      this.user = await UsersModel.findOne({cpf: this.body.usuario});
      if(!this.user){
        this.errors.push("Usuario não existe");
        return;
      };
      console.log(`cheguei aqui ${this.errors.length}`)
      
      if(!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
        this.errors.push("Senha invalida");
        this.user = null;
        return;
      }}
      validate() {
        this.cleanData()
        if(!this.body)this.errors.push("Usuário ou senha invalidos");
        if(this.body.usuario.length != 11)this.errors.push("Usuário ou senha invalidos");
        if(this.body.senha.length != 11)this.errors.push("Usuário ou senha invalidos");
      }
    
      cleanData() {
        for(let key in this.body){
          if(typeof this.body[key] != 'string') {
            this.body[key] = '';
          }
        }
        this.body = {
          usuario: this.body.usuario,
          senha: this.body.senha,
        }
;
      }
        
        
}

module.exports = {Users, Cadastros};


