function Build(rootPath, filePath = '', exportedFunctions, output) {
  const path = require('path');
  const fs = require('fs');
  const { spawn } = require('child_process');

  // exported_functions: `['_doubler']`
  const child = spawn(`emcc ${filePath} -Os -s WASM=1 -s SIDE_MODULE=1 -s EXPORTED_FUNCTIONS="${exportedFunctions}" -o ${ output || filePath.split('.')[0] + '.wasm' }`, {
    shell: true,
    cwd: rootPath
  });

  child.stdout.setEncoding('utf8');

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

module.exports = Build;
