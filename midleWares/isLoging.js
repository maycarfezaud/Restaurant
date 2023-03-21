function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    // L'utilisateur est connecté, continuez avec la requête
    next();
  } else {
    // L'utilisateur n'est pas connecté, redirigez vers la page de connexion
    res.redirect('/connexion');
  }
}
export default requireLogin;
