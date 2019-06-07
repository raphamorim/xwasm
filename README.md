![assets](assets/wasm-sdk.png)

This repository contains some tools for develop with WebAssembly for modern frontend (React, Vue, Babel and etecetera)

#### Summary

- [`useWasm` (React Hook)](#usewasm)
- [`babel-wasm-plugin`](#babel-wasm-plugin)
- [`loadWasm` (Vanilla Method)](#loadwasm)
- [Examples](#examples)
  - [React + C++](#babel-react)
  - [Babel + React + C++](#babel-react)
  - [Babel + React + Rust](#babel-react)
- [FAQ](#faq)
- [TODO](#todo)

## useWasm

### Installing

```bash
$ npm install use-wasm
```

### Usage

C++

```cpp
int _doubler(int x) {
  return 2 * x;
}
```

Frontend code with React

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

###### Instance loading (`null` as initial value)

![Value loading returning null](assets/demo-react-hooks-loading.png) 

###### Instance loaded (wasm export object as value)

![Value loading returning instance object](assets/demo-react-hooks-loaded.png)

## `babel-wasm-plugin`

#### Installation

```sh
$ npm install babel-wasm-plugin
```

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

## Examples

#### React + C++
