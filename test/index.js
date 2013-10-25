var ObjectElement = require('object-element');
var test = require('simple-test');

function createDiv() {
  return document.body.appendChild(document.createElement('div'));
}

test('objectElement.id', function () {
  var div = createDiv();
  var objectElement = new ObjectElement(div);

  objectElement.id = 'test';
  test.eq(div.id, 'test');
});

test('objectElement.text', function () {
  var div = createDiv();
  var objectElement = new ObjectElement(div);

  objectElement.text = '.text';
  test.eq(div.textContent, '.text');
});

test('objectElement.html', function () {
  var div = createDiv();
  var objectElement = new ObjectElement(div);

  objectElement.html = '<div>.html</div>';
});

test('objectElement.show()', function () {
  var div = createDiv();
  var objectElement = new ObjectElement(div);

  div.style.display = 'none';
  objectElement.text = '.show()';
  objectElement.show();
});

test('objectElement.hide()', function () {
  var div = createDiv();
  var objectElement = new ObjectElement(div);

  div.style.display = 'block';
  objectElement.text = '.hide()';
  objectElement.hide();
});

test('objectElement.firstChild()', function () {
  var div = createDiv();
  var div1 = createDiv();
  var div2 = createDiv();
  var div3 = createDiv();
  var objectElement = new ObjectElement(div);

  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  objectElement.firstChild().text = '.firstChild()';
  test.eq(objectElement.firstChild().el, div1);
});

test('objectElement.lastChild()', function () {
  var div = createDiv();
  var div1 = createDiv();
  var div2 = createDiv();
  var div3 = createDiv();
  var objectElement = new ObjectElement(div);

  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  objectElement.lastChild().text = '.lastChild()';
  test.eq(objectElement.lastChild().el, div3);
});

test('objectElement.append()', function () {
  var div = createDiv();
  var div2 = createDiv();
  var objectElement = new ObjectElement(div);

  div2.textContent = '.append()';
  test.ok(objectElement.append(div2));
  test.eq(objectElement.lastChild().el, div2)
});

test('objectElement.prepend()', function () {
  var div = createDiv();
  var div2 = createDiv();
  var objectElement = new ObjectElement(div);

  div2.textContent = '.prepend()'
  test.ok(objectElement.prepend(div2));
  test.eq(objectElement.firstChild().el, div2)
});

test("objectElement.selectFirst()", function () {
  var div = createDiv();
  var div1 = createDiv();
  var div2 = createDiv();
  var div3 = createDiv();
  var objectElement = new ObjectElement(div);

  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  test.eq(objectElement.selectFirst('div').el, div1);
});

test("objectElement.selectLast()", function () {
  var div = createDiv();
  var div1 = createDiv();
  var div2 = createDiv();
  var div3 = createDiv();
  var objectElement = new ObjectElement(div);

  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  test.eq(objectElement.selectLast('div').el, div3);
});
