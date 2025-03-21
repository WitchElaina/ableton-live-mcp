import express from 'express';
import { makeOSCRequest } from '../OSCListener';

export const ApplicationRouter = express.Router();

ApplicationRouter.get('/test', async (req, res) => {
  try {
    const oscMsg = await makeOSCRequest('/live/test');
    res.status(200).send(oscMsg);
  } catch (error) {
    res.status(500).send(error);
  }
});
