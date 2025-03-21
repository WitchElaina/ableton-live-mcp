/**
 * This file is used to warp OSC UDPPort in a way that is easier to use.
 */
import { UDPPort } from 'osc';
import {
  OSC_LISTEN_PORT,
  OSC_REQUEST_TIMEOUT,
  OSC_SEND_PORT,
  OSC_SERVER_HOST,
} from '../constant';

export const makeOSCRequest = (path: string, data: string[]) => {
  return new Promise((resolve, reject) => {
    const OSCListener = new UDPPort({
      localAddress: OSC_SERVER_HOST,
      localPort: OSC_LISTEN_PORT,
    });

    OSCListener.on('message', (oscMsg: any) => {
      resolve(oscMsg);
      console.log('RES', oscMsg);
      OSCListener.close();
    });

    OSCListener.on('error', (error: any) => {
      reject(error);
      OSCListener.close();
    });

    OSCListener.open();

    const msg = {
      address: path,
      args: data.map((arg) => ({ type: 's', value: arg })),
    };
    OSCListener.send(msg, OSC_SERVER_HOST, OSC_SEND_PORT);
  });
};

(async () => {
  // this is a test to see if the server is running
  await makeOSCRequest('/live/test', []);
  await makeOSCRequest('/live/application/get/version', []);
  await makeOSCRequest('/live/api/get/log_level', []);
  await makeOSCRequest('/live/song/get/num_tracks', []);
  await makeOSCRequest('/live/song/get/track_names', []);
})();
