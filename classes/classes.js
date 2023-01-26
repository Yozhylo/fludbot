// const insert = require('../commands/insert')

module.exports = {
  Resolution: class {
    #width;
    #height;

    constructor(width, height) {
      // this.name = setName()
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
    #name
    #mimeType

    constructor(name, mimeType) {
      this.#name = name;
      this.#mimeType = mimeType;
    }

    get name() {
      return this.#name;
    }
    get mimeType() {
      return this.#mimeType;
    }
  },
  Media: class {
    #name
    #description
    #resolution

    constructor(nickname, name, description, resolution) {
      this.nickname = nickname;
      this.#name = name;
      this.#description = description;
      this.#resolution = resolution;
    }

    get name() {
      return this.#name
    }
    get description() {
      return this.#description
    }
    get resolution() {
      return this.#resolution
    }
  }
}