"use strict"

var ndarray = require("ndarray")

//Adapted from MDN example for unicode processing:
//
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
//
function ndarrayFromString(str, shape, stride, offset) {
  var n = str.length
  var arr = new Uint32Array(n)
  var ncode_points = 0
  for(var i=0; i<n; ++i) {
    var code = str.charCodeAt(i)
    var hi, low
    if (0xD800 <= code && code <= 0xDBFF) {
      hi = code
      low = str.charCodeAt(++i)
      if (isNaN(low)) {
        throw 'High surrogate not followed by low surrogate'
      }
      arr[ncode_points++] = ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000
    }
    if (0xDC00 <= code && code <= 0xDFFF) {
      continue
    }
    arr[ncode_points++] = code
  }
  if(!shape) {
    shape = [ncode_points]
  }
  return ndarray(arr, shape, stride, offset)
}

//Unicode conversion routines adapted from here:
//
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FString%2FfromCharCode#Getting_it_to_work_with_higher_values
//
function ndarrayToString(arr) {
  var d = arr.shape.length
  if(d === 1) {
    var n = arr.shape[0]
    var codePoints = new Array(n)
    for(var i=0; i<n; ++i) {
      var code = arr.get(i)|0
      if(code >= 0x10000) {
        var offset = point - 0x10000
        var units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point]
        codePoints[i] = String.fromCharCode.apply(null, units)
      } else {
        codePoints[i] = String.fromCharCode(code)
      }
    }
    return codePoints.join("")
  } else if(d > 1) {
    var n = arr.shape[0]
    var r = new Array(n)
    for(var i=0; i<n; ++i) {
      r[i] = ndarrayToString(arr.pick(i))
    }
    return r
  } else {
    return []
  }
}

module.exports = ndarrayFromString
module.exports.toString = ndarrayToString
