// pxToRem.js
'use strict';
var lodash = require('lodash');
var parseAttrs = require('posthtml-attrs-parser');
var posthtml = require('posthtml');

export default function (str, options) {
    var pxRegex = /(\d*\.?\d+)px/ig;

    options = lodash.extend({
        rootValue: 16, // root font-size
        unitPrecision: 5, // numbers after `.`
        minPixelValue: 0 // set it 2 if you want to ignore value like 1px & -1px
    }, options);

    function createPxReplace(rootValue, unitPrecision, minPixelValue) {
        return function (m, $1) {

            // ignoring `PX` `Px`
            if (m.indexOf('px') === -1) {
                return m;
            }
            if (!$1) {
                return m;
            }
            var pixels = parseFloat($1);

            if (pixels < minPixelValue) {
                return m;
            }
            return toFixed((pixels / rootValue), unitPrecision) + 'rem';
        };
    }

    function toFixed(number, precision) {
        var multiplier = Math.pow(10, precision + 1),
            wholeNumber = Math.floor(number * multiplier);
        return Math.round(wholeNumber / 10) * 10 / multiplier;
    }

    var pxReplace = createPxReplace(options.rootValue, options.unitPrecision, options.minPixelValue);

    return Promise.try(() => {
        return posthtml()
            .use(function(tree) {
                tree.match({attrs: {style: true}}, function (node) {
                    var attrs = parseAttrs(node.attrs);
                    for (var x in attrs['style']) {
                        if (attrs['style'].hasOwnProperty(x)) {
                            var styleValue = attrs['style'][x];

                            // e.g. style="width=10px; width=20px;"
                            if (typeof styleValue == 'object')
                                styleValue = styleValue[styleValue.length - 1];

                            var newStyleValue;
                            newStyleValue = styleValue.toString().replace(pxRegex, pxReplace);

                            attrs['style'][x] = newStyleValue;
                        }
                    }

                    node.attrs = attrs.compose();
                    return node;
                });
            })
            .process(str)
            .then(function(result) {
                return result.html;
            })
    });
};
