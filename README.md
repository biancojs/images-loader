# bianco-images-loader

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]



## Usage


#### Load a single image
```js
import { loadImage } from 'bianco-images-loader'

loadImage('path/to/the/image.jpg')
  .then(img => document.body.appendChild(img))
  .catch(function(error) {
    // there was an error loading the image
  })

```

Or also DOM nodes:

```js
import $ from 'bianco-query'
import { loadImage } from 'bianco-images-loader'

loadImage($('img.cool')).then(img => img.classList.add('loaded'))
```

#### Load a multiple images

```js
import { loadImages } from 'bianco-images-loader'

loadImages([
  'path/to/the/image1.jpg',
  'path/to/the/image2.jpg'
])
  .then(img => document.body.appendChild(img))
  .catch(error => {
    // there was an error loading one of images
  })

```

Or also...

```js
import $ from 'bianco-query'
import { loadImages } from 'bianco-images-loader'

loadImages($('img', '.main-content'))
  .then(img => img.classList.add('loaded'))
  .catch(error => {
    // there was an error loading one of images
  })

```

#### Load sequentially images using a generator

```js
import { loadImagesGen } from 'bianco-images-loader'

const loader = loadImagesGen([
  'path/to/the/image1.jpg',
  'path/to/the/image2.jpg',
  'path/to/the/image3.jpg'
])

// load the first image
loader.next().value.then(img => {
  // do something with the image

  // do something with the remaining images to load
  for (let promise of loader) {
    promise.then(i => {
      // do whathever you want here
    })
  }
})
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
