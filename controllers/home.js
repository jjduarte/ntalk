module.exports = function (app) {
    var Usuario = app.models.usuario;

    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        }, 
        login: function (req, res) {
            // valida nome e email
            var email = req.body.usuario.email, 
                nome = req.body.usuario.nome;

            var query = {email: email};
            Usuario.findOne(query)
                .select('nome email')
                .exec(function (erro, usuario) {
                    if (usuario) {
                        req.session.usuario = usuario;
                        res.redirect('/contatos');
                    } else {
                        var usuario = req.body.usuario;
                        Usuario.create(usuario, function (erro, usuario) {
                            if (erro) {
                                res.redirect('/');
                            } else {
                                req.session.usuario = usuario;
                                res.redirect('/contatos');
                            }
                        });
                    }
                });
        },
        logout: function (req, res) {
            // chama req.session.destroy()
            req.session.destroy();
            res.redirect('/');
        }

    };
    return HomeController;
};