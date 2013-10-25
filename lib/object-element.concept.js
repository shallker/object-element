var ObjectElement = require('object-element');

var div = document.createElement('div');
var objectElement = new ObjectElement(div);


/** Peroperties */

/**
 * Get or set element's id
 */
objectElement.id

/**
 * Get or set element's innerText
 */
objectElement.text

/**
 * Get or set element's innerHTML
 */
objectElement.html

/**
 * Get or set element's offsetWidth
 */
objectElement.width

/**
 * Get or set element's offsetHeight
 */
objectElement.height

/**
 * Get or set element's opacity
 */
objectElement.opacity

/** Read only properties */

/**
 * Element's display state
 * true or false
 */
objectElement.hidden

/**
 * Tag name of the element
 * 'div', 'ul', 'input', 'checkbox'
 */
objectElement.tag

/** Methods */

/**
 * style.display = 'none'
 */
objectElement.hide()

/**
 * style.display = 'block'
 */
objectElement.show()

/**
 * Get or set element's style
 * Return el.style when no arguments passed in
 */
objectElement.css([String name], [String value])

/**
 * Remove all children elements
 */
objectElement.empty()

/**
 * Remove element itself from DOM
 */
objectElement.destroy()

/**
 * Call the attacher function on this element
 */
objectElement.attach(Function attacher)

/**
 * Is there a way to detach an already called function?
 */
objectElement.detach(Function attacher)

/**
 * Insert a sibling before this element
 */
objectElement.before(Element sibling, [Number shift])

/**
 * Insert a sibling after this element
 */
objectElement.after(Element sibling, [Number shift])

/**
 * Insert this element before the target sibling
 */
objectElement.insertBefore(Element targetSibling, [Number shift])

/**
 * Insert this element after the target sibling
 */
objectElement.insertAfter(Element targetSibling, [Number shift])

/**
 * Append an element after the last child or the position of the index
 */
objectElement.append(Element child, [Number index])

/**
 * Append an element before the first child or the position of the index
 */
objectElement.prepend(Element child, [Number index])

/**
 * Append this element after parent element's last child or the position of the index
 */
objectElement.appendTo(Element parent, [Number index])

/**
 * Append this element before parent element's first child or the position of the index
 */
objectElement.prependTo(Element parent, [Number index])

/**
 * Move element around siblings by the number
 * Maximum to the head or the end of the parent element
 */
objectElement.shift(Number number)

/** Class methods */
objectElement.hasClass(String name)
objectElement.addClass(String name)
objectElement.removeClass(String name)
objectElement.toggleClass(String name)

/** Attribute methods */
objectElement.hasAttribute(String name)
objectElement.getAttribute(String name)
objectElement.setAttribute(String name, String value)
objectElement.removeAttribute(String name)

/**
 * Select an array of child elements by the selector
 */
objectElement.select(String selector)

/**
 * Select the first matched child element by the selector
 */
objectElement.selectFirst(String selector)

/**
 * Select the last matched child element by the selector
 */
objectElement.selectLast(String selector)

/**
 * Element's parent element
 */
objectElement.parent(String selector)
objectElement.parents(String selector)

/**
 * Get an array of child elements
 */
objectElement.children(String selector)

/**
 * Get an array of siblings of this element
 */
objectElement.siblings(String selector)

/**
 * Shortcut to .el.firstChild
 */
objectElement.firstChild(String selector)

/**
 * Shortcut to .el.lastChild
 */
objectElement.lastChild(String selector)
objectElement.prevSibling(String selector)
objectElement.nextSibling(String selector)

objectElement.clone()