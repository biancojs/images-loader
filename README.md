# bianco.images-loader

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Modern images loader helpers written in es2015 using generators and promises

## Usage

#### Load a single image
```js
import { loadImage } from 'bianco.images-loader'

loadImage('path/to/the/image.jpg').then(img => document.body.appendChild(img))
```

Or also DOM nodes:

```js
import $ from 'bianco.query'
import { loadImage } from 'bianco.images-loader'

loadImage($('img.cool'))
  .then(img => img.classList.add('loaded'))
  .catch(function(error) {
    // there was an error loading the image
  })
```

#### Load a multiple images

```js
import { loadImages } from 'bianco.images-loader'

loadImages([
    'path/to/the/image1.jpg',
    'path/to/the/image2.jpg'
  ])
  .then(imgs => imgs.forEach(i => document.body.appendChild(i)))
  .catch(error => {
    // there was an error loading one of images
  })

```

Or also...

```js
import $ from 'bianco.query'
import { loadImages } from 'bianco.images-loader'

loadImages($('img', '.main-content'))
  .then(imgs => imgs.forEach(i => i.classList.add('loaded')))
  .catch(error => {
    // there was an error loading one of images
  })

```

#### Lazy load sequentially images using a generator

```js
import { loadImagesGen } from 'bianco.images-loader'

const infiniteList = loadImagesGen([...many images])

// load the first 10 images
let i = 10
while (i--) {
  infiniteList.next().value.then(onImageLoaded)
}

// do something

// load other 5 images
i = 5
while (i--) {
  infiniteList.next().value.then(onImageLoaded)
}

// do something else

// load the remaining images
for (let promise of infiniteList) {
  promise.next().value.then(onImageLoaded)
}
```

## API

- `loadImage(String|Image)` load an image returning a promise
- `loadImages(Array|NodeList)` load in parallel multiple images returning a promise
- `loadImagesGen(Array|NodeList)` load multiple images sequentially returning a ES6 generator

[travis-image]:https://img.shields.io/travis/biancojs/images-loader.svg?style=flat-square
[travis-url]:https://travis-ci.org/biancojs/images-loader

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/bianco.images-loader.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/bianco.images-loader.svg?style=flat-square
[npm-url]:https://npmjs.org/package/bianco.images-loader
