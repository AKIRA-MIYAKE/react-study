import home from '../controllers/render/home';

import greet from '../controllers/api/greet';


export default function setup(app, passport, authorization) {

  app.use('/', home);

  // API controllers is placed under "/api"
  app.use('/api/greet', greet);

}
