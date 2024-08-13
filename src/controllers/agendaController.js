
const {Agenda, test} = require('../models/AgendaModel'); 


exports.index = async(req, res) => {
  const lista = new test()
  let listaAgenda = await lista.listaAgendamentos();
  res.render('index', {listaAgenda});
};

exports.schedule = async (req, res) => {
  try {
    const agenda = new Agenda(req.body);
    await agenda.register();

    if(agenda.errors.length > 0){
      req.flash('errors', agenda.errors);
      req.session.save(function(){
      return res.redirect('back');
      });
      return;
    }else{
      req.flash('success', 'agendamento realizado com sucesso');
    return res.redirect('back');
  }
    
  } catch (error) {
    res.render('404')
    console.log(error);
    
  }
  
};

//EDITANDO AGENDAMENTO
exports.buscaId = async (req, res) => {
  // try {
    const agenda = new test();
    const agenamentoId = await agenda.buscaAgendamento(req.params.id);
    res.render('indexEdit', {agenamentoId})
};

exports.edit = async (req, res) => {
  try {
    const agendaUp = new Agenda(req.body)
    agendaUp.updateAgendamento(req.params.id);

    if(agendaUp.errors.length > 0){
      req.flash('errors', agendaUp.errors);
      req.session.save(function(){
      return res.redirect('back');
      });
      return;
    }else{
      req.flash('success', 'agendamento realizado com sucesso');
    return res.redirect('/agenda');
  }
    
  } catch (error) {
    res.render('404')
    console.log(error);
    
  }

};

exports.editStatus = async (req, res) => {
  try {
    const status = new test()
    status.statusAgendamento(req.params.id, req.params.status)
    return res.redirect('/agenda');
  } catch (error) {
    res.render('404')
    console.log(error);
    
  }}


