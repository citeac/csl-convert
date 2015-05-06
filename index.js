
/**
 * Dependencies
 */

var TRAITS = require('citeac-traits').properties;


/**
 * Converts an object parsed in from citeac
 * to convert to CSL data blob
 *
 * @param {Object} obj
 * @return {Object}
 * @api public
 */

module.exports = function(obj) {
  var clean = {};

  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    var data = obj[key];
    var schema = TRAITS[key];

    if (!schema) continue;
    if (!schema.csl) continue;
    if (!schema.csl.length) continue;

    var converted = convert(key, data, schema);
    if (!converted) continue;

    schema.csl.forEach(function(cslKey){
      clean[cslKey] = converted;
    })
  }

  return clean;
}


/**
 * convert trait for CSL
 *
 * @api public
 */


function convert(key, data, schema) {
  if (schema.type == 'contributor') {
    return data;
  }

  if (!Array.isArray(data) || !data.length) return;

  var first = data[0];

  if (schema.type == 'date') {
    var obj = {"date-parts": [[]]};
    var parts = obj['date-parts'][0];

    if (typeof first.year !== 'undefined') {
      parts[0] = parseInt(first.year);
    }

    if (typeof first.month !== 'undefined') {
      parts[1] = parseInt(first.month);
    }

    if (typeof first.day !== 'undefined') {
      parts[2] = parseInt(first.day);
    }

    return obj;
  }

  if (schema.type == 'string' || schema.type == 'number') {
    return first.content;
  }
}