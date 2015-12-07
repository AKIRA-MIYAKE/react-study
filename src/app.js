import express from 'express';

import setupExpress from './setup/express';


var app = express();
setupExpress(app);


export default app;
