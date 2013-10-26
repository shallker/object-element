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

    /** Properties */

    /**
     * Shortcut to .el.id
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

    /** Read-only properties */

    /**
     * Shortcut to el.style
     */
    this.property('style', {
      get: function () {
        return this.el.style;
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
    element = element.el || element;

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
  function childElementsOf(element) {
    return 'children' in element 
      ? slice.call(element.children)
      : elementNodesOf(element.childNodes);
  }

  function prevElementSiblingOf(element) {
    if ('previousElementSibling' in element) {
      return element.previousElementSibling;
    }

    var prevNode = element.previousSibling;

    while (prevNode && prevNode.nodeType !== 1) {
      prevNode = prevNode.previousSibling;
    }

    return prevNode;
  }

  function nextElementSiblingOf(element) {
    if ('nextElementSibling' in element) {
      return element.nextElementSibling;
    }

    var nextNode = element.nextSibling;

    while (nextNode && nextNode.nodeType !== 1) {
      nextNode = nextNode.nextSibling;
    }

    return nextNode;
  }

  function prevElementSiblingsOf(element) {
    var prevs = [],
        prev = prevElementSiblingOf(element);

    while (prev) {
      prevs.push(prev);
      prev = prevElementSiblingOf(prev);
    }

    return prevs.reverse();
  }

  function nextElementSiblingsOf(element) {
    var nexts = [],
        next = nextElementSiblingOf(element);

    while (next) {
      nexts.push(next);
      next = nextElementSiblingOf(next);
    }

    return nexts;
  }

  function elementSiblingsOf(element) {
    return prevElementSiblingsOf(element).concat(nextElementSiblingsOf(element));
  }

  /**
   * Wrap HTMLElement with ObjectElement
   * @param  {HTMLElement element}
   * @return {ObjectElement}
   */
  function wraps(element) {
    return element.el ? element : new ObjectElement(element);
  }

  /**
   * Loop through HTMLElements and wrap each of them with ObjectElement
   * @param  {Array elements}
   * @return {Array}
   */
  function wrap(elements) {
    return util.map(elements, function (element, i) {
      return wraps(element);
    });
  }

  /** Methods */

  /**
   * Display element in DOM
   */
  objectElement.show = function () {
    if (this.el.style.display === 'none') {
      this.el.style.display = '';
    }
  }

  /**
   * Hide element in DOM
   */
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
   * Matching the element against selector
   * @param  {String selector}
   * @return {Boolean}
   */
  objectElement.match = function (selector) {
    var matchesSelector = this.el.webkitMatchesSelector 
      || this.el.mozMatchesSelector 
      || this.el.oMatchesSelector 
      || this.el.matchesSelector;

    return matchesSelector.call(this.el, selector);
  }

  /** Selection methods */

  objectElement.siblings = function (selector) {
    return this.prevSiblings(selector).concat(this.nextSiblings(selector));
  }

  objectElement.prevSiblings = function (selector) {
    var prevElementSiblings = prevElementSiblingsOf(this.el);

    if (prevElementSiblings.length && selector) {
      prevElementSiblings = matchAll(prevElementSiblings, selector);
    }

    if (prevElementSiblings.length === 0) {
      return prevElementSiblings;
    }

    return wrap(prevElementSiblings);
  }

  objectElement.nextSiblings = function (selector) {
    var nextElementSiblings = nextElementSiblingsOf(this.el);

    if (nextElementSiblings.length && selector) {
      nextElementSiblings = matchAll(nextElementSiblings, selector);
    }

    if (nextElementSiblings.length === 0) {
      return nextElementSiblings;
    }

    return wrap(nextElementSiblings);
  }

  objectElement.prevSibling = function (selector) {
    var prevElementSibling = prevElementSiblingOf(this.el);

    if (prevElementSibling && selector) {
      prevElementSibling = matchLast(this.prevSiblings(), selector);
    }

    if (prevElementSibling === null) {
      return prevElementSibling;
    }

    return wraps(prevElementSibling);
  }

  /**
   * Alias of .prevSibling()
   */
  objectElement.prev = objectElement.prevSibling;

  objectElement.nextSibling = function (selector) {
    var nextElementSibling = nextElementSiblingOf(this.el);

    if (nextElementSibling && selector) {
      nextElementSibling = matchFirst(this.nextSiblings(), selector);
    }

    if (nextElementSibling === null) {
      return nextElementSibling;
    }

    return wraps(nextElementSibling);
  }

  /**
   * Alias of .nextSibling()
   */
  objectElement.next = objectElement.nextSibling;

  /**
   * Select element's child elements by selector or not
   * @param  [String selector]
   * @return {Array}
   */
  objectElement.children = function (selector) {
    var childElements = childElementsOf(this.el);

    if (childElements.length && selector) {
      childElements = matchAll(childElements, selector);
    }

    if (childElements.length === 0) {
      return childElements;
    }

    return wrap(childElements);
  }

  /**
   * Select the nth child by the index
   * @param  {Number index}
   * @return {ObjectElement}
   */
  objectElement.child = function (index) {
    var children = this.children();

    if (children.length === 0) {
      return null;
    }

    if (index < 0 || index >= children.length) {
      return null;
    }

    return children[index];
  }

  /**
   * Get first child element by selector or not
   * @param  [String selector]
   * @return {ObjectElement}
   */
  objectElement.firstChild = function (selector) {
    var firstChild = this.el.firstChild;

    if (firstChild && selector) {
      firstChild = matchFirst(this.children(), selector);
    }

    if (firstChild === null) {
      return firstChild;
    }

    return wraps(firstChild);
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

    return element === null ? null : wraps(element);
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
      return wraps(element);
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

    return wraps(element);
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

  /** Insertion methods */

  /**
   * Append an element after the last child or the position of the index
   * @param  {ObjectElement | Element element}
   * @param  [Number index]
   * @return {Null}
   */
  objectElement.append = function (element, index) {
    var el = element.el || element;
    var target;

    if (index) {
      target = this.child(index);
    }

    if (target && target.el.nextSibling) {
      return this.el.insertBefore(el, target.el.nextSibling);
    } else {
      return this.el.appendChild(el);
    }
  }

  /**
   * Append an element before the first child or the position of the index
   * @param  {ObjectElement | Element element}
   * @param  [Number index]
   * @return {Null}
   */
  objectElement.prepend = function (element, index) {
    var el = element.el || element;
    var target;

    if (index) {
      target = this.child(index);
    }

    if (target) {
      return this.el.insertBefore(el, target.el);
    } else {
      return this.el.insertBefore(el, this.el.firstChild);
    }
  }

  /**
   * Append element itself after another element's last child or the position of
   * the index
   * @param  {ObjectElement | Element element}
   * @param  [Number index]
   * @return {Null}
   */
  objectElement.appendTo = function (element, index) {
    element = wraps(element);
    element.append(this, index);
  }

  /**
   * Append element itself before another element's first child or the position
   * of the index
   * @param  {ObjectElement | Element element}
   * @param  [Number index]
   * @return {Null}
   */
  objectElement.prependTo = function (element, index) {
    element = wraps(element);
    element.prepend(this, index);
  }

  /** Deletion methods */

  /**
   * Remove all descend elements from element
   */
  objectElement.empty = function () {
    /**
     * Do something before removing all child elements
     */
    this.triggerSync('empty');

    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    /**
     * Make sure it's really empty
     */
    this.el.innerHTML = '';

    /**
     * Do something after all child elements are removed
     */
    this.trigger('emptied');
  }

  /**
   * Remove element itself from DOM
   * @return {Null}
   */
  objectElement.destroy = function () {
    /**
     * Do something before removing element from DOM
     */
    this.triggerSync('destroy');

    /**
     * Remove children first
     */
    this.empty();

    /**
     * Remove itself from DOM
     */
    this.el.parentNode.removeChild(this.el);

    /**
     * Do something after element is removed from DOM
     */
    this.trigger('destroied');
  }

  return objectElement;
}
