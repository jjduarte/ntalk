module.exports = function (app) {
    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        }, 
        login: function (req, res) {
            // valida nome e email
            var email = req.body.usuario.email, 
                nome = req.body.usuario.nome;

            //se passou na validacao armazena em req.session.usuario
            if(email && nome) {
                var usuario = req.body.usuario;
                //insere no array de contatos
                usuario['contatos'] = [];
                req.session.usuario = usuario;
                res.redirect('/contatos');
            } else {
                res.redirect('/');
            }
            //redireciona para a rota de contatos
        },
        logout: function (req, res) {
            // chama req.session.destroy()
            req.session.destroy();
            res.redirect('/');
        }

    };
    return HomeController;
};