"use strict"

var ndstring = require("../ndstring.js")

require("tape")("ndstring", function(t) {

  var x = ndstring("foobar", [2,3])
  t.deepEqual(ndstring.toString(x), ['foo','bar'])

  var y = ndstring("bananabanana", [6,6], [1,1])
  t.deepEqual(ndstring.toString(y), ['banana','ananab','nanaba','anaban','nabana','abanan'])

  var z = ndstring("foobar", [6])
  t.deepEqual(ndstring.toString(z), 'foobar')

  var u = ndstring("foobarbanana", [2,2,3])
  t.deepEqual(ndstring.toString(u), [['foo','bar'],['ban','ana']])

  t.end()
})