jQuery(function(md, undefined) {

    /**
     * Config variable
     * @type {Object}
     */
    md.config = {};

    // Get user language from browser
    /*
    var param_lang = params['lang'];
    if (param_lang) {
        config.userLang = param_lang;
    } else {
        config.userLang = navigator.language || navigator.userLanguage;
    }
    // Keep only 2 first characters from language (ex.: 'fr' or 'en' or 'de')
    config.userLang = config.userLang.substring(0,2);
    // Use french by default
    if (['fr', 'en', 'de'].indexOf(config.userLang) == -1) { config.userLang = 'fr'; }
    */

   // List of languages to convert 2 char to 3 char values
    md.languages = {
        fr: 'fre',
        en: 'eng',
        de: 'deu'
    };
    var lang = navigator.language || navigator.userLanguage || 'fr';
    md.config.userLanguage = md.languages[lang];
    //console.log(md.config.userLanguage);



    /**
     * Default XML source
     * @type {String}
     */
    md.defaultBaseXml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<gmd:MD_Metadata xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xmlns:gmd="http://www.isotc211.org/2005/gmd" xsi:schemaLocation="http://www.isotc211.org/2005/gmd http://schemas.opengis.net/iso/19139/20060504/gmd/gmd.xsd">' +
        //  '<gmd:channel>' +
        //      '<gmd:title>' +
        //          'RSS Title 1' +
        //      '</gmd:title>' +
        //      '<gmd:title>' +
        //          'RSS Title 2' +
        //      '</gmd:title>' +
        //  '</gmd:channel>' +
        '</gmd:MD_Metadata>';

}(window.md = window.md || {}));
