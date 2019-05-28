import user from './user';
import * as express from 'express';
import items from './items';

const app = express();

user(app);
items(app);

export default app;