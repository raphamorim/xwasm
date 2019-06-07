#!/bin/sh

node ./index.js install

emcc --version
if [ $? -eq 0 ]; then
  exit 0
else
  exit 1
fi
