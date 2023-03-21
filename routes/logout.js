import express from 'express';
const app = express();
const router = express.Router();
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/connexion');
    });
  }
});

export default router;
