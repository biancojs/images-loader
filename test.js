require('jsdom-global')()

const assert = require('assert')
const imagesLoader = require('./')


const LOAD_FAILURE_SRC = 'failed.jpg'
const LOAD_SUCCESS_SRC = 'success.jpg'

/* eslint-disable */
Object.defineProperty(global.Image.prototype, 'src', {
  set(src) {
    if (src === LOAD_FAILURE_SRC) {
      setTimeout(() => this.dispatchEvent(new Event('error')), Math.random() * 500)
    } else if (src === LOAD_SUCCESS_SRC) {
      setTimeout(() => this.dispatchEvent(new Event('load')), Math.random() * 1000)
    }
  }
})
/* eslint-enable */


describe('Bianco images-loader', function() {

  it('export default contains all the module methods', function() {
    assert.deepEqual(Object.keys(imagesLoader.default), [
      'loadImage',
      'loadImages'
    ])
  })

  it('It can load images in the DOM', function(done) {
    const img = document.createElement('img')

    imagesLoader.loadImage(img).then(function(i) {
      assert.ok(i)
      done()
    })

    img.src = LOAD_SUCCESS_SRC
  })

  // this test does not work in jsdom somehow
  it('It can throw properly the errors', function(done) {
    const img = document.createElement('img')

    imagesLoader.loadImage(img).then(() => {
      throw 'This image should be not loaded'
    }).catch(function(e) {
      assert.ok(e instanceof Error)
      done()
    })

    img.src = LOAD_FAILURE_SRC
  })

  it('It can load arrays of images urls', function(done) {
    imagesLoader.loadImages([LOAD_SUCCESS_SRC, LOAD_SUCCESS_SRC]).then(function(imgs) {
      assert.equal(imgs.length, 2)
      done()
    })
  })
})
