import express from 'express';
const app = express();
const router = express.Router();
import bodyParser from 'body-parser';
import Order from '../../models/orderModels.js';

app.set('view engine', 'pug');
app.set('views', 'template');

app.use(bodyParser.json());

router.post('/', async (req, res, next) => {
  const payload = req.body;
  try {
    if (!req.body.email || !req.body.nom) {
      res.sendStatus(400);
    }
    const { nom, email, plat, heure, date } = req.body;
    const oder = new Order({
      nom,
      email,
      plat,
      heure,
      date,
    });
    const oderSave = await oder.save();
    if (oderSave) {
      req.session.successMessage = 'Le formulaire a été soumis avec succès !';
      //   console.log(oderSave);
      res.redirect('/reservation');
    }
  } catch (error) {
    console.log(error);
  }
});

// router.post('/', async (req, res) => {
//   console.log('====>', req.body);
//   try {
//     if (!req.body.email || !req.body.nom) {
//       res.sendStatus(400);
//     }
//     const { nom, email, plat, heure, date } = req.body;

//     // const users = await User.findById(req.session.user._id).select('-password');

//     const oder = new Order({
//       user: req.session.user._id,
//       nom: req.session.user.nom,
//       email,
//       plat,
//       heure,
//       date,
//     });

//     const oderSave = await oder.save();
//     if (oderSave) {
//       const newOder = await oderSave.populate('user');
//       res.status(201).send(newOder);
//     }
//   } catch (error) {
//     console.log(error);
//     // res.sendStatus(400);
//   }
// });

router.get('/', async (req, res, next) => {
  try {
    const oder = await Order.find();
    if (oder) {
      res.status(200).send(oder);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const delet = await Order.findByIdAndDelete(req.params.id);

    if (delet) {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
