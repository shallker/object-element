
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

Properties
#### .id
#### .text
#### .width
#### .height
#### .opacity

Read only properties
#### .parent
#### .hidden
#### .tag

Methods
#### .css([String name], [String value])
#### .empty()
#### .destroy()
#### .attach(Function caller)
#### .append(Element child, [Number index])
#### .prepend(Element child, [Number index])
#### .appendTo(Element parent, [Number index])
#### .prependTo(Element parent, [Number index])

#### .ancestors([String selector])
Match all elements in ancestor elements

#### .farthestAncestor([String selector])
#### .nearestAncestor([String selector])

#### .children([String selector])
Match all elements in first tree level child elements

#### .firstChild([String selector])
Match first element in first tree level child elements

#### .lastChild([String selector])
Match last element in first tree level child elements

#### .siblings([String selector])
#### .prevSibling([String selector])
#### .nextSibling([String selector])
#### .prevSiblings([String selector])
#### .nextSiblings([String selector])

#### .select(String selector)
Select all elements descended from the element that match the selector

#### .selectFirst(String selector)
Select the first element descended from the element that match the selector

#### .selectLast(String selector)
Select the last element descended from the element that match the selector

## License

  MIT
