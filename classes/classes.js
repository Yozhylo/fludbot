// const insert = require('../commands/insert')

const { DB } = require('./db.js');
const credentials = require('../.data-base/config.json')

module.exports = {
  Resolution: class {
    #width;
    #height;

    constructor(width, height) {
      this.#width = width
      this.#height = height
    }

    get width() {
      return this.#width;
    }
    get height() {
      return this.#height;
    }
  },
  Extension: class {
    #format
    #mimeType

    constructor(format, mimeType) {
      this.#format = format;
      this.#mimeType = mimeType;
    }

    get format() {
      return this.#format;
    }
    get mimeType() {
      return this.#mimeType;
    }
  },
  Media: class {
    #name
    #resolution
    #extension
    #reference

    constructor(reference, nickname, name, description, resolution, extension) {
      this.nickname = nickname;
      JSON.stringify(description).replace(/\s/g,'') === '' ? this.description : this.description = description;
      JSON.stringify(resolution).replace(/\s/g,'') === '' ? this.#resolution : this.#resolution = resolution;
      this.#extension = extension;
      this.#name = name;
      this.#resolution = resolution;
      this.#reference = reference;
    }

    get name() {
      return this.#name
    }
    get resolution() {
      return this.#resolution
    }
    get extension() {
      return this.#extension
    }
    get reference() {
      return this.#reference
    }

    set reference(newValue) {
      this.#reference = newValue;
    }
  }
}