// imports is an optional imports object
function useWasm(fileName) {
  console.log(1)
  if (!('WebAssembly' in window)) {
    console.warn('you need a browser with wasm support enabled');
  }


  const response = await  WebAssembly.compileStreaming(fetch(fileName));


  console.log(response);
  // return fetch(fileName)
  //   .then(response => response.arrayBuffer())
  //   .then(buffer => WebAssembly.compile(buffer))
  //   .then(module => {return new WebAssembly.Instance(module) });
}
