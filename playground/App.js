import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';
import useWasm from './useWasm';

function App() {
  // method will initialize null til load the wasm
  const { isWasmEnabled, instance } = useWasm('doubler');

  return (
    <Fragment>
      <p>isWasmEnabled: {String(isWasmEnabled())}</p>
      <p>_doubler: {String(null)}</p>
    </Fragment>
  );
}

render(<App/>, document.querySelector('#root'));
