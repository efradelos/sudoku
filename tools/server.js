import path from 'path';
import cp from 'child_process';
import { serverConfig } from './webpack.config';

const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;
const serverPath = path.join(serverConfig.output.path, serverConfig.output.filename);

let instance;

process.on('exit', () => {
  if (instance) {
    instance.kill('SIGTERM');
  }
});

async function server() {
  return new Promise((resolve) => {
    function onStdOut(data) {
      const time = new Date().toTimeString();
      const match = data.toString('utf8').match(RUNNING_REGEXP);

      process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
      process.stdout.write(data);

      if (match) {
        instance.stdout.removeListener('data', onStdOut);
        instance.stdout.on('data', x => process.stdout.write(x));
        resolve(match[1]);
      }
    }
    if (instance) {
      instance.kill('SIGTERM');
    }

    instance = cp.spawn('node', [serverPath], {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });

    instance.stdout.on('data', onStdOut);
    instance.stderr.on('data', x => process.stderr.write(x));
  });
}

export default server;
