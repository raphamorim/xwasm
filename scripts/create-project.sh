git clone --depth 1 https://github.com/raphamorim/xwasm.git
mv ./xwasm/docs ./wasm-app
rm -rf ./xwasm
cd ./wasm-app && yarn && yarn start
