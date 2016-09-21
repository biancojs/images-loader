import domToArray from 'bianco.dom-to-array'

/**
 * Preload any image
 * @param   { String|HTMLElement } img - Path to the image or image object
 * @returns { Promise } a promise that will be resolved when the image will be completely loaded
 */
export function loadImage(img) {
  const isUrl = typeof img === 'string'
  let i = isUrl ? document.createElement('img') : img

  // this image was already loaded
  if (!isUrl && i.complete) return Promise.resolve(i)

  // the image reference will set to null
  // to avoid memory leaks
  return new Promise((resolve, reject) => {
    i.onload = _ => resolve(i)
    i.onerror = i.onabort = reject
    if (isUrl) i.src = img
  })
}

/**
 * Load in parallel a collection of images
 * @param   { Array|NodeList } imgs - array of strings or <img> HTML elements
 * @returns { Promise } a promise that will be resolved when all the images will be loaded
 */
export function loadImages(imgs) {
  return Promise.all(domToArray(imgs).map(loadImage))
}

/**
 * Load sequentially a collection of images
 * @param  { Array|NodeList } imgs - array of strings or <img> HTML elements
 * @yields { Promise } a promise that will be resolved when the image will be completely loaded
 */
export function * loadImagesGen (imgs) {
  const list = domToArray(imgs)

  for (let img of list) {
    yield loadImage(img)
  }
}

export default {
  loadImage,
  loadImages,
  loadImagesGen
}
