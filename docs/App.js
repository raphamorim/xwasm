import React, { Fragment, Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
// import useWasm from 'use-wasm';

const FILTER_LIMIT = 4;

export function scaleDPI(canvas, context, customWidth, customHeight) {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const backingStorePixelRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  const ratio = devicePixelRatio / backingStorePixelRatio;

  const width =
    customWidth || canvas.offsetWidth || canvas.width || canvas.clientWidth;
  const height =
    customHeight || canvas.offsetHeight || canvas.height || canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);

  if (devicePixelRatio !== backingStorePixelRatio) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(ratio, ratio);
  }

  return ratio;
}

function setImage(filter) {
  const canvas = document.getElementById('preview');
  const ctx = canvas.getContext('2d');
  const image = document.getElementById('source');
  scaleDPI(canvas, ctx);
  ctx.drawImage(image, 0, 0);

  switch(filter){
    case 0:
      // noop
      break;
    case 1:
      processBenjamin(canvas, ctx);
      break;
    case 2:
      processRaphael(canvas, ctx);
      break;
    case 3:
      processChris(canvas, ctx);
      break;
    case 4:
      // processWasm(canvas, ctx);
      break;
  }
}

const sepia = (imageData, adj) => {
  let pixels = imageData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    pixels[i] = (r * (1 - (0.607 * adj))) + (g * .769 * adj) + (b * .189 * adj);
    pixels[i + 1] = (r * .349 * adj) + (g * (1 - (0.314 * adj))) + (b * .168 * adj);
    pixels[i + 2] = (r * .272 * adj) + (g * .534 * adj) + (b * (1 - (0.869 * adj)));
  }
  return imageData;
}

function processChris(canvas, context) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  for(let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }

  context.putImageData(imageData, 0, 0);
};

const contrast = (imageData, adj) => {
  let pixels = imageData.data;
  adj *= 255;
  let factor = (259 * (adj + 255)) / (255 * (259 - adj));
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = factor * (pixels[i] - 128) + 128;
    pixels[i + 1] = factor * (pixels[i + 1] - 128) + 128;
    pixels[i + 2] = factor * (pixels[i + 2] - 128) + 128;
  }
  return imageData;
}

function processRaphael(canvas, context) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];
    const alpha = pixels[i + 3];

    pixels[i] = 0.2 * red;
    pixels[i + 1] = 1 * green;
    pixels[i + 2] = 1 * blue;
    pixels[i + 3] = 1 * alpha;
  }

  context.putImageData(imageData, 0, 0);
};

function processBenjamin(canvas, context) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  let newImageData = imageData;

  newImageData = sepia(newImageData, 0.5);
  newImageData = contrast(newImageData, -0.1);

  context.putImageData(newImageData, 0, 0);
};

// 0 default
// 1 benjamin
// 2 raphael
// 3 wasm

function App() {
  // const { isWasmEnabled, instance } = useWasm('doubler');
  const [ filter, setFilter ] = useState(0);

  useEffect(() => {
    setImage(filter);
  }, [filter]);

  return (
    <Fragment>
      <canvas id='preview' onClick={ev => {
        if (filter >= FILTER_LIMIT) {
          setFilter(0);
          return;
        }

        setFilter(filter + 1);
      }} />
      <div className='profile'>
        <img src='profile.jpeg'/> raphamorim <span>8m</span>
      </div>
      <div className='debug'>
        <p>isWasmEnabled: {String(isWasmEnabled())}</p>
        <p>_doubler: {String(instance && instance._doubler(2))}</p>
      </div>
    </Fragment>
  );
}

render(<App/>, document.querySelector('#root'));
