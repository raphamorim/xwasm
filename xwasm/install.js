function InstallEmscripten(rootPath) {
  const path = require('path');
  const fs = require('fs');
  const { spawn, execSync } = require('child_process');

  console.log('Installing SDK in:', process.cwd())

  // emscripten/scripts/install_emscripten.sh (DEBUG/DEV cases only)
  const scriptPath = fs.existsSync(
    path.resolve(rootPath, './scripts/install_emscripten.sh')
  ) ? path.resolve(rootPath, './scripts/install_emscripten.sh') :
      path.resolve(rootPath, './emscripten/scripts/install_emscripten.sh')

  const child = spawn(`sh ${scriptPath}`, {
    shell: true,
  });

  child.stdout.setEncoding('utf8');

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('close', (code) => {
    console.log(`[emscripten] process exited with code ${code}`);
  });
}

module.exports = InstallEmscripten;
