emcc doubler.c -Os -s EXPORTED_FUNCTIONS='["_doubler"]' WASM=1 -o doubler.wasm
