function createDiv(id, classname) {
  var div = document.createElement('div');

  if (id) {
    div.id = id;
  }

  if (classname) {
    div.className = classname;
  }

  return document.body.appendChild(div);
}

function remove() {
  var els = [].slice.call(arguments);

  els.forEach(function (el, i) {
    el.parentNode.removeChild(el);
  });
}
