import GitRepo from 'git-repository';

import run from './run';
import clean from './clean';
import bundle from './bundle';
import fs from './lib/fs';
import pkg from '../package.json';

const remote = {
  name: 'production',
  url: 'https://git.heroku.com/efx-sudoku.git',
  branch: 'master',
};

async function deploy() {
  await run(clean);

  const repo = await GitRepo.open('dist', { init: true });
  await repo.setRemote(remote.name, remote.url);
  const isRefExists = await repo.hasRef(remote.url, remote.branch);
  if (isRefExists) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/${remote.branch}`, { hard: true });
    await repo.clean({ force: true });
  }

  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  process.argv.push('--release');
  await run(bundle);
  await fs.writeFile('./dist/package.json', JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      start: 'node server.js',
    },
  }, null, 2));


  // Push the contents of the build folder to the remote server via Git
  await repo.add('--all .');
  await repo.commit(`Update ${new Date().toISOString()}`);
  await repo.push(remote.name, `master:${remote.branch}`);
}

export default deploy;
