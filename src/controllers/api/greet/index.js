import express from 'express';

import greeting from '../../../common/greeting';

var router = express.Router();


router.get('/', (req, res, next) => {
  var name = req.query.name;
  res.send(greeting(name));
});


export default router;
