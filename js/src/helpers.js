 /**
  * Namespace for the app
  * @namespace md
  * @type {Object}
  */
 md = {};

jQuery(function(md, undefined) {
    "use strict";

    /**
     * Generate UUID
     * lends md
     * @return {string} UUID
     */
    md.guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    };

    /**
     * Left padding a string with char to length
     * lends md
     * @param {String} string - original string
     * @param {String} char - char to pad
     * @param {Integer} length - total length of final string
     * @return {string} UUID
     */
    md.lpad = function(string, char, length) {
        while (string.length < length) {
            string = char + string;
        }
        return string;
    };

    /**
     * Right padding a string with char to length
     * lends md
     * @param {String} string - original string
     * @param {String} char - char to pad
     * @param {Integer} length - total length of final string
     * @return {string} UUID
     */
    md.rpad = function(string, char, length) {
        while (string.length < length) {
            string = string + char;
        }
        return string;
    };

    /**
     * Padding char to length
     * lends md
     * @param {String} char - char to pad
     * @param {Integer} length - total length of final string
     * @return {string} UUID
     */
    md.pad = function(char, length) {
        var string = '';
        for (var i=0; i < length; i++) {
            string += char;
        }
        return string;
    };


}(window.md = window.md || {}));
