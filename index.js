/*!
 * Copyright (c) 2016 Moises Romero
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const typeOf = require('typeof');

/**
 * Regular expression matcher for the arguments.
 * @type {RegExp}
 */
const ARGUMENT_REG = /^["']?-+([\w\d_-]+)[:=]?(.*)["']?$/;

/**
 * Class containing the basic information for the environment
 */
class Argv {

  constructor() {

    process.argv.forEach(arg => {
      const matches = arg.match(ARGUMENT_REG);
      if (!matches) {
        return;
      }
      this[matches[1].toUpperCase()] = matches[2] || true;
    });

  }

  /**
   * Sets a property if is undefined.
   * @param {string} name The name of the argument.
   * @param {*} value The value of the argument.
   */
  setIfUndefined(name, value) {
    if (this[name] === undefined) {
      this[name] = value;
    }
  }

  /**
   * Gets the argument defined or the default value indicated.
   * @param {string} name The name of the argument.
   * @param {*} defaultValue The default value.
   * @returns {*}
   */
  getArgument(name, defaultValue) {
    name = name.toUpperCase();
    return this[name] === undefined ?
      Argv._resolveValue(defaultValue) : this[name];
  }

  /**
   * Resolves the value in case is a function.
   * @param {*} value The value or function to resolve.
   * @returns {*}
   * @private
   */
  static _resolveValue(value){
    return typeOf(value, 'function') ? value() : value;
  }

}

module.exports = Argv;
