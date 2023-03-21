import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import connectDb from './db/config.js';
import dotenv from 'dotenv';
import session from 'express-session';
import logout from './routes/logout.js';
import order from './routes/api/order.js';
import requireLogin from './midlewares/isLoging.js';
// api
import loginRoutes from './routes/loginRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
const app = express();
dotenv.config();

connectDb();

// utilisation de template engine
app.set('view engine', 'pug');
app.set('views', 'template');
app.use(
  session({
    secret: 'dev restaurant',
    resave: true,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use('/api/orders', order);

// lecture de fichier static
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

// midleware

app.use('/connexion', loginRoutes);
app.use('/inscription', registerRoutes);
app.use('/logout', logout);
// app.use('/logout', logout);

// Route pour la page de connexion
// app.get('/connexion', (req, res) => {
//   res.status(200).render('login');
// });
// Route pour la page inscription
// app.get('/inscription', (req, res) => {
//   const payload = {
//     pageTitle: 'Accueil',
//     userLoggedIn: req.session.user,
//     userLoggedInjs: JSON.stringify(req.session.user),
//   };
//   res.status(200).render('register', payload);
// });

// Route pour la page booking
app.get('/reservation', (req, res) => {
  const payload = {
    pageTitle: 'Accueil',
    userLoggedIn: req.session.user,
    userLoggedInjs: JSON.stringify(req.session.user),
    successMessage: req.session.successMessage,
    // delete: delete req.session.successMessage,
  };

  res.status(200).render('booking', payload);
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
  const payload = {
    pageTitle: 'Accueil',
    userLoggedIn: req.session.user,
    userLoggedInjs: JSON.stringify(req.session.user),
  };
  res.status(200).render('home', payload);
});

// Route pour la page booking
app.get('/dashboard', requireLogin, (req, res) => {
  const payload = {
    pageTitle: 'Tableau de bord',
    userLoggedIn: req.session.user,
    userLoggedInjs: JSON.stringify(req.session.user),
  };
  res.status(200).render('BookingList', payload);
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Le serveur est démarré sur le port 3000.');
});
