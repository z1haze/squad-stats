import { initSentry } from './util/sentry';

initSentry();

import updater from './updater';
import bot from './bot';

(async () => {
  await updater.init();
  await bot.init();

  console.log('Process initialized.')
})();
