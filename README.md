![assets](assets/wasm-sdk.png)

This repository contains some tools for develop with WebAssembly for modern frontend (React, Vue, Babel and etecetera)

#### Summary

- [`useWasm` (React Hook)](#usewasm)
- [`babel-plugin-wasm`](#babel-plugin-wasm)
- [`loadWasm` (Vanilla Method)](#loadwasm)
- [`emscripten` Node Wrapper for Emscripten](#emscripten)
- [Examples](#examples)
  - [React + C++](#react--c)
  - [Babel + React + C++](#react--babel--c)
  - [Babel + React + Rust](#react--babel--rust)
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

## `babel-plugin-wasm`

#### Installation

```sh
$ npm install babel-plugin-wasm
```

## With babel plugin


## Emscripten

#### Installation

```bash
npm install emscripten
```

#### Module Usage

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
const rustFile = './is_north.rs';
const emmc.buildFile({
  input: path.resolve(__dirname, rustFile),
  output: path.resolve(__dirname, 'rust_file.wasm'),
  wasm: true
});

```

#### CLI Usage

On Development...

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
