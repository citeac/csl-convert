
/**
 * Dependencies
 */

var TRAITS = require('citeac-traits').properties;


/**
 * Expose converter
 */

module.exports = converter;


/**
 * Converter
 *
 * @param {Array} arr
 * @return {Object}
 * @api public
 */

function converter(arr) {
  var clean = {};

  arr.forEach(function(trait){
    var schema = TRAITS[trait.type];

    if (!schema) return;
    if (!schema.csl) return;
    if (!schema.csl.length) return;

    schema.csl.forEach(function(key){
      display(clean, trait, schema, key)
    })
  })

  return clean;
}


/**
 * display
 *
 * @api public
 */


function display(clean, trait, schema, key) {
  if (schema.type == 'contributor') {
    if (!clean[key]) clean[key] = [];
    clean[key].push({family: trait.last, given: trait.first})
  }

  if (schema.type == 'date') {
    clean[key] = {"date-parts": [[]]};
    var parts = clean[key]['date-parts'][0];

    if (typeof trait.year !== 'undefined') {
      parts[0] = parseInt(trait.year);
    }

    if (typeof trait.month !== 'undefined') {
      parts[1] = parseInt(trait.month) + 1;
    }

    if (typeof trait.day !== 'undefined') {
      parts[2] = parseInt(trait.day);
    }
  }

  if (schema.type == 'string' || schema.type == 'number') {
    clean[key] = trait.content;
  }
}