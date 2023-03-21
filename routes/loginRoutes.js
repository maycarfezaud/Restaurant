import express from 'express';
const app = express();
const router = express.Router();
import User from '../models/userModels.js';
import bodyParser from 'body-parser';

app.set('view engine', 'pug');
app.set('views', 'template');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  const payload = {
    pageTitle: 'Tableau de bord',
    userLoggedIn: req.session.user,
    userLoggedInjs: JSON.stringify(req.session.user),
  };
  res.status(200).render('login', payload);
});

router.post('/', async (req, res, next) => {
  const payload = req.body;

  try {
    const { email, password } = req.body;
    console.log(payload);

    const user = await User.findOne({ email });

    if (user && (await user.MatchPassword(password))) {
      req.session.user = user;
      return res.redirect('/');
    }

    if (user === null) {
      payload.errorMessage = `mot de passe ou addresse email incorrect`;
      return res.status(200).render('connexion', payload);
    }
  } catch (error) {
    payload.errorMessage = `Ooof une erreur s'est produite`;
    return res.status(200).render('connexion', payload);
  }
});

export default router;
