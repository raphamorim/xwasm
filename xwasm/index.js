#! /usr/bin/env node

const argv = process.argv;
const path = require('path');

function guide() {
  console.log('\nAvailable commands: install, build, version\n Docs: https://github.com/raphamorim/wasm')
}

if (argv.length < 2) {
  guide();
}

const command = argv[2];
const pck = require('./package.json');

switch (command) {
  case 'install':
    require('./install')(process.cwd());
    break;

  case 'build':
    if (!argv[3] || !argv[4] || !argv[5]) {
      const pkgPath = path.resolve(process.cwd(), 'xwasm.config.js');
      console.log('loading from ' + pkgPath);
      const build = require('./build');
      const files = require(pkgPath).forEach(file => {
        build(process.cwd(), file.input, file.functions, file.output)
      })

      return 0;
    }

    require('./build')(process.cwd(), argv[3], argv[4], argv[5])
    break;

  case 'check':
    console.log('Emscripten Version: ' + pck.emscripten);
    break;

  case 'version':
    console.log('CLI Version: ' + pck.version);
    break;

  default:
    guide();
}
