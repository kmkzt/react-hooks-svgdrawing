# react-hooks-svgdrawing

[![npm version](https://badge.fury.io/js/react-hooks-svgdrawing.svg)](https://www.npmjs.com/package/react-hooks-svgdrawing) [![npm download](https://img.shields.io/npm/dt/react-hooks-svgdrawing.svg)](https://www.npmjs.com/package/react-hooks-svgdrawing)

### introduction

`react-hooks-svgdrawing` is react drawing library.

**[demo](https://kmkzt.github.io/react-hooks-svgdrawing/)**

## Get started

```shell
yarn add react react-hooks-svgdrawing
```

## How to use

started

```javascript
import React from 'react'
import { useSvgDrawing } from 'react-hooks-svgdrawing'

const Drawing = () => {
  const [
    renderRef,
    action
  ] = useSvgDrawing()
  return <div ref={renderRef}>
}
```

Drawing init options.

```javascript
const [renderRef, action] = useSvgDrawing({
  penWidth: 10, // pen width
  penColor: '#e00', // pen color
  width: 300, // drawing area width
  height: 300 // drawing area height
})
```

Drawing methods.

```javascript
// action
const [renderRef, action] = useSvgDrawing()

// drawing all clear
action.clear()

// svg download
action.download()

// undo drawing
action.undo()

// change pen config
action.changePenColor('#00b')
// change pen widht
action.changePenWidth(10)

// get svgXML
// return SVGElement
console.log(action.getSvgXML()) // <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" height="500" viewBox="0 0 500 500"><defs></defs><g id="two-0" transform="matrix(1 0 0 1 0 0)" opacity="1"><path transform="matrix(1 0 0 1 0 0)" d="..." fill="transparent" stroke="#000" stroke-width="3" stroke-opacity="1" fill-opacity="1" class="" visibility="visible" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="4" id="two-1"></path></g></svg>
```

[example code](src/example/)
