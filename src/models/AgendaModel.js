const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');


const Agendachema = new mongoose.Schema({
  data: {type: Date, require: true},
  horario: {type: String, require: true},
  nome: {type: String, require: true},
  terapeuta: {type: String, require: true},
  convenio: {type: String, require: true},
  status: {type: String, require: true}
});

const AgendaModel = mongoose.model('Agenda', Agendachema);


class Agenda {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.Agenda= null;

  };

  async updateAgendamento(id){
    this.validate()
    if(this.errors.length > 0) return;
    this.Agenda = await AgendaModel.findByIdAndUpdate(id, this.body, {new: true})
  };
 
  async register() {
    this.validate();
    if(this.errors.length > 0) return;
    await this.agendamentoExiste();
    if(this.errors.length > 0) return;
    this.Agenda = await AgendaModel.create(this.body);
  }

  async agendamentoExiste(){
    const agendamento = await AgendaModel.find({ terapeuta: this.body.terapeuta});

    agendamento.forEach(item => {
      const dbdata = String(item.data)
      const horario = item.horario
      if(dbdata == this.body.data && this.body.horario == horario){
        this.errors.push("O terapeuta já tem um agendamento para este horario");
        return;
      }
      return;
    })};

  validate () {
    this.datasPost();
    this.cleanData();
    const name = this.body.nome.toUpperCase()
    
    this.body.nome = name;
    if(this.body.nome.length < 5) this.errors.push('O nome inserido é muito curto');
  };

  datasPost(){
    const hoje = new Date().toLocaleDateString()
    const dataAgendamento = new Date(this.body.data).toLocaleDateString()
    if(hoje > dataAgendamento) this.errors.push("O agendamento deve ter uma data igual ou posterior a data de hoje")
  };

  cleanData() {
    for(let key in this.body){
      if(typeof this.body[key] != 'string') {
        this.body[key] = '';
      }
      
    };
   
    
    this.body = {
      data: new Date(`${this.body.data} ${this.body.horario}`),
      horario: this.body.horario,
      nome: this.body.nome,
      terapeuta: this.body.terapeuta,
      convenio: this.body.convenio,
      status: "Aguardando"
    };
  };


}
class test{
  constructor() {
    this.errors = [];
    this.Agenda= null;

  };

  async listaAgendamentos(){
    let agenda = await AgendaModel.find()
      .sort({data: 1})
  
    const hoje = new Date().toLocaleDateString()
    let lista = []

      for(let c in agenda){
        const keys = agenda[c]
        let dataLista = new Date(keys.data).toLocaleDateString()
        if(dataLista >= hoje){
          lista.push({
            data: dataLista,
            nome: keys.nome,
            horario: keys.horario,
            terapeuta: keys.terapeuta,
            convenio: keys.convenio,
            status: keys.status,
            id: keys._id
          });
        }};
          
    return lista
  }
  async buscaAgendamento(id){
    const agendamento = await AgendaModel.findById({_id: id})
    return agendamento;
  };

  async statusAgendamento(id, status){
    const body = await this.buscaAgendamento(id)
    body.status = status
    this.Agenda = await AgendaModel.findByIdAndUpdate(id, body, {new: true})
  }




}
module.exports = { Agenda, test};

