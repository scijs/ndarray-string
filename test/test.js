"use strict"

var ndstring = require("../ndstring.js")

require("tape")("ndstring", function(t) {

  var x = ndstring("foobar", [2,3])
  
  console.log(ndstring.toString(x))


  var y = ndstring("bananabanana", [6,6], [1,1])
  console.log(ndstring.toString(y))



  t.end()
})