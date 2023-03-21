import express from 'express';
const app = express();
const router = express.Router();
import bodyParser from 'body-parser';
import User from '../models/userModels.js';

app.set('view engine', 'pug');
app.set('views', 'template');

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  const payload = {
    pageTitle: 'Tableau de bord',
    userLoggedIn: req.session.user,
    userLoggedInjs: JSON.stringify(req.session.user),
  };
  res.status(200).render('register', payload);
});

router.post('/', async (req, res) => {
  console.log('===', req.body);

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const payload = req.body;

  try {
    if (username && email && password) {
      const existUser = await User.findOne({ email });

      if (existUser) {
        payload.errorMessage = 'Addresse email déja utilisé';
        res.status(200).render('register', payload);
      } else {
        const user = await User.create({
          username,
          email,
          password,
        });

        if (user) {
          req.session.user = user;
          return res.redirect('/');
        }
      }
    } else {
      payload.errorMessage = 'Vous devez remplir correctement tous les champs';
      res.status(200).render('register', payload);
    }
  } catch (error) {
    console.log(error);
    payload.errorMessage = 'Vous devez remplir correctement tous les champs';
    res.status(200).render('register', payload);
  }

  //   res.status(200).render('login');
});

export default router;
