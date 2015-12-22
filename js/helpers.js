//js-joiner out: metadata.min.js, files: helpers.js config.js json-empty.js js-models.js xpaths.js MetadataXml.js, compress: false

jQuery(function(md, undefined) {
    "use strict";

    /**
     * Generate UUID
     * @lends md
     * @return {string} UUID
     */
    md.guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    };

}(window.md = window.md || {}));
