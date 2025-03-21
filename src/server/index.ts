import osc from 'osc';
import express from 'express';
import {
  API_PORT,
  OSC_LISTEN_PORT,
  OSC_SEND_PORT,
  OSC_SERVER_HOST,
} from '../constant';
import { ApplicationRouter } from './live/application';

const app = express();

app.use('/live', ApplicationRouter);

export function startServer() {
  app.listen(API_PORT, () =>
    console.log(`API Start running on http://localhost:${API_PORT}`),
  );
}
