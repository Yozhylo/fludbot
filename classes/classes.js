// const insert = require('../commands/insert')

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
      return this.#width;
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

    constructor(nickname, name, description, resolution, extension) {
      this.nickname = nickname;
      // this.description = description;
      description.replace(/\s/g,'') === '' ? this.description : this.description = description;
      this.#name = name;
      this.#resolution = resolution;
      this.#extension = extension;
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
  }
}