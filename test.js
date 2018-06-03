require('jsdom-global')()

const assert = require('assert')
const body = document.body
const { loadImage, loadImages } = require('./')
const pathGen = pathGenerator()


/* eslint-disable */
function * pathGenerator() {
  let i = 1
  while (i) {
    yield `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7?${i++}`
  }
}
/* eslint-enable */

describe('Bianco images-loader', function() {
  beforeEach(function() {
    const div = document.createElement('div')
    div.innerHTML = `
      <img src=''>
    `
    body.appendChild(div)
  })

  it('It can load images in the DOM', function(done) {
    const img = document.querySelector('img')
    loadImage(img).then(function(i) {
      assert.equal(typeof i.src, 'string')
      done()
    })
    img.src = pathGen.next().value
  })

  // this test does not work in jsdom somehow
  /*it('It can throw properly the errors', function(done) {
    const img = document.querySelector('img')
    loadImage(img).catch(function(e) {
      assert.equal(typeof e, Error)
      done()
    })
    img.src = 'foo-bar'
  })*/

  it('It can load arrays of images urls', function(done) {
    loadImages([pathGen.next().value, pathGen.next().value]).then(function(imgs) {
      assert.equal(imgs.length, 2)
      done()
    })
  })
})
