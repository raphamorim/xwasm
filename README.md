![assets](assets/wasm-sdk.png)

This repository contains some tools for develop with WebAssembly for modern frontend (React, Vue, Babel and etecetera)

#### Summary

- [`emscripten` Node API for Emscripten SDK](#emscripten)
- [`useWasm` (React Hook)](#usewasm)
- [`babel-plugin-wasm`](#babel-plugin-wasm)
- [Examples](#examples)
  - [React + C++](#react--c)
  - [Babel + React + C++](#react--babel--c)
  - [Babel + React + Rust](#react--babel--rust)
- [FAQ](#faq)
- [TODO](#todo)

## `emscripten`

Node module for [Emscripten SDK](https://github.com/emscripten-core/emsdk) API.

Note: Only OS X and Linux support. Windows support in development.

#### Installation

It's going to install Emscripten SDK on postinstall hook.

```bash
npm install emscripten
```

#### CLI Usage

1. Create a file: `emscripten.config.js`

```jsx
const filesToProcess = [
  {
    input: 'doubler.c',
    output: 'doubler.wasm',
    functions: '["_doubler"]'
  }
]

module.exports = filesToProcess;
```

2. Now if you run `emscripten build`, it's going to load the configuration above. You can add it for example (if you want to) before any build task.

```json
"scripts": {
  "build": "emscripten build && webpack",
``` 


#### Module Usage (Not available yet, still under development)

###### `is_north.rs`

```rust
#[derive(Debug)]
enum Direction { North, South, East, West }

fn is_north(dir: Direction) -> bool {
    match dir {
        Direction::North => true,
        _ => false,
    }
}

fn main() {
    let points = Direction::South;
    println!("{:?}", points);
    let compass = is_north(points);
    println!("{}", compass);
}
```

###### `index.js`

```jsx
import path from 'path';
import Emscripten from 'emscripten';

const emcc = new Emscripten();
const isNorthPath = './is_north.rs';
const emmc.buildFile({
  input: path.resolve(__dirname, isNorthPath),
  output: path.resolve(__dirname, 'is_north.wasm'),
  wasm: true
});
```

#### CLI Usage

On Development...

## `useWasm`

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

## `babel-plugin-wasm`

#### Installation

```sh
$ npm install babel-plugin-wasm
```

## Examples

#### React + C++

#### React + Babel + C++

On going...

#### React + Babel + Rust

On going...

## References

- https://webassembly.org/getting-started/developers-guide
- https://emscripten.org/docs/compiling/WebAssembly.html
- https://developer.mozilla.org/en-US/docs/WebAssembly
- https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm
- https://developer.mozilla.org/en-US/docs/WebAssembly/Using_the_JavaScript_API
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory
- https://github.com/emscripten-core/emscripten/issues/8126
