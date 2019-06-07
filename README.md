# WASM SDK

![assets](assets/wasm-sdk.png)

## useWasm

## Usage

```c
int doubler(int x) {
  return 2 * x;
}
```

```jsx

import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';
import useWasm from 'use-wasm';

function App() {
  // method will initialize null til load the "./doubler.wasm"
  const { isWasmEnabled, instance } = useWasm('doubler');

  return (
    <Fragment>
      <p>isWasmEnabled: {String(isWasmEnabled())}</p>
      <p>_doubler: {String(instance && instance._doubler(2))}</p>
    </Fragment>
  );
}

render(<App/>, document.querySelector('#root'));

```

![Value loading returning null](assets/demo-react-hooks-loading.png) ![Value loading returning instance object](assets/demo-react-hooks-loaded.png)

## With babel plugin

```jsx

const { is_north } = useWasm(`
  fn is_north(dir: Direction) -> bool {
      match dir {
          'North' => true,
          _ => false,
      }
  }
`);

return is_north('North'); // true

```


```jsx

const { is_north } = useWasm(({ debug }) => `
  fn is_north(dir: Direction) -> bool {
      println!("{:?}", ${debug});

      match dir {
          'North' => true,
          _ => false,
      }
  }
`);

return is_north('North', { debug: 'Debug!' }); // true

```
