var eventy = require('eventy');
var domify = require('domify');
var util = require('../util/index');
var slice = Array.prototype.slice;
var filter = Array.prototype.filter;

module.exports = function ObjectElement(el) {
  var objectElement = function () {
    this.el = el;

    this.property = function (name, defnies) {
      Object.defineProperty(this, name, defnies);
    }

    /**
     * Shortcut to objectElement.el.id
     */
    this.property('id', {
      get: function () {
        return this.el.id;
      },

      set: function (value) {
        this.el.id = value;
      }
    });

    /**
     * Get or set textContent of the element
     */
    this.property('text', {
      get: function () {
        return this.el.textContent;
      },

      set: function (value) {
        this.el.textContent = value;
      }
    });

    /**
     * Get or set innerHTML of the element
     */
    this.property('html', {
      get: function () {
        return this.el.innerHTML;
      },

      set: function (htmlString) {
        this.empty();
        this.append(domify(htmlString));
      }
    });

    /**
     * Get or set element's width
     */
    this.property('width', {
      get: function () {
        return this.el.offsetWidth;
      },

      set: function (value) {
        this.style.width = value;
      }
    });

    /**
     * Get or set element's height
     */
    this.property('height', {
      get: function () {
        return this.el.offsetHeight;
      },

      set: function () {
        this.style.height = value;
      }
    });

    /**
     * Get or set element's opacity
     */
    this.property('opacity', {
      get: function () {
        return this.el.style.opacity;
      },

      set: function (value) {
        this.el.style.opacity = value;
      }
    });

    /**
     * Get element's visibility state
     */
    this.property('hidden', {
      get: function () {
        return this.el.style.display === 'none' ? true : false;
      }
    });

    /**
     * Shortcut to .el.tagName
     */
    this.property('tag', {
      get: function () {
        return this.el.tagName;
      }
    });

    return this;
  }.call(eventy({}));

  /**
   * Match the element against the selector
   * @param  {Element element}
   * @param  {String selector}
   * @return {Boolean}
   */
  function match(element, selector) {
    var matchesSelector = element.webkitMatchesSelector 
      || element.mozMatchesSelector 
      || element.oMatchesSelector 
      || element.matchesSelector;

    return matchesSelector.call(element, selector);
  }

  /**
   * Loop through all elements and match theme against th selector
   * @param  {Array elements}
   * @param  {String selector}
   * @return {Array elements}
   */
  function matchAll(elements, selector) {
    return elements.filter(function (element, i) {
      return match(element, selector);
    });
  }

  /**
   * Loop through each element and return the first matched element
   * @param  {Array elements}
   * @param  {String selector}
   * @return {Element | Null}
   */
  function matchFirst(elements, selector) {
    var i;

    for (i = 0; i < elements.length; i++) {
      if (match(elements[i], selector)) {
        return elements[i];
      }
    }

    return null;
  }

  /**
   * Loop through each element and return the last matched element
   * @param  {Array elements}
   * @param  {String selector}
   * @return {Element | Null}
   */
  function matchLast(elements, selector) {
    /**
     * Clone an array of the elements reference first
     */
    elements = elements.slice();
    elements.reverse();

    return matchFirst(elements, selector);
  }

  /**
   * Return an array containing ELEMENT_NODE from ndoes
   * @param  {NodeList nodes}
   * @return {Array}
   */
  function elementNodesOf(nodes) {
    return util.map(nodes, function (node, i) {
      if (node.nodeType === 1) {
        return node;
      }
    });
  }

  /**
   * Get the fist level child elements
   * @param  {[type] element}
   * @return {[type]}
   */
  function childrenOf(element) {
    return 'children' in element 
      ? slice.call(element.children)
      : elementNodesOf(element.childNodes);
  }

  objectElement.empty = function () {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    this.el.innerHTML = '';
  }

  objectElement.show = function () {
    if (this.el.style.display === 'none') {
      this.el.style.display = '';
    }
  }

  objectElement.hide = function () {
    this.el.style.display = 'none';
  }

  /**
   * Get or set element's tyle
   * @param  [String name]
   * @param  [String value]
   * @return {[type]}
   */
  objectElement.css = function (name, value) {
    if (arguments.length === 0) {
      return this.el.style;
    }

    if (arguments.length === 1) {
      return this.el.style[name];
    }

    return this.el.style[name] = value;
  }

  /**
   * Select element's child elements by selector
   * Or get all child elements
   * Or get the nth child element by number
   * @param  [Number index | String selector]
   */
  objectElement.children = function (param) {
    var args = slice.call(arguments);

    if (args.length === 0) {
      return childrenOf(this.el);
    }

    if (typeof args[0] === 'number') {
      var index = args.shift();

      return childrenOf(this.el)[index];
    }

    if (typeof args[0] === 'string') {
      var selector = args.shift();

      return matchAll(childrenOf(this.el), selector);
    }
  }

  /**
   * Get first child element by selector or not
   * @param  [String selector]
   * @return {ObjectElement}
   */
  objectElement.firstChild = function (selector) {
    var element;

    if (arguments.length === 0) {
      element = this.el.firstChild;
    } else {
      element = matchFirst(this.children(), selector);
    }

    return element === null ? null : new ObjectElement(element);
  }

  /**
   * Get last child element by the selector or not
   * @param  [String selector]
   * @return {ObjectElement}
   */
  objectElement.lastChild = function (selector) {
    var element;

    if (arguments.length === 0) {
      element = this.el.lastChild;
    } else {
      element = matchLast(this.children(), selector);
    }

    return element === null ? null : new ObjectElement(element);
  }

  /**
   * Select all elements descended from the element that match the selector
   * @param  {String selector}
   * @return {Array}
   */
  objectElement.select = function (selector) {
    var nodeList = this.el.querySelectorAll(selector);

    if (nodeList.length === 0) {
      return [];
    }

    return util.map(slice.call(nodeList), function (element, i) {
      return new ObjectElement(element);
    });
  }

  /**
   * Select the first element descended from the element that matchs the selector
   * @param  {String selector}
   * @return {ObjectElement | null}
   */
  objectElement.selectFirst = function (selector) {
    var element = this.el.querySelector(selector);

    if (element === null) {
      return null;
    }

    return new ObjectElement(element);
  }

  /**
   * Select the last element descended from the element that matchs the selector
   * @param  {String selector}
   * @return {ObjectElement | null}
   */
  objectElement.selectLast = function (selector) {
    var elements = this.select(selector);

    if (elements.length === 0) {
      return null;
    }

    return elements.pop();
  }

  /**
   * Append an element after the last child or the position of the index
   * @param  {ObjectElement | Element element}
   * @param  [Number index]
   * @return {[type]}
   */
  objectElement.append = function (element, index) {
    element = element.el || element;

    if (index) {
      return this.el.insertBefore(element, this.children(index + 1));
    } else {
      return this.el.appendChild(element);
    }
  }

  /**
   * Append an element before the first child or the position of the index
   * @param  {ObjectElement | Element element}
   * @param  [Number index]
   * @return {[type]}
   */
  objectElement.prepend = function (element, index) {
    element = element.el || element;

    if (index) {
      return this.el.insertBefore(element, this.children(index));
    } else {
      return this.el.insertBefore(element, this.firstChild());
    }
  }

  return objectElement;
}
