import main from '../controllers/main';


export default function setup(app, passport, authorization) {

  // API controllers is placed under "/api"

  app.use('*', main);

}
