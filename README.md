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

const { doubler } = useWasm({ 
  file: 'doubler.wasm'
});
  
doubler(2) // 4

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
