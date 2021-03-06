module.exports = (app) => {
    var db = require('../libs/db_connect')()
      , Schema = require('mongoose').Schema
      ;

    var contato = Schema({
        nome: String, 
        email: String
    });

    var usuario = Schema({
        nome: {type: String, required: true},
        email: {type: String, required: true, index: {unique: true}},
        contatos: [contato]
    });

    return db.model('usuarios', usuario);
};