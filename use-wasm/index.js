import React, { useState, useEffect } from 'react';

function useWasm(filename) {
  const filepath = filename + '.wasm';
  const [ instance, setInstance ] = useState(null);

  useEffect(() => {
    if (instance) {
      return;
    }

    const memory = new WebAssembly.Memory({
      initial: 256
    });
    const importObj = {
      env: {
        abortStackOverflow: () => {
          throw new Error('overflow');
        },
        table: new WebAssembly.Table({
          initial: 0,
          element: 'anyfunc'
        }),
        __table_base: 0,
        memory: memory,
        __memory_base: 1024,
        STACKTOP: 0,
        STACK_MAX: memory.buffer.byteLength,
      }
    };

    if (typeof WebAssembly.instantiateStreaming === 'function') {
      const load = WebAssembly.instantiateStreaming(fetch(filepath), importObj)
        .then(results => {
          setInstance(results.instance.exports)
        });
    } else {
      fetch(filepath).then(response =>
        response.arrayBuffer()
      ).then(bytes =>
        WebAssembly.instantiate(bytes, importObj)
      ).then(results => {
        setInstance(results.instance.exports)
      });
    }
  }, []);

  return {
    isWasmEnabled: () => {
      return 'WebAssembly' in window
    },
    instance
  }
}

export default useWasm;
