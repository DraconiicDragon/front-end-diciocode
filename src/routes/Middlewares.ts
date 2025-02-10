// Deixa passar se o usuário está logado
export function checkIfLoggedIn (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect("/auth/login");
    }
}

// Não deixa passar se o usuário está logado
export function bypassLogin (req, res, next) {
    if(req.session.user) {
        res.render("home");
    } else {
        next();
    }
}

export function checkIfAdmin(req, res, next) {
    if(req.session.user.id_role == 1) {
        next();
    } else {
        res.status(403).json({ error: "Sem permissão" });
    }
}

export function checkIfSameUser(req, res, next) {
    const id_user = req.params.id;
    if(req.session.user.id_user == id_user) {
        next();       
    } else {
        res.status(403).json({ error: "Sem permissão" });
    }
}
