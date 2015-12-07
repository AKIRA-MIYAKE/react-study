import express from 'express';

var router = express.Router();


router.get('/', (req, res, next) => {
  res.render('home/index', {
    title: 'Nodeyard',
    initialData: JSON.stringify({ fizz: 'bazz' })
  });
});


export default router;
