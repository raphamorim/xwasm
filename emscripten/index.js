#! /usr/bin/env node

const argv = process.argv;

function guide(argument) {
  console.log('\nAvailable commands: install, build, version\n Docs: https://github.com/raphamorim/wasm')
}

if (argv.length < 2) {
  guide();
}

const command = argv[2];
switch (command) {
  case 'install':
    require('./install')();
    break;

  case 'version':
    const pck = require('./package.json');
    console.log('CLI Version: ' + pck.version);
    console.log('Emscripten Version: ' + pck.emscripten);
    break;

  default:
    guide();
}
