import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { once } from 'lodash';

import run from './run';
import bundle from './bundle';
import clean from './clean';
import server from './server';
import { serverConfig, clientConfig } from './webpack.config';

async function start() {
  await run(clean);
  await run(bundle.bind(undefined, serverConfig));

  const bundler = webpack(clientConfig);
  const wpMiddleware = webpackMiddleware(bundler, {
    publicPath: clientConfig.output.publicPath,
    stats: clientConfig.stats,
  });
  const hotMiddleware = webpackHotMiddleware(bundler);

  bundler.plugin('done', once(async () => {
    const host = await server();
    const bs = Browsersync.create();
    bs.init({
      proxy: {
        target: host,
        middleware: [wpMiddleware, hotMiddleware],
        proxyOptions: {
          xfwd: true,
        },
      },
    });
  }));
}

export default start;
