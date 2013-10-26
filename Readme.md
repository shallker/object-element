
# object-element

  Wrap host object HTMLElement in a JavaScript object to provide across browser interface

## Installation

  Install with [component(1)](http://component.io):

    $ component install shallker/object-element

## Quick Start
```javascript
var ObjectElement = require('object-element');

var element = document.getElementById('dom-element');
var objectElement = new ObjectElement(element);
```

## API
### objectElement

#### Properties
##### .id
##### .text
##### .html
##### .width
##### .height
##### .opacity
##### .style

#### Read-only properties
##### .tag
##### .hidden
##### .parent

#### Methods
##### .hide()
##### .show()
##### .tie(Function callback)
##### .match(String selector)
##### .css([String name], [String value])

#### Selection methods
##### .siblings([String selector])
##### .prevSiblings([String selector])
##### .nextSiblings([String selector])
##### .prevSibling([String selector])
##### .nextSibling([String selector])
##### .prev([String selector])
Alias of .prevSibling()

##### .next([String selector])
Alias of .nextSibling()

##### .ancestors([String selector])
Match all elements in ancestor elements

##### .farthestAncestor([String selector])
##### .nearestAncestor([String selector])

##### .children([String selector])
Match all elements in first tree level child elements

##### .child(Number index)
Get nth child by index

##### .firstChild([String selector])
Match first element in first tree level child elements

##### .lastChild([String selector])
Match last element in first tree level child elements

##### .select(String selector)
Select all elements descended from the element that match the selector

##### .selectFirst(String selector)
Select the first element descended from the element that match the selector

##### .selectLast(String selector)
Select the last element descended from the element that match the selector

#### Insertion methods
##### .append(Element child, [Number index])
##### .prepend(Element child, [Number index])
##### .appendTo(Element parent, [Number index])
##### .prependTo(Element parent, [Number index])
##### .before(ELement sibling, [Number shift])
##### .after(ELement sibling, [Number shift])
##### .insertBefore(ELement target, [Number shift])
##### .insertAfter(ELement target, [Number shift])

#### Deletion methods
##### .empty()
##### .destroy()

#### Event methods
##### .bind(String eventType, Function callback, [Boolean capture])
##### .unbind(String eventType, Function callback, [Boolean capture])
##### .addEventListener(String eventType, Function callback, [Boolean capture])
##### .removeEventListener(String eventType, Function callback, [Boolean capture])
##### .delegate(String selector, String eventType, Function callback, [Boolean capture])
##### .undelegate(String selector, String eventType, Function callback, [Boolean capture])
##### .on(String eventName, [String selector], Function callback, [Boolean capture])
##### .off(String eventName, [String selector], Function callback, [Boolean capture])
##### .triggerSync(String eventName, [Mix args...])
##### .trigger(String eventName, [Mix args...])

## License

  MIT
