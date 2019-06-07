function InstallEmscripten() {
  const path = require('path');
  const { spawn } = require('child_process');
  const child = spawn('sh', [
    path.resolve(__dirname, './scripts/install_emscripten.sh')
  ]);

  child.stdout.setEncoding('utf8');

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('close', (code) => {
    console.log(`[emscripten] process exited with code ${code}`);
  });
}

module.exports = InstallEmscripten;
