import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import DatasRoute from '@routes/data.route';
import PivotRoute from './routes/pivot.route';
// import { logger } from './utils/logger';
// import fs from 'fs';
// import validateEnv from '@utils/validateEnv';
// validateEnv();
const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new DatasRoute(), new PivotRoute()]);

app.listen();
