#!/bin/bash

install_emcc () {
  # Get the emsdk repo
  git clone https://github.com/emscripten-core/emsdk.git ./emsdk

  # Enter that directory
  # Fetch the latest version of the emsdk
  # Use 1.38.34 (https://github.com/emscripten-core/emsdk/commit/188c3edb9b7edafeaef4f4658a19dbcd99e81a37)
  cd emsdk && git pull && git checkout 188c3edb9b7edafeaef4f4658a19dbcd99e81a37

  # Download and install the latest SDK tools.
  ./emsdk install 1.38.34  # ./emsdk install latest

  # Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)
  ./emsdk activate 1.38.34 # ./emsdk install latest

  pwd

  # Activate PATH and other environment variables in the current terminal
  source ./emsdk_env.sh
}

emcc --version
if [ $? -eq 0 ]; then
  echo 'emcc: checked'
else
  install_emcc
fi
