exports.map = function map(list, filter) {
  var i, k, result = [];

  if (typeof list.length === 'number') {
    for (i = 0; i < list.length; i++) {
      var value = filter.call(list[i], list[i], i);

      if (typeof value !== 'undefined') {
        result.push(value);
      }
    }
  } else {
    for (k in list) {
      var value = filter.call(list[k], list[k], i);

      if (typeof value !== 'undefined') {
        result.push(value);
      }
    }
  }

  return result;
}

exports.each = function each(list, callback) {
  var i, k;

  if (typeof list.length === 'number') {
    for (i = 0; i < list.length; i++) {
      if (callback.call(list[i], list[i], i) === false) {
        return list;
      }
    }
  } else {
    for (k in list) {
      if (callback.call(list[k], list[k], k) === false) {
        return list;
      }
    }
  }
}
