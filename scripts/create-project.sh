git clone --depth 1 https://github.com/raphamorim/wasm.git
mv ./wasm/docs ./wasm-app
rm -rf ./wasm
cd ./wasm-app && yarn && yarn start
