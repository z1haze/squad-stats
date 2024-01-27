import { initSentry } from './util/sentry';

initSentry();

import updater from './updater';
import bot from './bot';

(async () => {
  const promises = [updater.init(), bot.init()];

  await Promise.all(promises);

  console.log('Process initialized.')
})();
