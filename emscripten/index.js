#! /usr/bin/env node

const argv = process.argv;
const path = require('path');

function guide(argument) {
  console.log('\nAvailable commands: install, build, version\n Docs: https://github.com/raphamorim/wasm')
}

if (argv.length < 2) {
  guide();
}

const command = argv[2];
switch (command) {
  case 'install':
    require('./install')(process.cwd());
    break;

  case 'build':
    if (!argv[3] || !argv[4] || !argv[5]) {
      const pkgPath = path.resolve(process.cwd(), 'emscripten.config.js');
      console.log('loading from ' + pkgPath);
      const build = require('./build');
      const files = require(pkgPath).forEach(file => {
        build(process.cwd(), file.input, file.functions, file.output)
      })

      return 0;
    }

    require('./build')(process.cwd(), argv[3], argv[4], argv[5])
    break;

  case 'version':
    const pck = require('./package.json');
    console.log('CLI Version: ' + pck.version);
    console.log('Emscripten Version: ' + pck.emscripten);
    break;

  default:
    guide();
}
