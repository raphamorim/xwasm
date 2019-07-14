import React, { useState, useEffect } from 'react';
import dissoc from 'lodash/fp/dissoc';
import mapKeys from 'lodash/fp/mapKeys';
import pipe from 'lodash/fp/pipe';

const getFunctions = instance => {
  const removeDefaultProp = dissoc('__post_instantiate');

  const removeUndercore = mapKeys(
    key => key.substring(1)
  );

  const exported = pipe(
    removeDefaultProp,
    removeUndercore,
  )(instance.exports);

  return exported;
};

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
          const functions = getFunctions(results.instance);
          setInstance(functions);
        });
    } else {
      fetch(filepath).then(response =>
        response.arrayBuffer()
      ).then(bytes =>
        WebAssembly.instantiate(bytes, importObj)
      ).then(results => {
        const functions = getFunctions(results.instance);
        setInstance(functions);
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
