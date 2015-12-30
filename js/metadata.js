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
jQuery(function(md, undefined) {

    /**
     * codeslist main object
     * lends md
     * @type {Object}
     */
    md.codeslists = {};

    /**
     * codeslist of type of date
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.ciDateTypeCode = [{
        id: "creation",
        value: "Création"
    }, {
        id: "publication",
        value: "Publication"
    }, {
        id: "revision",
        value: "Révision"
    }];

    /**
     * codeslist of topicCategories
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdTopicCategoryCode = [{
        id: "farming",
        value: "Agriculture"
    }, {
        id: "biota",
        value: "Flore et faune"
    }, {
        id: "boundaries",
        value: "Limites politiques et administratives"
    }, {
        id: "climatologyMeteorologyAtmosphere",
        value: "Climatologie, météorologie"
    }, {
        id: "economy",
        value: "Economie"
    }, {
        id: "elevation",
        value: "Topographie"
    }, {
        id: "environment",
        value: "Ressources et gestion de l’environnement"
    }, {
        id: "geoscientificInformation",
        value: "Géosciences"
    }, {
        id: "health",
        value: "Santé"
    }, {
        id: "imageryBaseMapsEarthCover",
        value: "Carte de référence de la couverture terrestre"
    }, {
        id: "intelligenceMilitary",
        value: "Infrastructures militaires"
    }, {
        id: "inlandWaters",
        value: "Hydrographie"
    }, {
        id: "location",
        value: "Localisant"
    }, {
        id: "oceans",
        value: "Océans"
    }, {
        id: "planningCadastre",
        value: "Planification et aménagement du territoire"
    }, {
        id: "society",
        value: "Société"
    }, {
        id: "structure",
        value: "Aménagements urbains"
    }, {
        id: "transportation",
        value: "Infrastructures de transport"
    }, {
        id: "utilitiesCommunication",
        value: "Réseaux de télécommunication, d’énergie"
    }];

    /**
     * codeslist of character set
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdCharacterSetCode = [{
        id: "ucs2",
        value: "ucs2"
    }, {
        id: "ucs4",
        value: "ucs4"
    }, {
        id: "utf7",
        value: "utf7"
    }, {
        id: "8859part16",
        value: "8859part16"
    }, {
        id: "8859part15",
        value: "8859part15"
    }, {
        id: "8859part1",
        value: "8859part1"
    }, {
        id: "utf16",
        value: "utf16"
    }, {
        id: "utf8",
        value: "utf-8"
    }, {
        id: "8859part2",
        value: "8859part2"
    }, {
        id: "8859part3",
        value: "8859part3"
    }, {
        id: "8859part4",
        value: "8859part4"
    }, {
        id: "8859part5",
        value: "8859part5"
    }, {
        id: "8859part6",
        value: "8859part6"
    }, {
        id: "8859part7",
        value: "8859part7"
    }, {
        id: "8859part8",
        value: "8859part8"
    }, {
        id: "8859part9",
        value: "8859part9"
    }, {
        id: "8859part10",
        value: "8859part10"
    }, {
        id: "8859part11",
        value: "8859part11"
    }, {
        id: "8859part13",
        value: "8859part13"
    }, {
        id: "8859part14",
        value: "8859part14"
    }, {
        id: "jis",
        value: "jis"
    }, {
        id: "shiftJIS",
        value: "shiftJIS"
    }, {
        id: "eucJP",
        value: "eucJP"
    }, {
        id: "usAscii",
        value: "usAscii"
    }, {
        id: "ebcdic",
        value: "ebcdic"
    }, {
        id: "eucKR",
        value: "eucKR"
    }, {
        id: "big5",
        value: "big5"
    }, {
        id: "GB2312",
        value: "GB2312"
    }];

    /**
     * codeslist of contact role code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.ciRoleCode = [{
        id: "resourceProvider",
        value: "Fournisseur"
    }, {
        id: "custodian",
        value: "Gestionnaire"
    }, {
        id: "owner",
        value: "Propriétaire"
    }, {
        id: "author",
        value: "Auteur"
    }, {
        id: "pointOfContact",
        value: "Point de contact"
    }, {
        id: "user",
        value: "Utilisateur"
    }, {
        id: "distributor",
        value: "Distributeur"
    }, {
        id: "originator",
        value: "Commanditaire"
    }, {
        id: "principalInvestigator",
        value: "Producteur / Maître d’œuvre principal ou d'ensemble"
    }, {
        id: "processor",
        value: "Intégrateur / Exécutant secondaire"
    }, {
        id: "publisher",
        value: "Editeur"
    }];

    /**
     * codeslist of classification code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdClassificationCode = [{
        id: "topSecret",
        value: "Top secret"
    }, {
        id: "secret",
        value: "Secret"
    }, {
        id: "confidential",
        value: "Confidentiel"
    }, {
        id: "restricted",
        value: "Restreint"
    }, {
        id: "unclassified",
        value: "Non classifié"
    }];

    /**
     * codeslist of Inspire restriction code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdInspireRestrictionCode = [{
        id: "L124-4-I-1 du code de l'environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.a)",
        value: "La confidentialité des travaux des autorités publiques, lorsque cette confidentialité est prévue par la loi.",
        search: "inspire"
    }, {
        id: "L124-5-II-1 du code de l'environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.b)",
        value: "Les relations internationales, la sécurité publique ou la défense nationale.",
        search: "inspire"
    }, {
        id: "L124-5-II-2 du code de l'environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.c)",
        value: "La bonne marche de la justice, la possibilité pour toute personne d’être jugée équitablement ou la capacité d’une autorité publique d’effectuer une enquête d’ordre pénal ou disciplinaire.",
        search: "inspire"
    }, {
        id: "L124-4-I-1 du code de l'environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.d)",
        value: "La confidentialité des informations commerciales ou industrielles, lorsque cette confidentialité est prévue par la législation nationale ou communautaire afin de protéger un intérêt économique légitime, notamment l’intérêt public lié à la préservation de la confidentialité des statistiques et du secret fiscal.",
        search: "inspire"
    }, {
        id: "L124-5-II-3 du code de l'environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.e)",
        value: "Les droits de propriété intellectuelle.",
        search: "inspire"
    }, {
        id: "L124-4-I-1 du code de l'environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.f)",
        value: "La confidentialité des données à caractère personnel et/ou des fichiers concernant une personne physique lorsque cette personne n’a pas consenti à la divulgation de ces informations au public, lorsque la confidentialité de ce type d’information est prévue par la législation nationale ou communautaire.",
        search: "inspire"
    }, {
        id: "L124-4-I-3 du code de l'environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.g)",
        value: "Les intérêts ou la protection de toute personne qui a fourni les informations demandées sur une base volontaire sans y être contrainte par la loi ou sans que la loi puisse l’y contraindre, à moins que cette personne n’ait consenti à la divulgation de ces données.",
        search: "inspire"
    }, {
        id: "L124-4-I-2 du code de l'environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.h)",
        value: "La protection de l’environnement auquel ces informations ont trait, comme par exemple la localisation d’espèces rares.",
        search: "inspire"
    }, {
        id: "Pas de restriction d’accès public selon INSPIRE",
        value: "Aucun des articles de la loi ne peut être invoqué pour justifier d’une restriction d’accès public.",
        search: "inspire"
    }];

    /**
     * codeslist of Inspire topic categories
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdInspireTopicCategoryCode = [{
        id: "Coordinate reference systems",
        value: "Référentiels de coordonnées"
    }, {
        id: "Geographical grid systems",
        value: "Systèmes de maillage géographique"
    }, {
        id: "Geographical names",
        value: "Dénominations géographiques"
    }, {
        id: "Administrative units",
        value: "Unités administratives"
    }, {
        id: "Addresses",
        value: "Adresses"
    }, {
        id: "Cadastral parcels",
        value: "Parcelles cadastrales"
    }, {
        id: "Transport networks",
        value: "Réseaux de transport"
    }, {
        id: "Hydrography",
        value: "Hydrographie"
    }, {
        id: "Protected sites",
        value: "Sites protégés"
    }, {
        id: "Elevation",
        value: "Altitude"
    }, {
        id: "Land cover",
        value: "Occupation des terres"
    }, {
        id: "Orthoimagery",
        value: "Ortho-imagerie"
    }, {
        id: "Geology",
        value: "Géologie"
    }, {
        id: "Statistical units",
        value: "Unités statistiques"
    }, {
        id: "Buildings",
        value: "Bâtiments"
    }, {
        id: "Soil",
        value: "Sols"
    }, {
        id: "Land use",
        value: "Usage des sols"
    }, {
        id: "Human health and safety",
        value: "Santé et sécurité des personnes"
    }, {
        id: "Utility and governmental services",
        value: "Services d'utilité publique et services publics"
    }, {
        id: "Environmental monitoring facilities",
        value: "Installations de suivi environnemental"
    }, {
        id: "Production and industrial facilities",
        value: "Lieux de production et sites industriels"
    }, {
        id: "Agricultural and aquaculture facilities",
        value: "Installations agricoles et aquacoles"
    }, {
        id: "Population distribution — demography",
        value: "Répartition de la population – démographie"
    }, {
        id: "Area management/restriction/regulation zones and reporting units",
        value: "Zones de gestion, de restriction ou de réglementation et unités de déclaration"
    }, {
        id: "Natural risk zones",
        value: "Zones à risque naturel"
    }, {
        id: "Atmospheric conditions",
        value: "Conditions atmosphériques"
    }, {
        id: "Meteorological geographical features",
        value: "Caractéristiques géographiques météorologiques"
    }, {
        id: "Oceanographic geographical features",
        value: "Caractéristiques géographiques océanographiques"
    }, {
        id: "Sea regions",
        value: "Régions maritimes"
    }, {
        id: "Bio-geographical regions",
        value: "Régions biogéographiques"
    }, {
        id: "Habitats and biotopes",
        value: "Habitats et biotopes"
    }, {
        id: "Species distribution",
        value: "Répartition des espèces"
    }, {
        id: "Energy resources",
        value: "Sources d'énergie"
    }, {
        id: "Mineral resources",
        value: "Ressources minérales"
    }];


    /**
     * codeslist of Inspire specification code
     * lends md.codeslist
     * @type {Object}
     */

    md.codeslists.mdInspireSpecificationCode = [{
        id: "COMMISSION REGULATION (EC) No 1205/2008 of 3 December 2008 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards metadata",
        value: "COMMISSION REGULATION (EC) No 1205/2008 of 3 December 2008 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards metadata",
        "date": "2008-12-03"
    }, {
        id: "Corrigendum to INSPIRE Metadata Regulation published in the Official Journal of the European Union, L 328, page 83",
        value: "Corrigendum to INSPIRE Metadata Regulation published in the Official Journal of the European Union, L 328, page 83",
        "date": "2009-12-15"
    }, {
        id: "COMMISSION REGULATION (EU) No 1089/2010 of 23 November 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards interoperability of spatial data sets and services",
        value: "COMMISSION REGULATION (EU) No 1089/2010 of 23 November 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards interoperability of spatial data sets and services",
        "date": "2010-12-08"
    }, {
        id: "COMMISSION REGULATION (EU) No 1088/2010 of 23 November 2010 amending Regulation (EC) No 976/2009 as regards download services and transformation services",
        value: "COMMISSION REGULATION (EU) No 1088/2010 of 23 November 2010 amending Regulation (EC) No 976/2009 as regards download services and transformation services",
        "date": "2010-12-08"
    }, {
        id: "COMMISSION REGULATION (EC) No 976/2009 of 19 October 2009 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards the Network Services",
        value: "COMMISSION REGULATION (EC) No 976/2009 of 19 October 2009 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards the Network Services",
        "date": "2009-10-20"
    }, {
        id: "COMMISSION REGULATION (EU) No 268/2010 of 29 March 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards the access to spatial data sets and services of the Member States by Community institutions and bodies under harmonised conditions",
        value: "COMMISSION REGULATION (EU) No 268/2010 of 29 March 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards the access to spatial data sets and services of the Member States by Community institutions and bodies under harmonised conditions",
        "date": "2010-03-30"
    }, {
        id: "Commission Decision of 5 June 2009 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards monitoring and reporting (notified under document number C(2009) 4199) (2009/442/EC)",
        value: "Commission Decision of 5 June 2009 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards monitoring and reporting (notified under document number C(2009) 4199) (2009/442/EC)",
        "date": "2009-06-11"
    }];


    /**
     * codeslist of keyword type code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdKeywordTypeCode = [{
        id: "discipline",
        value: "Discipline"
    }, {
        id: "place",
        value: "Localisation"
    }, {
        id: "stratum",
        value: "Strate"
    }, {
        id: "temporal",
        value: "Temps"
    }, {
        id: "theme",
        value: "Thème"
    }];


    /**
     * codeslist of language code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdLanguageCode = [{
        id: "ger",
        value: "Allemand"
    }, {
        id: "eng",
        value: "Anglais"
    }, {
        id: "fre",
        value: "Français"
    }];

    /**
     * codeslist of conformity pass code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdPassCode = [{
        id: "true",
        value: "Conforme"
    }, {
        id: "false",
        value: "Non conforme"
    }, {
        id: "empty",
        value: "Non évalué"
    }];


    /**
     * codeslist of maintenance frequency code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdMaintenanceFrequencyCode = [{
        id: "continual",
        value: "en continu"
    }, {
        id: "daily",
        value: "quotidienne"
    }, {
        id: "weekly",
        value: "hebdomadaire"
    }, {
        id: "fortnightly",
        value: "tous les 15 jours"
    }, {
        id: "monthly",
        value: "mensuelle"
    }, {
        id: "quaterly",
        value: "trimestrielle"
    }, {
        id: "biannually",
        value: "semestrielle"
    }, {
        id: "annually",
        value: "annuelle"
    }, {
        id: "asNeeded",
        value: "quand nécessaire"
    }, {
        id: "irregular",
        value: "irrégulierère"
    }, {
        id: "notPlanned",
        value: "non plannifiée"
    }, {
        id: "unknown",
        value: "inconnue"
    }];

    /**
     * codeslist of restriction code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdRestrictionCode = [{
        id: "copyright",
        value: "Droit d’auteur / Droit moral (copyright)"
    }, {
        id: "patent",
        value: "Brevet"
    }, {
        id: "patentPending",
        value: "Brevet en instance"
    }, {
        id: "trademark",
        value: "Marque de commerce"
    }, {
        id: "license",
        value: "Licence"
    }, {
        id: "intellectualPropertyRights",
        value: "Droit de propriété intellectuelle / Droit patrimonial"
    }, {
        id: "restricted",
        value: "Restreint"
    }, {
        id: "otherRestrictions",
        value: "Autres restrictions"
    }];

    /**
     * codeslist of scope code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdScopeCode = [{
        id: "attribute",
        value: "Attribut"
    }, {
        id: "attributeType",
        value: "Type d’attribut"
    }, {
        id: "collectionHardware",
        value: "Collection matérielle"
    }, {
        id: "collectionSession",
        value: "Collection de session"
    }, {
        id: "series",
        value: "Collection de données"
    }, {
        id: "dataset",
        value: "Jeu de données"
    }, {
        id: "nonGeographicDataset",
        value: "Jeu de données non géographique"
    }, {
        id: "dimensionGroup",
        value: "Dimension d’un groupe"
    }, {
        id: "feature",
        value: "Entité"
    }, {
        id: "featureType",
        value: "Type d’entité"
    }, {
        id: "propertyType",
        value: "Type de propriété"
    }, {
        id: "software",
        value: "Logiciel"
    }, {
        id: "fieldSession",
        value: "Champ de Session"
    }, {
        id: "service",
        value: "Service"
    }, {
        id: "model",
        value: "Modèle"
    }, {
        id: "tile",
        value: "Sous-ensemble de données"
    }, {
        id: "fieldCampaign",
        value: "Campagne de mesures"
    }];

    /**
     * codeslist of spatial representation type code
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdSpatialRepresentationTypeCode = [{
        id: "grid",
        value: "Rasteur"
    }, {
        id: "vector",
        value: "Vecteur"
    }, {
        id: "textTable",
        value: "Table texte"
    }, {
        id: "tin",
        value: "Tin"
    }, {
        id: "stereoModel",
        value: "Vue 3D"
    }, {
        id: "video",
        value: "Vidéo"
    }, {
        id: "undefined",
        value: "Non définie"
    }];

    /**
     * codeslist of linkage protocols
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdLinkageProtocolCode = [{
        id: "OGC:WMS",
        value: "WMS"
    }, {
        id: "OGC:WFS",
        value: "WFS"
    }, {
        id: "WWW:DOWNLOAD-1.0-http--download",
        value: "ZIP"
    }];

    /**
     * codeslist of reference system codes
     * lends md.codeslist
     * @type {Object}
     */
    md.codeslists.mdReferenceSystemCode = [{
        id: "2154",
        value: "RGF93 – Lambert 93 (EPSG:2154)",
        search: "2154"
    }, {
        id: "3948",
        value: "RGF93 – Lambert 93 CC48 (EPSG:3948)",
        search: "3948"
    }, {
        id: "3949",
        value: "RGF93 – Lambert 93 CC49 (EPSG:3949)",
        search: "3949"
    }, {
        id: "27572",
        value: "NTF Paris – Lambert zone II (EPSG:27572)",
        search: "27572"
    }, {
        id: "27571",
        value: "NTF Paris – Lambert zone I (EPSG:27571)",
        search: "27571"
    }, {
        id: "27561",
        value: "NTF Paris – Lambert Nord (EPSG:27561)",
        search: "27561"
    }, {
        id: "32632",
        value: "WGS84 – UTM Zone 32N (EPSG:32632)",
        search: "32632"
    }, {
        id: "4326",
        value: "WGS84 – 2D (EPSG:4326)",
        search: "4326"
    }, {
        id: "4979",
        value: "WGS84 – 3D (EPSG:4979)",
        search: "4979"
    }];

}(window.md = window.md || {}));
jQuery(function(md, undefined) {

/**
 * Xpath list to get data information in XML
 * lends md
 * @type {Object}
 */
md.xpaths = {
    // Metadata
    root: 'gmd\\:MD_Metadata, MD_Metadata',
    mdFileIdentifier: 'gmd\\:fileIdentifier>gco\\:CharacterString, fileIdentifier>CharacterString',
    mdLanguage: 'gmd\\:language>gmd\\:LanguageCode, language>LanguageCode',
    mdCharacterSet: 'gmd\\:characterSet>gmd\\:MD_CharacterSetCode, characterSet>MD_CharacterSetCode',
    mdHierarchyLevel: 'gmd\\:hierarchyLevel>gmd\\:MD_ScopeCode, hierarchyLevel>MD_ScopeCode',
    // MD_Contacts = tableau d'objets contact
    mdContacts: 'gmd\\:contact>gmd\\:CI_ResponsibleParty, contact>CI_ResponsibleParty',
    mdDateStamp: 'gmd\\:dateStamp>gco\\:Date, dateStamp>Date',
    mdStandardName: 'gmd\\:metadataStandardName>gco\\:CharacterString, metadataStandardName>CharacterString',
    mdStandardVersion: 'gmd\\:metadataStandardVersion>gco\\:CharacterString, metadataStandardVersion>CharacterString',
    // Data
    dataMdIdentification: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification, identificationInfo>MD_DataIdentification',
    dataDistribution: 'gmd\\:distributionInfo>gmd\\:MD_Distribution, distributionInfo>MD_Distribution',
    dataCiCitation: 'gmd\\:citation>gmd\\:CI_Citation, citation>CI_Citation',
    dataMdLegalConstraints: 'gmd\\:resourceConstraints>gmd\\:MD_LegalConstraints, resourceConstraints>MD_LegalConstraints',
    dataMdSecurityConstraints: 'gmd\\:resourceConstraints>gmd\\:MD_SecurityConstraints, resourceConstraints>MD_SecurityConstraints',
    dataMdResolution: 'gmd\\:spatialResolution>gmd\\:MD_Resolution, spatialResolution>MD_Resolution',
    dataTitle: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:citation>gmd\\:CI_Citation>gmd\\:title>gco\\:CharacterString, identificationInfo>MD_DataIdentification>citation>CI_Citation>title>CharacterString',
    serviceTitle: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:citation>gmd\\:CI_Citation>gmd\\:title>gco\\:CharacterString, identificationInfo>SV_ServiceIdentification>citation>CI_Citation>title>CharacterString',
    dataReferenceSystems: 'gmd\\:referenceSystemInfo>gmd\\:MD_ReferenceSystem, referenceSystemInfo>MD_ReferenceSystem',
    dataReferenceSystemCode: 'gmd\\:referenceSystemIdentifier>gmd\\:RS_Identifier>gmd\\:code>gco\\:CharacterString, referenceSystemIdentifier>RS_Identifier>code>CharacterString',
    // Dates
    dataDates: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:citation>gmd\\:CI_Citation>gmd\\:date>gmd\\:CI_Date, identificationInfo>MD_DataIdentification>citation>CI_Citation>date>CI_Date',
    serviceDates: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:citation>gmd\\:CI_Citation>gmd\\:date>gmd\\:CI_Date, identificationInfo>SV_ServiceIdentification>citation>CI_Citation>date>CI_Date',
    date: 'gmd\\:date>gco\\:Date, date>Date',
    dateType: 'gmd\\:dateType>gmd\\:CI_DateTypeCode, dateType>CI_DateTypeCode',
    // Presentation form
    dataPresentationForm: 'gmd\\:presentationForm>gmd\\:CI_PresentationFormCode, presentationForm>CI_PresentationFormCode',
    // Identifiers
    dataIdentifiers: 'gmd\\:identifier>gmd\\:RS_Identifier, identifier>RS_Identifier',
    dataCode: 'gmd\\:code>gco\\:CharacterString, code>CharacterString',
    dataCodeSpace: 'gmd\\:codeSpace>gco\\:CharacterString, codeSpace>CharacterString',
    dataAbstract: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:abstract>gco\\:CharacterString, identificationInfo>MD_DataIdentification>abstract>CharacterString',
    serviceAbstract: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:abstract>gco\\:CharacterString, identificationInfo>SV_ServiceIdentification>abstract>CharacterString',
    // Contacts: tableau d'objets
    dataPointOfContacts: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:pointOfContact>gmd\\:CI_ResponsibleParty, identificationInfo>MD_DataIdentification>pointOfContact>CI_ResponsibleParty',
    servicePointOfContacts: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:pointOfContact>gmd\\:CI_ResponsibleParty, identificationInfo>SV_ServiceIdentification>pointOfContact>CI_ResponsibleParty',
    // Browsegraphic
    dataBrowseGraphics: 'gmd\\:graphicOverview>gmd\\:MD_BrowseGraphic, graphicOverview>MD_BrowseGraphic',
    dataBrowseGraphic_Name: 'gmd\\:fileName>gco\\:CharacterString, fileName>CharacterString',
    dataBrowseGraphic_Description: 'gmd\\:fileDescription>gco\\:CharacterString, fileDescription>CharacterString',
    dataBrowseGraphic_Type: 'gmd\\:fileType>gco\\:CharacterString, fileType>CharacterString',
    // Keywords
    dataKeywords: 'gmd\\:descriptiveKeywords>gmd\\:MD_Keywords, descriptiveKeywords>MD_Keywords',
    dataKeyword: 'gmd\\:keyword>gco\\:CharacterString, keyword>CharacterString',
    dataKeywordType: 'gmd\\:type>gmd\\:MD_KeywordTypeCode, type>MD_KeywordTypeCode',
    dataThesaurus: '',
    dataThesaurusName: 'gmd\\:thesaurusName>gmd\\:CI_Citation>gmd\\:title>gco\\:CharacterString, thesaurusName>CI_Citation>title>CharacterString',
    dataThesaurusDates: 'gmd\\:thesaurusName>gmd\\:CI_Citation>gmd\\:date>gmd\\:CI_Date, thesaurusName>CI_Citation>date>CI_Date',
    //'Data_ThesaurusDate: 'gmd\\:date>gco\\:Date, date Date',
    //'Data_ThesaurusDateType: 'gmd\\:dateType>gmd\\:CI_DateTypeCode, dateType CI_DateTypeCode',

    // Limits and constraints
    // Uselimitations (information)
    dataUseLimitations: 'gmd\\:resourceConstraints>gmd\\:MD_Constraints>gmd\\:useLimitation, resourceConstraints>MD_Constraints>useLimitation',
    //dataUseLimitation: 'gco\\:CharacterString, CharacterString',

    // Legal constraints
    //Data_LegalConstraints: 'gmd\\:resourceConstraints>gmd\\:MD_LegalConstraints',
    // Legal Uselimitations
    dataLegalUseLimitations: 'gmd\\:resourceConstraints>gmd\\:MD_LegalConstraints>gmd\\:useLimitation, resourceConstraints>MD_LegalConstraints>useLimitation',
    //dataLegalUseLimitation: 'gco\\:CharacterString, CharacterString',
    // Legal UseContraints
    dataLegalUseConstraints: 'gmd\\:resourceConstraints>gmd\\:MD_LegalConstraints>gmd\\:useConstraints, resourceConstraints>MD_LegalConstraints>useConstraints',
    // Legal AccessConstraints
    dataLegalAccessConstraints: 'gmd\\:resourceConstraints>gmd\\:MD_LegalConstraints>gmd\\:accessConstraints, resourceConstraints>MD_LegalConstraints>accessConstraints',
    // RestrictionCode : for Legal UseConstraints and Legal AccessConstraints
    dataRestrictionCode: 'gmd\\:MD_RestrictionCode, MD_RestrictionCode',
    // Legal AccessOtherConstraints
    dataLegalAccessOtherConstraints: 'gmd\\:resourceConstraints>gmd\\:MD_LegalConstraints>gmd\\:otherConstraints, resourceConstraints>MD_LegalConstraints>otherConstraints',
    dataOtherConstraint: 'gco\\:CharacterString,CharacterString',
    //'Data_AccessConstraint_OthersConstraints: 'gmd\\:resourceConstraints>gmd\\:MD_LegalConstraints>gmd\\:otherConstraints, resourceConstraints MD_LegalConstraints otherConstraints',
    // Data_OtherConstraint: 'gmd\\:otherConstraints>gco\\:CharacterString, otherConstraints>CharacterString',
    //'Data_AccessConstraint_OthersConstraints: 'gmd\\:resourceConstraints>gmd\\:MD_LegalConstraints>gmd\\:otherConstraints>gco\\:CharacterString, resourceConstraints>MD_LegalConstraints>otherConstraints>CharacterString',
    //'Data_UseConstraint': '',
    //OtherConstraints
    //'Data_OtherConstraints: 'gmd\\:otherConstraints>gco\\:CharacterString',
    //'Data_OtherConstraint': '',
    // Fin de LegalConstraints
    // Security UseLimitations
    dataSecurity_UseLimitations: 'gmd\\:resourceConstraints>gmd\\:MD_SecurityConstraints>gmd\\:useLimitation, resourceConstraints>MD_SecurityConstraints>useLimitation',
    characterString: 'gco\\:CharacterString, CharacterString',
    // Security Classification = data_security_classification
    dataSecurity_Classification: 'gmd\\:resourceConstraints>gmd\\:MD_SecurityConstraints>gmd\\:classification>gmd\\:MD_ClassificationCode, resourceConstraints>MD_SecurityConstraints>classification>MD_ClassificationCode',

    dataSpatialRepresentationType: 'gmd\\:spatialRepresentationType>gmd\\:MD_SpatialRepresentationTypeCode, spatialRepresentationType>MD_SpatialRepresentationTypeCode',
    dataScaleDenominator: 'gmd\\:MD_RepresentativeFraction>gmd\\:denominator>gco\\:Integer, MD_RepresentativeFraction>denominator>Integer',
    dataScaleDistance: 'gmd\\:spatialResolution>gmd\\:MD_Resolution>gmd\\:distance>gco\\:Distance, spatialResolution>MD_Resolution>distance>Distance',
    // Languages
    dataLanguages: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:language, identificationInfo>MD_DataIdentification>language',
    serviceLanguages: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:language, identificationInfo>SV_ServiceIdentification>language',
    dataLanguage: 'gmd\\:LanguageCode, LanguageCode',
    dataCharacterSet: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:characterSet>gmd\\:MD_CharacterSetCode, identificationInfo>MD_DataIdentification>characterSet>MD_CharacterSetCode',
    serviceCharacterSet: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:characterSet>gmd\\:MD_CharacterSetCode, identificationInfo>SV_ServiceIdentification>characterSet>MD_CharacterSetCode',
    // TopicCategories
    dataTopicCategories: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:topicCategory, identificationInfo>MD_DataIdentification>topicCategory',
    serviceTopicCategories: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:topicCategory, identificationInfo>SV_ServiceIdentification>topicCategory',
    dataTopicCategory: 'gmd\\:MD_TopicCategoryCode, MD_TopicCategoryCode',
    // Extents
    dataExtents: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:extent>gmd\\:EX_Extent, identificationInfo>MD_DataIdentification>extent>EX_Extent',
    serviceExtents: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:extent>gmd\\:EX_Extent, identificationInfo>SV_ServiceIdentification>extent>EX_Extent',
    dataExtentName: 'gmd\\:description>gco\\:CharacterString, description>CharacterString',
    // GeographicExtents
    dataGeographicExtent: '',
    dataExtentNorthbound: 'gmd\\:geographicElement>gmd\\:EX_GeographicBoundingBox>gmd\\:northBoundLatitude>gco\\:Decimal, geographicElement EX_GeographicBoundingBox northBoundLatitude Decimal',
    dataExtentSouthbound: 'gmd\\:geographicElement>gmd\\:EX_GeographicBoundingBox>gmd\\:southBoundLatitude>gco\\:Decimal, geographicElement EX_GeographicBoundingBox southBoundLatitude Decimal',
    dataExtentEastbound: 'gmd\\:geographicElement>gmd\\:EX_GeographicBoundingBox>gmd\\:eastBoundLongitude>gco\\:Decimal, geographicElement EX_GeographicBoundingBox eastBoundLongitude Decimal',
    dataExtentWestbound: 'gmd\\:geographicElement>gmd\\:EX_GeographicBoundingBox>gmd\\:westBoundLongitude>gco\\:Decimal, geographicElement EX_GeographicBoundingBox westBoundLongitude Decimal',
    // TemporalExtents
    dataTemporalExtent: '',
    dataTemporalExtent_Begin: 'gmd\\:temporalElement>gmd\\:EX_TemporalExtent>gmd\\:extent>gml\\:TimePeriod>gml\\:beginPosition, temporalElement EX_TemporalExtent extent TimePeriod beginPosition',
    dataTemporalExtent_End: 'gmd\\:temporalElement>gmd\\:EX_TemporalExtent>gmd\\:extent>gml\\:TimePeriod>gml\\:endPosition, temporalElement EX_TemporalExtent extent TimePeriod endPosition',
    // VerticalExtents
    dataVerticalExtents: '',
    dataVerticalExtent_Max: '',
    dataVerticalExtent_Unit: '',
    dataVerticalExtent_Ref: '',
    // DistInfo
    dataMdDistribution: 'gmd\\:distributionInfo>gmd\\:MD_Distribution, distributionInfo MD_Distribution',
    dataDigitalTransfertOptions: 'gmd\\:transferOptions>gmd\\:MD_DigitalTransferOptions, transferOptions>MD_DigitalTransferOptions',
    // DistributionFormats
    dataDistributionFormats: 'gmd\\:distributionInfo>gmd\\:MD_Distribution>gmd\\:distributionFormat>gmd\\:MD_Format, distributionInfo>MD_Distribution>distributionFormat>MD_Format',
    dataDistributionFormatName: 'gmd\\:name>gco\\:CharacterString, name>CharacterString',
    dataDistributionFormatVersion: 'gmd\\:version>gco\\:CharacterString, version>CharacterString',
    dataDistributionFormatSpecification: 'gmd\\:specification>gco\\:CharacterString, specification>CharacterString',
    // Linkages
    dataLinkages: 'gmd\\:distributionInfo>gmd\\:MD_Distribution>gmd\\:transferOptions>gmd\\:MD_DigitalTransferOptions>gmd\\:onLine>gmd\\:CI_OnlineResource, distributionInfo>MD_Distribution>transferOptions>MD_DigitalTransferOptions>onLine>CI_OnlineResource',
    dataLinkageName: 'gmd\\:name>gco\\:CharacterString, name>CharacterString, gmd\\:name>gmx\\:MimeFileType, name>MimeFileType',
    dataLinkageDescription: 'gmd\\:description>gco\\:CharacterString, description>CharacterString',
    dataLinkageURL: 'gmd\\:linkage>gmd\\:URL, linkage>URL',
    dataLinkageProtocol: 'gmd\\:protocol>gco\\:CharacterString, protocol>CharacterString',
    dataMaintenanceFrequency: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:resourceMaintenance>gmd\\:MD_MaintenanceInformation>gmd\\:maintenanceAndUpdateFrequency>gmd\\:MD_MaintenanceFrequencyCode, identificationInfo>MD_DataIdentification>resourceMaintenance>MD_MaintenanceInformation>maintenanceAndUpdateFrequency>MD_MaintenanceFrequencyCode',
    serviceMaintenanceFrequency: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:resourceMaintenance>gmd\\:MD_MaintenanceInformation>gmd\\:maintenanceAndUpdateFrequency>gmd\\:MD_MaintenanceFrequencyCode, identificationInfo>SV_ServiceIdentification>resourceMaintenance>MD_MaintenanceInformation>maintenanceAndUpdateFrequency>MD_MaintenanceFrequencyCode',
    dataDqDataQuality: 'gmd\\:dataQualityInfo>gmd\\:DQ_DataQuality, dataQualityInfo>DQ_DataQuality',
    dataDqLevel: 'gmd\\:dataQualityInfo>gmd\\:DQ_DataQuality>gmd\\:scope>gmd\\:DQ_Scope>gmd\\:level>gmd\\:MD_ScopeCode, dataQualityInfo>DQ_DataQualityscope>DQ_Scope>level>MD_ScopeCode',
    // Conformities
    dataDqConformities: 'gmd\\:dataQualityInfo>gmd\\:DQ_DataQuality>gmd\\:report, dataQualityInfo>DQ_DataQuality>report',
    dataDqConformityTest: 'gmd\\:DQ_DomainConsistency>gmd\\:result>gmd\\:DQ_ConformanceResult>gmd\\:specification>gmd\\:CI_Citation>gmd\\:title>gco\\:CharacterString, DQ_DomainConsistency>result>DQ_ConformanceResult>specification CI_Citation>title>CharacterString',
    dataDqConformityDates: 'gmd\\:DQ_DomainConsistency>gmd\\:result>gmd\\:DQ_ConformanceResult>gmd\\:specification>gmd\\:CI_Citation>gmd\\:date>gmd\\:CI_Date, DQ_DomainConsistency>result>DQ_ConformanceResult>specification>CI_Citation>date>CI_Date',
    //'Data_DQ_ConformityDate: 'gmd\\:date>gco\\:Date, date Date',
    //'Data_DQ_ConformityDateType: 'gmd\\:dateType>gmd\\:CI_DateTypeCode, dateType CI_DateTypeCode',
    dataDqConformityResult: 'gmd\\:DQ_DomainConsistency>gmd\\:result>gmd\\:DQ_ConformanceResult>gmd\\:explanation>gco\\:CharacterString, DQ_DomainConsistency>result>DQ_ConformanceResult>explanation>CharacterString',
    dataDqConformityPass: 'gmd\\:DQ_DomainConsistency>gmd\\:result>gmd\\:DQ_ConformanceResult>gmd\\:pass>gco\\:Boolean, DQ_DomainConsistency>result>DQ_ConformanceResult>pass>Boolean',
    dataLiLineage: 'gmd\\:lineage>gmd\\:LI_Lineage, lineage>LI_Lineage',
    dataLiStatement: 'gmd\\:lineage>gmd\\:LI_Lineage>gmd\\:statement>gco\\:CharacterString, lineage>LI_Lineage>statement>CharacterString',
    //'Data_LI_ProcessStep': '',
    //'Data_LI_Source': '',
    // Contact
    cntName: 'gmd\\:individualName>gco\\:CharacterString, individualName>CharacterString',
    cntFunction: 'gmd\\:positionName>gco\\:CharacterString, positionName>CharacterString',
    cntOrganism: 'gmd\\:organisationName>gco\\:CharacterString, organisationName>CharacterString',
    cntAddress: 'gmd\\:contactInfo>gmd\\:CI_Contact>gmd\\:address>gmd\\:CI_Address>gmd\\:deliveryPoint>gco\\:CharacterString, contactInfo>CI_Contact>address>CI_Address>deliveryPoint>CharacterString',
    cntPostalCode: 'gmd\\:contactInfo>gmd\\:CI_Contact>gmd\\:address>gmd\\:CI_Address>gmd\\:postalCode>gco\\:CharacterString, contactInfo>CI_Contact>address>CI_Address>postalCode>CharacterString',
    cntCity: 'gmd\\:contactInfo>gmd\\:CI_Contact>gmd\\:address>gmd\\:CI_Address>gmd\\:city>gco\\:CharacterString, contactInfo CI_Contact>address>CI_Address>city>CharacterString',
    cntPhone: 'gmd\\:contactInfo>gmd\\:CI_Contact>gmd\\:phone>gmd\\:CI_Telephone>gmd\\:voice>gco\\:CharacterString, contactInfo>CI_Contact>phone>CI_Telephone>voice>CharacterString',
    cntEmail: 'gmd\\:contactInfo>gmd\\:CI_Contact>gmd\\:address>gmd\\:CI_Address>gmd\\:electronicMailAddress>gco\\:CharacterString, contactInfo>CI_Contact>address>CI_Address>electronicMailAddress>CharacterString',
    cntLogo: 'gmd\\:contactInfo>gmd\\:CI_Contact>gmd\\:contactInstructions>gmx\\:FileName, contactInfo>CI_Contact>contactInstructions>FileName',
    cntRole: 'gmd\\:role>gmd\\:CI_RoleCode, role>CI_RoleCode'
};

}(window.md = window.md || {}));
jQuery(function(md, undefined) {

    /**
     * empty_json main object
     * lends md
     * @type {Object}
     */
    md.empty_js = {};

    /**
     * Empty contact object
     * lends md.empty_json
     * @type {Array}
     */
    md.empty_js.contact = {
        name: '',
        position: '',
        organisation: '',
        address: '',
        cp: '',
        city: '',
        phone: '',
        email: '',
        role: '',
        logo_text: '',
        logo_url: ''
    };

    /**
     * Empty date object
     * lends md.empty_json
     * @type {Array}
     */
    md.empty_js.date = {
        type: '',
        date: ''
    };

    /**
     * Empty resource identifier object
     * @type {Array}
     */
    md.empty_js.identifier = {
        code: '',
        codespace: ''
    };

    /**
     * Empty geographic extent object
     * @type {Array}
     */
    md.empty_js.geographicextent = {
        name: '',
        xmin: '',
        xmax: '',
        ymin: '',
        ymax: ''
    };

    /**
     * Empty browse graphic object
     * @type {Array}
     */
    md.empty_js.browsegraphic = {
        url: '',
        description: '',
        type: ''
    };

    /**
     * Empty temporal extent object
     * @type {Array}
     */
    md.empty_js.temporalextent = {
        begin: '',
        end: '',
        description: ''
    };

    /**
     * Empty keyword object
     * @type {Array}
     */
    md.empty_js.keyword = {
        keyword: '',
        type: '',
        thesaurus_name: '',
        thesaurus_dates: [{
            type: '',
            date: ''
        }]
    };

    /**
     * Empty inspire keyword object
     * @type {Array}
     */
    md.empty_js.inspirekeyword = {
        keyword: '',
        type: '',
        thesaurus_name: 'GEMET - INSPIRE themes, version 1.0',
        thesaurus_dates: [{
            type: 'publication',
            date: '2008-06-01'
        }]
    };

    /**
     * Empty reference system object
     * @type {Array}
     */
    md.empty_js.referencesystem = {
        code: '',
        codespace: ''
    };

    /**
     * Empty data format object
     * @type {Array}
     */
    md.empty_js.distributionformat = {
        name: '',
        version: '',
        specification: ''
    };

    /**
     * Empty linkage object
     * @type {Array}
     */
    md.empty_js.linkage = {
        name: '',
        description: '',
        url: '',
        protocol: ''
    };

    /**
     * Empty data quality conformity object
     * @type {Array}
     */
    md.empty_js.dq_conformity = {
        specification: '',
        explaination: '',
        pass: '',
        dates: [{
            type: '',
            date: ''
        }]
    };

    /**
     * Empty metdata object
     * @type {Array}
     */
    md.empty_js.metadata = {
        md_fileidentifier: '',
        md_language: '',
        md_characterset: '',
        md_hierarchylevel: '',
        md_contacts: [],
        md_datestamp: '',
        md_standardname: '',
        md_standardversion: '',
        data_title: '',
        data_dates: [],
        data_datecreation: '',
        data_datepublication: '',
        data_daterevision: '',
        data_identifiers: [],
        data_abstract: '',
        data_browsegraphics: [],
        data_maintenancefrequencycode: '',
        data_temporalextents: [],
        data_languages: [],
        data_topiccategories: [],
        data_keywords: [],
        data_inspirekeywords: [],
        data_keywords_list: '',
        data_pointofcontacts: [],
        data_geographicextents: [],
        data_referencesystems: [],
        data_presentationform: '',
        data_spatialrepresentationtype: '',
        data_scaledenominator: '',
        data_scaledistance: '',
        data_dq_level: '',
        data_li_statement: '',
        data_characterset: '',
        data_distributionformats: [],
        data_uselimitations: [],
        data_legal_uselimitations: [],
        data_legal_useconstraints: [],
        data_legal_accessconstraints: [],
        data_legal_accessinspireconstraints: [],
        data_legal_accessotherconstraints: [],
        data_security_classification: '',
        data_security_uselimitations: [],
        data_linkages: [],
        data_dq_inspireconformities: [],
        data_dq_conformities: []
    };

}(window.md = window.md || {}));
jQuery(function(md, undefined) {

    var defaut_json = {
        cigal: {
            md_language: 'fre',
            md_characterset: 'utf8',
            md_hierarchylevel: 'dataset',
            md_standardname: 'ISO 19115/19139',
            md_standardversion: 'Cor 1:2006',
            data_maintenancefrequencycode: 'unknown',
            data_languages: ['fre'],
            data_spatialrepresentationtype: 'vector',
            data_dq_level: 'dataset',
            data_characterset: 'utf8',
            data_legal_accessinspireconstraints: ['Pas de restriction d\'accès public'],
            data_security_classification: 'unclassified',
        }
    };

}(window.md = window.md || {}));
jQuery(function(md, undefined) {
    "use strict";

    /**
     * @class md.MetadataObj
     * @property {Object} baseXml  - XML base source metadata
     * @property {Object} obj   - object source metadata
     * @property {Object} xml   - XML result metadata
     * @property {List} errors   - list of errors of converting object to XML
     */
    md.MetadataObj = function(obj, baseXml) {
        this.obj = this.setObj(obj);
        this.baseXml = this.setBaseXml(baseXml);
        this.xml = this.baseXml;
        this.errors = [];
    };

    /**
     * Set obj property of md.MetadataObj object
     * @param  {String} obj - obj source metadata
     * @return {String} obj source metadata
     */
    md.MetadataObj.prototype.setObj = function(obj) {
        this.obj = obj || undefined;
        return this.obj;
    };

    /**
     * Get obj property
     * @return {String} XML base source metadata
     */
    md.MetadataObj.prototype.getObj = function() {
        return this.obj;
    };

    /**
     * Set baseXml property of md.MetadataObj object
     * @param  {String} baseXml - XML base source metadata
     * @return {String} XML base source metadata
     */
    md.MetadataObj.prototype.setBaseXml = function(baseXml) {
        this.baseXml = baseXml || md.defaultBaseXml;
        return this.baseXml;
    };

    /**
     * Get baseXml property
     * @return {String} XML base source metadata
     */
    md.MetadataObj.prototype.getBaseXml = function() {
        return this.baseXml;
    };

    /**
     * Get XML file
     * @param {Object} options - configuration object
     * var options = {
     * 		'append': false // if false, remove items in node before add new one
     * 	};
     * @return {String} XML metadata file content or False
     */
    md.MetadataObj.prototype.getMetadataXml = function(options) {
        var append = options.append || false;
        var $xmlDoc = jQuery.parseXML(this.xml);
        var $xml = jQuery($xmlDoc);
        var $root = $xml.find(':root');

        // md_fileidentifier
        var $md_fileidentifier = $root.find(md.xpaths.mdFileIdentifier).remove();
        var md_fileidentifier = this.checkValue_(this.obj, 'md_fileidentifier', md.guid());
        $root.append(this.convertObj2Xml(this.getXmlObjFileIdentifier(md_fileidentifier)));

        // md_language
        var $md_language = $root.find(md.xpaths.mdLanguage).remove();
        var md_language = this.checkValue_(this.obj, 'md_language', md.config.userLanguage);
        $root.append(this.convertObj2Xml(this.getXmlObjLanguage(this, md_language)));

        // md_characterset
        var $md_characterset = $root.find(md.xpaths.mdCharacterSet).remove();
        var md_characterset = this.checkValue_(this.obj, 'md_characterset', 'utf8');
        $root.append(this.convertObj2Xml(this.getXmlObjCharacterSet(md_characterset)));

        // md_HierarchyLevel
        var $md_hierarchylevel = $root.find(md.xpaths.mdHierarchyLevel).remove();
        var md_hierarchylevel = this.checkValue_(this.obj, 'md_hierarchylevel');
        $root.append(this.convertObj2Xml(this.getXmlObjHierarchyLevel(md_hierarchylevel)));

        // md_contacts
        if (!append) $root.find(md.xpaths.mdContacts).remove();
        $root.append(this.convertObj2Xml(this.getXmlObjContacts('md_contacts')));

        // md_datestamp
        if (!append) $root.find(md.xpaths.mdDateStamp).remove();
        var md_datestamp = this.checkValue_(this.obj, 'md_datestamp', this.getCurrentDate());
        $root.append(this.convertObj2Xml(this.getXmlObjDateStamp(md_datestamp)));

        // md_standardname
        if (!append) $root.find(md.xpaths.mdStandardName).remove();
        var md_standardname = this.checkValue_(this.obj, 'md_standardname');
        $root.append(this.convertObj2Xml(this.getXmlObjMdStandardName(md_standardname)));

        // md_standardversion
        if (!append) $root.find(md.xpaths.mdStandardVersion).remove();
        var md_standardversion = this.checkValue_(this.obj, 'md_standardversion');
        $root.append(this.convertObj2Xml(this.getXmlObjMdStandardVersion(md_standardversion)));

        // DATA
        // data_referencesystem
        if (!append) $root.find(md.xpaths.dataReferenceSystems).remove();
        $root.append(this.getXmlList({
            name: 'data_referencesystems',
            getXmlObj: this.getXmlObjDataReferenceSystem
        }));

        // IDENTIFICATION INFO
        var mdDataIdentification = {
            nameSpace: 'gmd',
            nameNode: 'identificationInfo',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_DataIdentification'
            }]
        };
        var $md_dataidentification = this.addNodeIfNotExists($root, md.xpaths.dataMdIdentification, mdDataIdentification);

        // CI_CITAION
        var ciCitation = {
            nameSpace: 'gmd',
            nameNode: 'citation',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'CI_Citation'
            }]
        };
        var $ci_citation = this.addNodeIfNotExists($md_dataidentification, md.xpaths.dataCiCitation, ciCitation);

        // data_title
        if (!append) $root.find(md.xpaths.dataTitle).remove();
        var data_title = this.checkValue_(this.obj, 'data_title');
        $ci_citation.append(this.convertObj2Xml(this.getXmlObjDataTitle(data_title)));

        // data_dates
        if (!append) $root.find(md.xpaths.dataDates).remove();
        $ci_citation.append(this.getXmlList({
            name: 'data_dates',
            getXmlObj: this.getXmlObjDataDate
        }));

        // data_identifier
        var default_dataIdentifiers = [{
            code: md_fileidentifier,
            codespace: 'md_fileidentifier'
        }];
        if (!append) $root.find(md.xpaths.dataIdentifiers).remove();
        $ci_citation.append(this.getXmlList({
            name: 'data_identifiers',
            obj: this.checkValue_(this.obj, 'data_identifiers', default_dataIdentifiers),
            getXmlObj: this.getXmlObjDataIdentifier
        }));

        // data_abstract
        if (!append) $root.find(md.xpaths.dataAbstract).remove();
        var data_abstract = this.checkValue_(this.obj, 'data_abstract');
        $md_dataidentification.append(this.convertObj2Xml(this.getXmlObjDataAbstract()));

        // data_contacts
        if (!append) $root.find(md.xpaths.dataContacts).remove();
        $md_dataidentification.append(this.convertObj2Xml(this.getXmlObjContacts('data_pointofcontacts')));

        // data_maintenancefrequencycode
        if (!append) $root.find(md.xpaths.dataMaintenanceFrequency).remove();
        var data_maintenancefrequencycode = this.checkValue_(this.obj, 'data_maintenancefrequencycode', 'unknown');
        $md_dataidentification.append(this.convertObj2Xml(this.getXmlObjDataMaintenancefrequencyCode(data_maintenancefrequencycode)));

        // data_browsegraphics
        if (!append) $root.find(md.xpaths.dataBrowseGraphics).remove();
        $md_dataidentification.append(this.getXmlList({
            name: 'data_browsegraphics',
            getXmlObj: this.getXmlObjDataBrowseGraphic
        }));

        // data_keywords
        if (!append) $root.find(md.xpaths.dataKeywords).remove();
        $md_dataidentification.append(this.getXmlList({
            name: 'data_keywords',
            getXmlObj: this.getXmlObjDataKeyword
        }));
        $md_dataidentification.append(this.getXmlList({
            name: 'data_inspirekeywords',
            getXmlObj: this.getXmlObjDataKeyword
        }));

        // data_uselimitations
        if (!append) $root.find(md.xpaths.dataUseLimitations).remove();
        $md_dataidentification.append(this.getXmlList({
            name: 'data_uselimitations',
            getXmlObj: this.getXmlObjUseLimitation
        }));

        // md_legalconstraints
        var mdLegalConstraints = {
            nameSpace: 'gmd',
            nameNode: 'resourceConstraints',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_LegalConstraints'
            }]
        };
        var $md_legalconstraints = this.addNodeIfNotExists($md_dataidentification, md.xpaths.dataMdLegalConstraints, mdLegalConstraints);

        // data_legal_uselimitations
        if (!append) $root.find(md.xpaths.dataLegalUseLimitations).remove();
        $md_legalconstraints.append(this.getXmlList({
            name: 'data_legal_uselimitations',
            getXmlObj: this.getXmlObjUseLimitation
        }));

        // data_legal_useconstraints
        if (!append) $root.find(md.xpaths.dataLegalUseConstraints).remove();
        $md_legalconstraints.append(this.getXmlList({
            name: 'data_legal_useconstraints',
            getXmlObj: this.getXmlObjUseConstraint
        }));

        // data_legal_accessconstraints & data_legal_accessinspireconstraints
        if (!append) $root.find(md.xpaths.dataLegalAccessConstraints).remove();
        $md_legalconstraints.append(this.getXmlList({
            name: 'data_legal_accessconstraints',
            getXmlObj: this.getXmlObjAccessConstraint
        }));

        // data_legal_accessotherconstraints
        if (!append) $root.find(md.xpaths.dataLegalAccessOtherConstraints).remove();
        $md_legalconstraints.append(this.getXmlList({
            name: 'data_legal_accessotherconstraints',
            getXmlObj: this.getXmlObjOtherConstraint
        }));
        $md_legalconstraints.append(this.getXmlList({
            name: 'data_legal_accessinspireconstraints',
            getXmlObj: this.getXmlObjOtherConstraint
        }));

        // dataMdSecurityConstraints
        var mdSecurityConstraints = {
            nameSpace: 'gmd',
            nameNode: 'resourceConstraints',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_SecurityConstraints'
            }]
        };
        var $md_securityconstraints = this.addNodeIfNotExists($md_dataidentification, md.xpaths.dataMdSecurityConstraints, mdSecurityConstraints);

        // data_security_classification
        if (!append) $root.find(md.xpaths.dataSecurity_Classification).remove();
        var data_security_classification = this.checkValue_(this.obj, 'data_security_classification', 'unclassified');
        $md_securityconstraints.append(this.convertObj2Xml(this.getXmlObjClassification(data_security_classification)));

        // data_security_uselimitations
        if (!append) $root.find(md.xpaths.dataSecurity_UseLimitations).remove();
        $md_securityconstraints.append(this.getXmlList({
            name: 'data_security_uselimitations',
            getXmlObj: this.getXmlObjUseLimitation
        }));

        // data_SpatialRepresentationType
        if (!append) $root.find(md.xpaths.dataSpatialRepresentationType).remove();
        var data_spatialrepresentationtype = this.checkValue_(this.obj, 'data_spatialrepresentationtype');
        $md_dataidentification.append(this.convertObj2Xml(this.getXmlObjSpatialRepresentationType(data_spatialrepresentationtype)));

        // data_ScaleDenominator / data_ScaleDistance
        // dataMdResolution
        var mdResolution = {
            nameSpace: 'gmd',
            nameNode: 'spatialResolution',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_Resolution'
            }]
        };
        var $md_resolution = this.addNodeIfNotExists($md_dataidentification, md.xpaths.dataMdResolution, mdResolution);
        if (!append) $root.find(md.xpaths.dataScaleDenominator).remove();
        var data_scaledenominator = this.checkValue_(this.obj, 'data_scaledenominator');
        $md_resolution.append(this.convertObj2Xml(this.getXmlObjScaleDenominator(data_scaledenominator)));
        if (!append) $root.find(md.xpaths.dataScaleDistance).remove();
        var data_scaledistance = this.checkValue_(this.obj, 'data_scaledistance');
        $md_resolution.append(this.convertObj2Xml(this.getXmlObjScaleDistance(data_scaledistance)));

        // data_Languages
        if (!append) $root.find(md.xpaths.dataLanguages).remove();
        $md_dataidentification.append(this.getXmlList({
            name: 'data_languages',
            getXmlObj: this.getXmlObjLanguage
        }));

        // data_CharacterSet
        if (!append) $root.find(md.xpaths.dataCharacterSet).remove();
        var data_characterset = this.checkValue_(this.obj, 'data_characterset', md_characterset);
        $md_dataidentification.append(this.convertObj2Xml(this.getXmlObjCharacterSet(data_characterset)));

        // data_topiccategories
        if (!append) $root.find(md.xpaths.dataTopicCategories).remove();
        $md_dataidentification.append(this.getXmlList({
            name: 'data_topiccategories',
            getXmlObj: this.getXmlObjTopicCategory
        }));

        // data_geographicextents
        // #TODO: corriger pb de suppression de tous les extents
        if (!append) $root.find(md.xpaths.Extents).remove();
        $md_dataidentification.append(this.getXmlList({
            name: 'data_geographicextents',
            getXmlObj: this.getXmlObjGeographicExtent
        }));
        // data_temporalextents
        // if (!append) $root.find(md.xpaths.Extents).remove();
        $md_dataidentification.append(this.getXmlList({
            name: 'data_temporalextents',
            getXmlObj: this.getXmlObjTemporalExtent
        }));
        // data_Extent
        $md_dataidentification.append(this.getXmlList({
            name: 'data_verticalextents',
            getXmlObj: this.getXmlObjVerticalExtent
        }));

        // DISTRIBUTION INFO
        var mdDistribution = {
            nameSpace: 'gmd',
            nameNode: 'distributionInfo',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_Distribution'
            }]
        };
        var $md_distribution = this.addNodeIfNotExists($root, md.xpaths.dataMdDistribution, mdDistribution);

        // data_distributionformats
        if (!append) $root.find(md.xpaths.dataDistributionFormats).remove();
        $md_distribution.append(this.getXmlList({
            name: 'data_distributionformats',
            getXmlObj: this.getXmlObjDistributionFormat
        }));

        // DIGITAL TRANSFERT OPTIONS
        var MD_DigitalTransferOptions = {
            nameSpace: 'gmd',
            nameNode: 'transferOptions',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_DigitalTransferOptions'
            }]
        };
        var $md_digitaltransferoptions = this.addNodeIfNotExists($md_distribution, md.xpaths.dataDigitalTransfertOptions, MD_DigitalTransferOptions);

        // data_linkages
        if (!append) $root.find(md.xpaths.dataLinkages).remove();
        $md_digitaltransferoptions.append(this.getXmlList({
            name: 'data_linkages',
            getXmlObj: this.getXmlObjLinkage
        }));

        // DATA QUALITY INFO
        var DQ_DataQuality = {
            nameSpace: 'gmd',
            nameNode: 'dataQualityInfo',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'DQ_DataQuality'
            }]
        };
        var $dq_dataquality = this.addNodeIfNotExists($root, md.xpaths.dataDqDataQuality, DQ_DataQuality);

        // data_dq_level
        if (!append) $root.find(md.xpaths.dataDqLevel).remove();
        var data_dq_level = this.checkValue_(this.obj, 'data_dq_level', md_hierarchylevel);
        $dq_dataquality.append(this.convertObj2Xml(this.getXmlObjScopeLevel(data_dq_level)));

        /*
        // #TODO: DQ_InspireConformity
        if (metadata.data_dq_inspireconformities) {
            var data_inspireconformities = xmlConformities(metadata.data_dq_inspireconformities, 'inspire', errors);
            xml += data_inspireconformities.xml;
            errors = data_inspireconformities.errors;
        }
        // #TODO: DQ_Conformity
        if (metadata.data_dq_conformities) {
            var data_conformities = xmlConformities(metadata.data_dq_conformities, '', errors);
            xml += data_conformities.xml;
            errors = data_conformities.errors;
        }
        */

        // DATA QUALITY LINEAGE
        var DQ_Lineage = {
            nameSpace: 'gmd',
            nameNode: 'lineage',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'LI_Lineage'
            }]
        };
        var $li_lineage = this.addNodeIfNotExists($dq_dataquality, md.xpaths.dataLiLineage, DQ_Lineage);

        // data_li_statement
        if (!append) $root.find(md.xpaths.dataLiStatement).remove();
        var data_li_statement = this.checkValue_(this.obj, 'data_li_statement');
        $li_lineage.append(this.convertObj2Xml(this.getXmlObjLiStatement(data_li_statement)));

       /*
        // #TODO: LI_ProcessStep
        if (metadata.data_li_processstep) {
            xml += '<gmd:processStep><gmd:LI_ProcessStep>\n';
            xml += '<gmd:description><gco:CharacterString>' + metadata.data_li_processstep + '</gco:CharacterString></gmd:description>\n';
            xml += '</gmd:LI_ProcessStep></gmd:processStep>\n';
        }
        // #TODO: LI_Source
        if (metadata.data_li_source) {
            xml += '<gmd:source><gmd:LI_Source>\n';
            xml += '<gmd:description><gco:CharacterString>' + metadata.data_li_source + '</gco:CharacterString></gmd:description>\n';
            xml += '</gmd:LI_Source></gmd:source>\n';
        }
        */

        this.xml = new XMLSerializer().serializeToString($xmlDoc);
        var regex = /( xmlns:[a-z]*="null")/igm;
        this.xml = this.xml.replace(regex, '');
        return this.xml;
    };

    /**
     * Convert object root to xml
     * @param  {Object} root - root node of object to construct XML
     * @param {Boolean} part - if true add header
     * xmlObj = {
     * 		root: {
     *   		nameSpace: 'ns',        // namespace of node
     *          nameNode: 'metadata',   // text of node
     *             attributes: {        // list of attributes
     *                 a_att1: 'att1',  // name and value of attribute
     *                 a_att2: 'att2',
     *             },
     *             children: [{         // list of children
     *                 nameSpace: 'ns',
     *                 nameNode: 'child1',
     *                 attributes: {
     *                     att1: 'att1',
     *                     att2: 'att2'
     *               }]
     *     };
     * @return {String} XML node
     */
    md.MetadataObj.prototype.convertObj2Xml = function(root, header) {
        header = header || false;
        var xmlEndArray = [];
        var list = [root];
        var old_level = -1;
        var xml = [];
        if (header) {
            xml.push('<?xml version="1.0" encoding="UTF-8"?>');
        }
        while (list.length > 0) {
            var node = list.pop();
            if (!node.level) node.level = 0;
            if (node.children) {
                // Define node level
                for (var child in node.children) {
                    node.children[child].level = node.level + 1;
                }
                // Add node to list to treat
                list = list.concat(node.children.reverse());
            }
            // Define node string
            var str_attributes = '';
            if (node.nameSpace) {
                node.fullName = node.nameSpace + ':' + node.nameNode;
                str_attributes += 'xmlns:' + node.nameSpace + '="null"';
            }
            if (node.attributes) {
                for (var attribut in node.attributes) {
                    if (node.attributes[attribut])
                        str_attributes += ' ' + attribut + '="' + node.attributes[attribut] + '"';
                }
            }
            var textNode = node.textNode || '';
            var sNodeBegin = '\n' + '<' + node.fullName + ' ' + str_attributes + '>';
            var sNodeEnd = textNode.trim() + '</' + node.fullName + '>' + '\n';
            // Manage tree crossing
            if (old_level < node.level) {
                xml.push(sNodeBegin);
            } else if (old_level == node.level) {
                xml.push(xmlEndArray.pop());
                xml.push(sNodeBegin);
            } else if (old_level > node.level) {
                for (var level = 0; level <= old_level - node.level; level++) {
                    xml.push(xmlEndArray.pop());
                }
                xml.push(sNodeBegin);
            }
            xmlEndArray.push(sNodeEnd);
            old_level = node.level;
        }
        // Add end of tree
        for (var xmlEnd in xmlEndArray.reverse()) {
            xml.push(xmlEndArray[xmlEnd]);
        }
        return xml.join('');
    };

    /**
     * Add node to doc if not exists
     * @param  {String} parent - parent to add node
     * @param  {String} xpath - xpath to check if node exists
     * @param  {String} obj - XML obj to add
     * @return {Object} XML node point to xpath
     */
    md.MetadataObj.prototype.addNodeIfNotExists = function($parent, xpath, obj) {
        var $node = $parent.find(xpath);
        if ($node.length === 0) {
            $parent.append(this.convertObj2Xml(obj));
        }
        return $parent.find(xpath);
    };

    /**
     * Set characterstring node object
     * @param  {String} textNode - text of node characterstring
     * @return {Object} object of characterstring node
     */
    md.MetadataObj.prototype.addCharacterString = function(textNode) {
        textNode = textNode || '';
        return {
            nameSpace: 'gco',
            nameNode: 'CharacterString',
            textNode: textNode
        };
    };

    /**
     * Set date node object
     * @param  {Object} date - date object
     * @return {Object} object of date node
     */
    md.MetadataObj.prototype.addDate = function(date) {
        date = date || {};
        return {
            nameSpace: 'gmd',
            nameNode: 'date',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'CI_Date',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'date',
                    children: [{
                        nameSpace: 'gco',
                        nameNode: 'Date',
                        textNode: date.date
                    }]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'dateType',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'CI_DateTypeCode',
                        attributes: {
                            codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode',
                            codeListValue: date.type
                        },
                        textNode: date.type
                    }]
                }]
            }]
        };
    };

    /**
     * Convert list of XML object to XML string
     * @return {Object} data_legal_useconstraints XML string
     */
    md.MetadataObj.prototype.getXmlList = function(options) {
        var self = this;
        var name = options.name;
        var obj = options.obj || self.checkValue_(self.obj, name);
        var getXmlObj = options.getXmlObj;
        var error = 1;
        var list = [];
        //dataLegalUseConstraints = dataLegalUseConstraints || this.checkValue_(this.obj, 'data_legal_useconstraints');
        if (obj.length !== 0) {
            obj.forEach(function(o, key) {
                error = 0;
                list.push(self.convertObj2Xml(getXmlObj(self, o)));
            });
        }
        if (error) {
            self.errors.push(name);
        }
        return list.join('\n');
    };


    /**
     * Check if property exists in object
     * @param {Object} object - object to check
     * @param {String} property - name of property to check
     * @param {String} defaultValue - default value
     * @return {String} value of property or default value
     */
    md.MetadataObj.prototype.checkValue_ = function(object, property, defaultValue) {
        object = object || {};
        property = property || false;
        defaultValue = defaultValue || '';
        if (property && object.hasOwnProperty(property)) {
            return object[property];
        }
        this.errors.push(property);
        return defaultValue;
    };

    /**
     * Get current date in YYYY-MM-DD format
     * @return {String} current date in YYYY-MM-DD format
     */
    md.MetadataObj.prototype.getCurrentDate = function() {
        var currentTime = new Date();
        var month = ((currentTime.getMonth() + 1) < 10 ? '0' : '') + (currentTime.getMonth() + 1);
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        return year + '-' + month + '-' + day;
    };

    /**
     * Get md_fileidentifier XML object
     * @return {String} md_fileidentifier XML object
     */
    md.MetadataObj.prototype.getXmlObjFileIdentifier = function(textNode) {
        //textNode = textNode || this.checkValue_(this.obj, 'md_fileidentifier', md.guid());
        return {
            nameSpace: 'gmd',
            nameNode: 'fileIdentifier',
            children: [this.addCharacterString(textNode)]
        };
    };

    /**
     * Get language XML object
     * @return {Object} language XML object
     */
    md.MetadataObj.prototype.getXmlObjLanguage = function(self, textNode) {
        //textNode = textNode || this.checkValue_(this.obj, 'md_language', md.config.userLanguage);
        return {
            nameSpace: 'gmd',
            nameNode: 'language',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'LanguageCode',
                textNode: textNode,
                attributes: {
                    codelist: 'http://www.loc.gov/standards/iso639-2/',
                    codeListValue: textNode
                }
            }]
        };
    };

    /**
     * Get characterset XML object
     * @return {Object} characterset XML object
     */
    md.MetadataObj.prototype.getXmlObjCharacterSet = function(textNode) {
        // textNode = textNode || this.checkValue_(this.obj, 'md_characterset', 'utf8');
        return {
            nameSpace: 'gmd',
            nameNode: 'characterSet',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_CharacterSetCode ',
                textNode: textNode,
                attributes: {
                    codelist: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode',
                    codeListValue: textNode
                }
            }]
        };
    };


    /**
     * Get hierarchylevel XML object
     * @return {Object} hierarchylevel XML object
     */
    md.MetadataObj.prototype.getXmlObjHierarchyLevel = function(textNode) {
        //textNode = textNode || this.checkValue_(this.obj, 'md_hierarchylevel');
        return {
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_ScopeCode',
                textNode: textNode,
                attributes: {
                    codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                    codeListValue: textNode
                }
            }]
        };
    };

    /**
     * Get md_contacts XML object
     * @return {String} md_contacts XML object
     */
    md.MetadataObj.prototype.getXmlObjContacts = function(contactsType, contacts) {
        var self = this;
        contactsType = contactsType || 'data_pointofcontacts';
        contacts = contacts || self.checkValue_(self.obj, contactsType, []);
        var obj = {
            nameSpace: 'gmd',
            nameNode: 'pointOfContact',
            children: []
        };
        var cnt_organisation = 1;
        var cnt_email = 1;
        var cnt_error = 1;
        contacts.forEach(function(contact, key) {
            contact.role = self.checkValue_(contact, 'role', 'pointOfContact');
            if (contact) {
                //console.log(contacts);
                cnt_error = 0;
                var cntName = {
                    nameSpace: 'gmd',
                    nameNode: 'individualName',
                    children: [self.addCharacterString(contact.name)]
                };
                var cntOrganisation = {
                    nameSpace: 'gmd',
                    nameNode: 'organisationName',
                    children: [self.addCharacterString(contact.organisation)]
                };
                var cntPosition = {
                    nameSpace: 'gmd',
                    nameNode: 'positionName',
                    children: [self.addCharacterString(contact.position)]
                };

                var cntPhone = {
                    nameSpace: 'gmd',
                    nameNode: 'phone',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'CI_Telephone',
                        children: [{
                            nameSpace: 'gmd',
                            nameNode: 'voice',
                            children: [self.addCharacterString(contact.phone)]
                        }]
                    }]
                };

                var deliveryPoint = {
                    nameSpace: 'gmd',
                    nameNode: 'deliveryPoint',
                    children: [self.addCharacterString(contact.address)]
                };
                var city = {
                    nameSpace: 'gmd',
                    nameNode: 'city',
                    children: [self.addCharacterString(contact.city)]
                };
                var postalCode = {
                    nameSpace: 'gmd',
                    nameNode: 'postalCode',
                    children: [self.addCharacterString(contact.cp)]
                };
                var email = {
                    nameSpace: 'gmd',
                    nameNode: 'electronicMailAddress',
                    children: [self.addCharacterString(contact.email)]
                };

                var address = {
                    nameSpace: 'gmd',
                    nameNode: 'address',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'CI_Address',
                        children: [deliveryPoint, city, postalCode, email]
                    }]
                };
                var contactInstructions = {
                    nameSpace: 'gmd',
                    nameNode: 'contactInstructions',
                    children: [{
                        nameSpace: 'gmx',
                        nameNode: 'FileName',
                        textNode: contact.logo_text,
                        attributes: {
                            src: contact.logo_url
                        }
                    }]
                };

                var cntInfo = {
                    nameSpace: 'gmd',
                    nameNode: 'contactInfo',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'CI_Contact',
                        children: [cntPhone, address, contactInstructions]
                    }]
                };

                var cntRole = {
                    nameSpace: 'gmd',
                    nameNode: 'role',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'CI_RoleCode',
                        textNode: contact.role,
                        attributes: {
                            codelist: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_RoleCode',
                            codeListValue: contact.role
                        }
                    }]
                };
                var ciResponsibleParty = {
                    nameSpace: 'gmd',
                    nameNode: 'CI_ResponsibleParty',
                    children: [cntName, cntOrganisation, cntPosition, cntInfo, cntRole]
                };
                if (contact.organisation) cnt_organisation = 0;
                if (contact.email) cnt_email = 0;

                obj.children.push(ciResponsibleParty);
            }
        });
        // Define metadata or data contact
        if (contactsType == 'md_contacts') {
            obj.nameNode = 'contact';
            // Manage errors
            if (cnt_organisation) self.errors.push('md_contact_organisation');
            if (cnt_email) self.errors.push('md_contact_email');
            if (cnt_error) self.errors.push('md_contacts');
        } else {
            obj.nameNode = 'pointOfContact';
            // Manage errors
            if (cnt_organisation) self.errors.push('data_contact_organisation');
            if (cnt_email) self.errors.push('data_contact_email');
            if (cnt_error) self.errors.push('data_contacts');
        }
        return obj;
    };

    /**
     *  Get md_datestamp XML object
     *  @return {String} md_datestamp XML object
     */
    md.MetadataObj.prototype.getXmlObjDateStamp = function(textNode) {
        // textNode = textNode || this.checkValue_(this.obj, 'md_datestamp', md_datestamp);
        return {
            nameSpace: 'gmd',
            nameNode: 'dateStamp',
            children: [{
                nameSpace: 'gco',
                nameNode: 'Date',
                textNode: textNode
            }]
        };
    };

    /**
     * Get md_standardname XML object
     * @return {String} md_standardname XML object
     */
    md.MetadataObj.prototype.getXmlObjMdStandardName = function(textNode) {
        // textNode = textNode || this.checkValue_(this.obj, 'md_standardname');
        return {
            nameSpace: 'gmd',
            nameNode: 'metadataStandardName',
            children: [this.addCharacterString(textNode)]
        };
    };

    /**
     * Get md_standardversion XML object
     * @return {String} md_standardversion XML object
     */
    md.MetadataObj.prototype.getXmlObjMdStandardVersion = function(textNode) {
        // textNode = textNode || this.checkValue_(this.obj, 'md_standardversion');
        return {
            nameSpace: 'gmd',
            nameNode: 'metadataStandardVersion',
            children: [this.addCharacterString(textNode)]
        };
    };

    /**
     * Get data_referencesystem XML object
     * @return {String} data_referencesystem XML object
     */
    md.MetadataObj.prototype.getXmlObjDataReferenceSystem = function(self, dataReferencesystem) {
        return {
            nameSpace: 'gmd',
            nameNode: 'referenceSystemInfo',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_ReferenceSystem',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'referenceSystemIdentifier',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'RS_Identifier',
                        children: [{
                            nameSpace: 'gmd',
                            nameNode: 'code',
                            children: [self.addCharacterString(dataReferencesystem.code)]
                        }, {
                            nameSpace: 'gmd',
                            nameNode: 'codeSpace',
                            children: [self.addCharacterString(dataReferencesystem.codespace)]
                        }, {
                            // #TODO: add to js object
                            nameSpace: 'gmd',
                            nameNode: 'version',
                            children: [self.addCharacterString(dataReferencesystem.version)]
                        }]
                    }]
                }]
            }]
        };
    };

    /**
     * Get data_title XML object
     * @return {String} data_title XML object
     */
    md.MetadataObj.prototype.getXmlObjDataTitle = function(textNode) {
        return {
            nameSpace: 'gmd',
            nameNode: 'title',
            children: [this.addCharacterString(textNode)]
        };
    };

    /**
     * Get data_dates XML object
     * @return {String} data_dates XML object
     */
    md.MetadataObj.prototype.getXmlObjDataDate = function(self, date) {
        return self.addDate(date);
    };

    /***
     * Get data_identifier XML object
     * @return {String} data_identifier XML object
     */
    md.MetadataObj.prototype.getXmlObjDataIdentifier = function(self, dataIdentifier) {
        return {
            nameSpace: 'gmd',
            nameNode: 'identifier',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'RS_Identifier',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'code',
                    children: [self.addCharacterString(dataIdentifier.code)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'codeSpace',
                    children: [self.addCharacterString(dataIdentifier.codespace)]
                }]
            }]
        };
    };

    /**
     * Get data_abstract XML object
     * @return {Object} data_abstract XML object
     */
    md.MetadataObj.prototype.getXmlObjDataAbstract = function(textNode) {
        // textNode = textNode || this.checkValue_(this.obj, 'data_abstract');
        return {
            nameSpace: 'gmd',
            nameNode: 'abstract',
            children: [this.addCharacterString(textNode)]
        };
    };

    /**
     * Get data_maintenancefrequencycode XML object
     * @return {Object} data_maintenancefrequencycode XML object
     */
    md.MetadataObj.prototype.getXmlObjDataMaintenancefrequencyCode = function(textNode) {
        // textNode = textNode || this.checkValue_(this.obj, 'data_maintenancefrequencycode');
        return {
            nameSpace: 'gmd',
            nameNode: 'resourceMaintenance',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_MaintenanceInformation',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'maintenanceAndUpdateFrequency',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'MD_MaintenanceFrequencyCode',
                        attributes: {
                            codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_MaintenanceFrequencyCode',
                            codeListValue: textNode
                        },
                        textNode: textNode
                    }]
                }]
            }]
        };
    };

    /**
     * Get data_browsegraphic XML object
     * @return {Object} data_browsegraphic XML object
     */
    md.MetadataObj.prototype.getXmlObjDataBrowseGraphic = function(self, dataBrowseGraphic) {
        return {
            nameSpace: 'gmd',
            nameNode: 'graphicOverview',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_BrowseGraphic',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'fileName',
                    children: [self.addCharacterString(dataBrowseGraphic.url)]

                }, {
                    nameSpace: 'gmd',
                    nameNode: 'fileDescription',
                    children: [self.addCharacterString(dataBrowseGraphic.description)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'fileType',
                    children: [self.addCharacterString(dataBrowseGraphic.type)]
                }]
            }]
        };
    };

    /**
     * Get data_keywords XML object
     * @param {Object} dataKeywords
     * @return {Object} data_keywords XML object
     */
    md.MetadataObj.prototype.getXmlObjDataKeyword = function(self, dataKeyword) {
        var keyword = {
            nameSpace: 'gmd',
            nameNode: 'descriptiveKeywords',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_Keywords',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'keyword',
                    children: [self.addCharacterString(dataKeyword.keyword)]
                }]
            }]
        };
        if (dataKeyword.type) {
            var keywordType = {
                nameSpace: 'gmd',
                nameNode: 'type',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'MD_KeywordTypeCode',
                    attributes: {
                        codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_KeywordTypeCode',
                        codeListValue: dataKeyword.type
                    },
                    textNode: dataKeyword.type
                }]
            };
            keyword.children[0].children.push(keywordType);
        }
        if (dataKeyword.thesaurus_name) {
            var keywordTheasaurus = {
                nameSpace: 'gmd',
                nameNode: 'thesaurusName',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'CI_Citation',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'title',
                        children: [self.addCharacterString(dataKeyword.thesaurus_name)]
                    }]
                }]
            };
            if (dataKeyword.thesaurus_dates) {
                dataKeyword.thesaurus_dates.forEach(function(date, key) {
                    keywordTheasaurus.children[0].children.push(self.addDate(date));
                });
            }
            keyword.children[0].children.push(keywordTheasaurus);
        }
        return keyword;
    };

    /**
     * Get data_uselimitation object
     * @return {Object} data_legal_uselimitation XML object
     */
    md.MetadataObj.prototype.getXmlObjUseLimitation = function(self, dataLegalUseLimitation) {
        return {
            nameSpace: 'gmd',
            nameNode: 'useLimitation',
            children: [self.addCharacterString(dataLegalUseLimitation)]
        };
    };

    /**
     * Get data_legal_useconstraint XML object
     * @return {Object} data_legal_useconstraint XML object
     */
    md.MetadataObj.prototype.getXmlObjUseConstraint = function(self, useConstraint) {
        return {
            nameSpace: 'gmd',
            nameNode: 'useConstraints',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_RestrictionCode',
                attributes: {
                    codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode',
                    codeListValue: useConstraint
                },
                textNode: useConstraint
            }]
        };
    };


    /**
     * Get data_legal_accessconstraint XML object
     * @return {Object} data_legal_accessconstraint XML object
     */
    md.MetadataObj.prototype.getXmlObjAccessConstraint = function(self, accessConstraint) {
        return {
            nameSpace: 'gmd',
            nameNode: 'accessConstraints',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_RestrictionCode',
                attributes: {
                    codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode',
                    codeListValue: accessConstraint
                },
                textNode: accessConstraint
            }]
        };
    };

    /**
     * Get data_legal_accessinspireconstraints XML object
     * @return {Object} data_legal_accessinspireconstraints XML object
     */
    md.MetadataObj.prototype.getXmlObjOtherConstraint = function(self, otherconstraint) {
        return {
            nameSpace: 'gmd',
            nameNode: 'otherConstraints',
            children: [self.addCharacterString(otherconstraint)]
        };
    };

    /**
     * Get data_legal_accessotherconstraints XML object
     * @return {Object} data_legal_accessotherconstraints XML object
     */
    md.MetadataObj.prototype.getXmlObjClassification = function(textNode) {
        return {
            nameSpace: 'gmd',
            nameNode: 'classification',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_ClassificationCode',
                attributes: {
                    codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ClassificationCode',
                    codeListValue: textNode
                },
                textNode: textNode
            }]
        };
    };


    /**
     * Get data_spatialrepresentationtype XML object
     * @return {Object} data_spatialrepresentationtype XML object
     */
    md.MetadataObj.prototype.getXmlObjSpatialRepresentationType = function(textNode) {
        return {
            nameSpace: 'gmd',
            nameNode: 'spatialRepresentationType',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_SpatialRepresentationTypeCode',
                attributes: {
                    codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_SpatialRepresentationTypeCode',
                    codeListValue: textNode
                },
                textNode: textNode
            }]
        };
    };

    /**
     * Get data_scaledenominator XML object
     * @return {Object} data_scaledenominator XML object
     */
    md.MetadataObj.prototype.getXmlObjScaleDenominator = function(textNode) {
        return {
            nameSpace: 'gmd',
            nameNode: 'equivalentScale',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_RepresentativeFraction',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'denominator',
                    children: [{
                        nameSpace: 'gco',
                        nameNode: 'Integer',
                        textNode: textNode
                    }]
                }]
            }]
        };
    };

    /**
     * Get data_scaledistance XML object
     * @return {Object} data_scaledistance XML object
     */
    md.MetadataObj.prototype.getXmlObjScaleDistance = function(textNode) {
        return {
            nameSpace: 'gmd',
            nameNode: 'distance',
            children: [{
                nameSpace: 'gco',
                nameNode: 'Distance',
                attributes: {
                    uom: 'http://standards.iso.org/ittf/PublicityAvailableStandards/ISO_19139_Schemas/resources.uom/ML_gmxUom.xml#m'
                },
                textNode: textNode
            }]
        };
    };

    /**
     * Get data_topiccategory XML object
     * @return {Object} data_topiccategory XML object
     */
    md.MetadataObj.prototype.getXmlObjTopicCategory = function(self, textNode) {
        return {
            nameSpace: 'gmd',
            nameNode: 'topicCategory',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_TopicCategoryCode',
                textNode: textNode
            }]
        };
    };

    /**
     * Get data_geographicextent XML object
     * @return {String} data_geographicextent XML object
     */
    md.MetadataObj.prototype.getXmlObjGeographicExtent = function(self, extent) {
        return {
            nameSpace: 'gmd',
            nameNode: 'extent',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'EX_Extent',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'description',
                    children: [self.addCharacterString(extent.name)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'geographicElement',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'EX_GeographicBoundingBox',
                        children: [{
                            nameSpace: 'gmd',
                            nameNode: 'westBoundLongitude',
                            children: [{
                                nameSpace: 'gco',
                                nameNode: 'Decimal',
                                textNode: extent.xmin
                            }]
                        }, {
                            nameSpace: 'gmd',
                            nameNode: 'eastBoundLongitude',
                            children: [{
                                nameSpace: 'gco',
                                nameNode: 'Decimal',
                                textNode: extent.xmax
                            }]
                        }, {
                            nameSpace: 'gmd',
                            nameNode: 'southBoundLatitude',
                            children: [{
                                nameSpace: 'gco',
                                nameNode: 'Decimal',
                                textNode: extent.ymin
                            }]
                        }, {
                            nameSpace: 'gmd',
                            nameNode: 'northBoundLatitude',
                            children: [{
                                nameSpace: 'gco',
                                nameNode: 'Decimal',
                                textNode: extent.ymax
                            }]
                        }]
                    }]
                }]
            }]
        };
    };

    /**
     * Get data_temporalextent XML object
     * @return {String} data_temporalextent XML object
     */
    md.MetadataObj.prototype.getXmlObjTemporalExtent = function(self, extent) {
        return {
            nameSpace: 'gmd',
            nameNode: 'extent',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'EX_Extent',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'description',
                    children: [self.addCharacterString(extent.name)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'temporalElement',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'EX_TemporalExtent',
                        children: [{
                            nameSpace: 'gmd',
                            nameNode: 'extent',
                            children: [{
                                nameSpace: 'gml',
                                nameNode: 'TimePeriod',
                                attributes: {
                                    "xsi:type": "gml:TimePeriodType",
                                    "gml:id": md.guid()
                                },
                                children: [{
                                    nameSpace: 'gml',
                                    nameNode: 'beginPosition',
                                    textNode: extent.begin
                                }, {
                                    nameSpace: 'gml',
                                    nameNode: 'endPosition',
                                    textNode: extent.end
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        };
    };

    /**
     * Get data_verticalextent XML object
     * @return {String} data_verticalextent XML object
     */
    md.MetadataObj.prototype.getXmlObjVerticalExtent = function(self, extent) {
        return {
            nameSpace: 'gmd',
            nameNode: 'extent',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'EX_Extent',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'description',
                    children: [self.addCharacterString(extent.name)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'verticalElement',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'EX_VerticalExtent',
                        children: [{
                            nameSpace: 'gmd',
                            nameNode: 'minValue',
                            children: [self.addCharacterString(extent.minvalue)]
                        }, {
                            nameSpace: 'gmd',
                            nameNode: 'maxValue',
                            children: [self.addCharacterString(extent.maxvalue)]
                        }, {
                            nameSpace: 'gmd',
                            nameNode: 'uom',
                            children: [self.addCharacterString(extent.unit)]
                        }, {
                            nameSpace: 'gmd',
                            nameNode: 'verticalDatum',
                            children: [self.addCharacterString(extent.datum)]
                        }]
                    }]
                }]
            }]
        };
    };

    /**
     * Get data_distributionformat XML object
     * @return {String} data_distributionformat XML object
     */
    md.MetadataObj.prototype.getXmlObjDistributionFormat = function(self, distributionformat) {
        return {
            nameSpace: 'gmd',
            nameNode: 'distributionFormat',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'MD_Format',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'name',
                    children: [self.addCharacterString(distributionformat.name)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'version',
                    children: [self.addCharacterString(distributionformat.version)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'specification',
                    children: [self.addCharacterString(distributionformat.specification)]
                }]
            }]
        };
    };

    /**
     * Get data_linkages XML object
     * @return {String} data_linkages XML object
     */
    md.MetadataObj.prototype.getXmlObjLinkage = function(self, linkage) {
        return {
            nameSpace: 'gmd',
            nameNode: 'onLine',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'CI_OnlineResource',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'linkage',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'URL',
                        textNode: linkage.url
                    }]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'protocol',
                    children: [self.addCharacterString(linkage.protocol)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'name',
                    children: [self.addCharacterString(linkage.name)]
                }, {
                    nameSpace: 'gmd',
                    nameNode: 'description',
                    children: [self.addCharacterString(linkage.description)]
                }]
            }]
        };
    };

    /**
     * Get data_dq_level XML object
     * @return {String} data_dq_level XML object
     */
    md.MetadataObj.prototype.getXmlObjScopeLevel = function(textNode) {
        return {
            nameSpace: 'gmd',
            nameNode: 'scope',
            children: [{
                nameSpace: 'gmd',
                nameNode: 'DQ_Scope',
                children: [{
                    nameSpace: 'gmd',
                    nameNode: 'level',
                    children: [{
                        nameSpace: 'gmd',
                        nameNode: 'MD_ScopeCode',
                        attributes: {
                            codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode',
                            codeListValue: textNode
                        },
                        textNode: textNode
                    }]
                }]
            }]
        };
    };

    /**
     * Get data_li_statement XML object
     * @return {String} data_li_statement XML object
     */
    md.MetadataObj.prototype.getXmlObjLiStatement = function(textNode) {
        return {
            nameSpace: 'gmd',
            nameNode: 'statement',
            children: [ this.addCharacterString(textNode) ]
        };
    };

    /**
     * Get data_dq_conformities XML object
     * @return {String} data_dq_conformities XML object
     */
    md.MetadataObj.prototype.getXmlObjDqConformities = function(textNode) {
        return {};
        /*
        if (conformity.specification) {
            data_dq_conformities_error = 0;
            xml += '<gmd:report><gmd:DQ_DomainConsistency xsi:type="gmd:DQ_DomainConsistency_Type">\n';
            xml += '<gmd:measureIdentification>\n';
            xml += '<gmd:RS_Identifier>\n';
            xml += '<gmd:code>\n';
            xml += '<gco:CharacterString>Conformity_' + key + '</gco:CharacterString>\n';
            xml += '</gmd:code>\n';
            xml += '<gmd:codeSpace>\n';
            xml += '<gco:CharacterString>Other Conformity</gco:CharacterString>\n';
            xml += '</gmd:codeSpace>\n';
            xml += '</gmd:RS_Identifier>\n';
            xml += '</gmd:measureIdentification>\n';
            xml += '<gmd:result><gmd:DQ_ConformanceResult>\n';
            xml += '<gmd:specification><gmd:CI_Citation>\n';
            xml += '<gmd:title><gco:CharacterString>' + conformity.specification + '</gco:CharacterString></gmd:title>\n';
            if (conformity.dates) {
                conformity.dates.forEach(function(date, key) {
                    if (date.date) {
                        xml += '<gmd:date><gmd:CI_Date>\n';
                        xml += '<gmd:date><gco:Date>' + date.date + '</gco:Date></gmd:date>\n';
                        xml += '<gmd:dateType><gmd:CI_DateTypeCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode" codeListValue="' + date.type + '">' + date.type + '</gmd:CI_DateTypeCode></gmd:dateType>\n';
                        xml += '</gmd:CI_Date></gmd:date>\n';
                    }
                });
            }
            xml += '</gmd:CI_Citation></gmd:specification>\n';
            if (conformity.explanation) {
                xml += '<gmd:explanation><gco:CharacterString>' + conformity.explanation + '</gco:CharacterString></gmd:explanation>\n';
            }
            if (conformity.pass == "true") {
                xml += '<gmd:pass><gco:Boolean>true</gco:Boolean></gmd:pass>\n';
            } else if (conformity.pass == "false") {
                xml += '<gmd:pass><gco:Boolean>false</gco:Boolean></gmd:pass>\n';
            } else {
                xml += '<gmd:pass></gmd:pass>\n';
            }
            xml += '</gmd:DQ_ConformanceResult></gmd:result>\n';
            xml += '</gmd:DQ_DomainConsistency></gmd:report>\n';
        }
         */

    };

    /**
     * Get data_presentationform XML object
     * @return {String} data_presentationform XML object
     */
    md.MetadataObj.prototype.getXmlObjDataPresentationForm = function(textNode) {
        return {};
    };

}(window.md = window.md || {}));
jQuery(function(md, undefined) {
    "use strict";

    /**
     * md.MetadataXml class
     * @class md.MetadataXml
     * @property {Object} obj  - object format of XML metadata
     * @property {Object} xml   - XML source metadata
     */
    md.MetadataXml = function(xml) {
        this.obj = {};
        this.xml = this.setXml(xml);
    };

    /**
     * Set xml property of md.MetadataXml object
     * @param  {String} xml - XML metadata
     * @return {String} XML metadata
     */
    md.MetadataXml.prototype.setXml = function(xml) {
        this.xml = xml || undefined;
        return this.xml;
    };

    /**
     * Get xml property
     * @return {String} XML metadata
     */
    md.MetadataXml.prototype.getXml = function() {
        return this.xml;
    };

    /**
     * Get XML data in object format
     * @return {Object} XML data in object format or False
     */
    md.MetadataXml.prototype.getMetadataObj = function() {
        if (this.xml) {
            // Hard copy of empty object
            this.obj = jQuery.extend(true, {}, md.empty_js.metadata);
            this.obj.md_hierarchylevel = this.getHierarchyLevel();
            this.obj.data_title = this.getTitle();
            this.obj.data_abstract = this.getAbstract();
            this.obj.md_fileidentifier = this.getFileIdentifier();
            var dates = this.getDates();
            this.obj.data_dates = dates.dates;
            this.obj.data_datecreation = dates.data_datecreation;
            this.obj.data_daterevision = dates.data_daterevision;
            this.obj.data_datepublication = dates.data_datepublication;
            this.obj.data_pointofcontacts = this.getContacts('data');
            this.obj.data_languages = this.getLanguages();
            this.obj.data_maintenancefrequencycode = this.getMaintenanceFrequencyCode();
            this.obj.data_characterset = this.getCharacterSet();
            var extents = this.getExtents();
            this.obj.data_geographicextents = extents.data_geographicextents;
            this.obj.data_temporalextents = extents.data_temporalextents;
            this.obj.md_contacts = this.getContacts('md');
            this.obj.data_referencesystems = this.getReferenceSystems();
            this.obj.data_identifiers = this.getIdentifiers();
            this.obj.data_browsegraphics = this.getBrowsegraphics();
            var keywords = this.getKeywords();
            this.obj.data_keywords = keywords.keywords;
            this.obj.data_inspirekeywords = keywords.inspire;
            this.obj.data_keywords_list = this.getKeywordsList(keywords.keywords);
            this.obj.data_spatialrepresentationtype = this.getSpatialRepresentationType();
            this.obj.md_language = this.getMdLanguage();
            this.obj.md_characterset = this.getMdCharacterSet();
            this.obj.md_datestamp = this.getMdDateStamp();
            this.obj.md_standardname = this.getMdStandardName();
            this.obj.md_standardversion = this.getMdStandardVersion();
            this.obj.data_uselimitations = this.getUseLimitations();
            this.obj.data_legal_uselimitations = this.getLegalUseLimitations();
            this.obj.data_legal_accessconstraints = this.getLegalAccessConstraints();
            var legalAccessOtherConstraints = this.getLegalAccessOtherConstraints();
            this.obj.data_legal_accessotherconstraints = legalAccessOtherConstraints.others;
            this.obj.data_legal_accessinspireconstraints = legalAccessOtherConstraints.inspire;
            this.obj.data_legal_useconstraints = this.getLegalUseConstraints();
            this.obj.data_security_classification = this.getSecurityClassification();
            this.obj.data_scaledenominator = this.getScaleDenominator();
            this.obj.data_scaledistance = this.getScaleDistance();
            this.obj.data_topiccategories = this.getTopicCategories();
            this.obj.data_distributionformats = this.getDistributionFormats();
            this.obj.data_linkages = this.getLinkages();
            this.obj.data_dq_level = this.getDqLevel();
            this.obj.data_li_statement = this.getLiStatement();
            // TODO: manage Inspire conformities and other conformities
            this.obj.data_dq_conformities = this.getConformities();
            // TODO: A vérifier
            this.obj.data_presentationform = this.getPresentationForm();
            // TODO: A vérifier
            this.obj.data_security_uselimitations = this.getSecurityUseLimitations();

            return this.obj;
        } else {
            return false;
        }
    };

    /**
     * Get the language of metadata
     * @return {String} language of metadata
     */
    md.MetadataXml.prototype.getMdLanguage = function() {
        return jQuery(this.xml).find(md.xpaths.mdLanguage).attr('codeListValue');
    };

    /**
     * Get the character set of metadata
     * @return {String} character set of metadata
     */
    md.MetadataXml.prototype.getMdCharacterSet = function() {
        return jQuery(this.xml).find(md.xpaths.mdCharacterSet).attr('codeListValue');
    };

    /**
     * Get the date stamp of metadata
     * @return {String} date stamp of metadata
     */
    md.MetadataXml.prototype.getMdDateStamp = function() {
        return jQuery(this.xml).find(md.xpaths.mdDateStamp).text();
    };

    /**
     * Get the standard name of metadata
     * @return {String} standard name of metadata
     */
    md.MetadataXml.prototype.getMdStandardName = function() {
        return jQuery(this.xml).find(md.xpaths.mdStandardName).text();
    };

    /**
     * Get the standard version of metadata
     * @return {String} standard version of metadata
     */
    md.MetadataXml.prototype.getMdStandardVersion = function() {
        return jQuery(this.xml).find(md.xpaths.mdStandardVersion).text();
    };

    /**
     * Get the security classification of data
     * @return {String} security classification of data
     */
    md.MetadataXml.prototype.getSecurityClassification = function() {
        return jQuery(this.xml).find(md.xpaths.dataSecurity_Classification).text();
    };

    /**
     * Get the security use limitations of data
     * @return {String} security use limitations of data
     */
    md.MetadataXml.prototype.getSecurityUseLimitations = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataSecurity_UseLimitations).each(function() {
            var ul = jQuery(this).find(md.xpaths.characterString).text();
            data.push(ul);
        });
        return data;
    };

    /**
     * Get the scale denominator of data
     * @return {String} scale denominator of data
     */
    md.MetadataXml.prototype.getScaleDenominator = function() {
        return jQuery(this.xml).find(md.xpaths.dataScaleDenominator).text();
    };

    /**
     * Get the scale distance of data
     * @return {String} scale distance of data
     */
    md.MetadataXml.prototype.getScaleDistance = function() {
        return jQuery(this.xml).find(md.xpaths.dataScaleDistance).text();
    };

    /**
     * Get the quality level of data
     * @return {String} quality level of data
     */
    md.MetadataXml.prototype.getDqLevel = function() {
        return jQuery(this.xml).find(md.xpaths.dataDqLevel).text();
    };

    /**
     * Get the lineage statement of data
     * @return {String} lineage statement of data
     */
    md.MetadataXml.prototype.getLiStatement = function() {
        return jQuery(this.xml).find(md.xpaths.dataLiStatement).text();
    };

    /**
     * Get the hierarchy level of metadata
     * @return {String} hierarchy level of metadata
     */
    md.MetadataXml.prototype.getHierarchyLevel = function() {
        return jQuery(this.xml).find(md.xpaths.mdHierarchyLevel).attr('codeListValue');
    };

    /**
     * Get xpath according to hierarchyLevel of metadata (data or service resource)
     * @param {String} data_xpath - xpath to use if metadata of data resource
     * @param {String} service_xpath - xpath to use if metadata of service resource
     * @return {String} xpath according to hierarchyLevel
     */
    md.MetadataXml.prototype.getHierarchyLevelXpath = function(data_xpath, service_xpath) {
        if (!this.obj.md_hierarchylevel) this.obj.md_hierarchylevel = this.getHierarchyLevel();
        if (this.obj.md_hierarchylevel == 'service') {
            return md.xpaths[service_xpath];
        } else {
            return md.xpaths[data_xpath];
        }
    };

    /**
     * Get the file identifier of metadata
     * @return {String} file identifier of metadata
     */
    md.MetadataXml.prototype.getFileIdentifier = function() {
        return jQuery(this.xml).find(md.xpaths.mdFileIdentifier).text();
    };

    /**
     * Get the title of data
     * @return {String} title of data
     */
    md.MetadataXml.prototype.getTitle = function() {
        var xpath = this.getHierarchyLevelXpath('dataTitle', 'serviceTitle');
        return jQuery(this.xml).find(xpath).text();
    };

    /**
     * Get the abstract of resource
     * @return {String} abstract of data
     */
    md.MetadataXml.prototype.getAbstract = function() {
        var xpath = this.getHierarchyLevelXpath('dataAbstract', 'serviceAbstract');
        return jQuery(this.xml).find(xpath).text();
    };



    /**
     * Get contacts
     * @param {String} type - type of contact: 'data' || 'md'
     * @return {Object} contacts
     */
    md.MetadataXml.prototype.getContacts = function(type) {
        var contacts = [];
        var xpath = md.xpaths.mdContacts;
        if (type == 'data') {
            // Check type of resource: data or service and adapt xpath
            xpath = this.getHierarchyLevelXpath('dataPointOfContacts', 'servicePointOfContacts');
        }
        // Get and parse nodes from xpath
        jQuery(this.xml).find(xpath).each(function() {
            var cnt = {
                name: jQuery(this).find(md.xpaths.cntName).text(),
                position: jQuery(this).find(md.xpaths.cntFunction).text(),
                organisation: jQuery(this).find(md.xpaths.cntOrganism).text(),
                address: jQuery(this).find(md.xpaths.cntAddress).text(),
                cp: jQuery(this).find(md.xpaths.cntPostalCode).text(),
                city: jQuery(this).find(md.xpaths.cntCity).text(),
                phone: jQuery(this).find(md.xpaths.cntPhone).text(),
                email: jQuery(this).find(md.xpaths.cntEmail).text(),
                role: jQuery(this).find(md.xpaths.cntRole).attr('codeListValue'),
                logo_text: jQuery(this).find(md.xpaths.cntLogo).text(),
                logo_url: jQuery(this).find(md.xpaths.cntLogo).attr('src')
            };
            contacts.push(cnt);
        });
        return contacts;
    };

    /**
     * Get the languages of the resource
     * @return {List} languges of the resource
     */
    md.MetadataXml.prototype.getLanguages = function() {
        var data = [];
        // Check type of resource: data or service and adapt xpath
        var xpath = this.getHierarchyLevelXpath('dataLanguages', 'serviceLanguages');
        jQuery(this.xml).find(xpath).each(function() {
            var lg = jQuery(this).find(md.xpaths.dataLanguage).attr('codeListValue');
            data.push(lg);
        });
        return data;
    };

    /**
     * Get the maintenace frequency of the resource
     * @return {String} maintenace frequency of the resource
     */
    md.MetadataXml.prototype.getMaintenanceFrequencyCode = function() {
        // Check type of resource: data or service and adapt xpath
        var xpath = this.getHierarchyLevelXpath('dataMaintenanceFrequency', 'serviceMaintenanceFrequency');
        return jQuery(this.xml).find(xpath).attr('codeListValue');
    };

    /**
     * Get the character set of the resource
     * @return {String} character set of the resource
     */
    md.MetadataXml.prototype.getCharacterSet = function() {
        // Check type of resource: data or service and adapt xpath
        var xpath = this.getHierarchyLevelXpath('dataCharacterSet', 'serviceCharacterSet');
        return jQuery(this.xml).find(xpath).attr('codeListValue');
    };

    /**
     * Get the extents of the resource
     * @return {String} hierarchy of the resource
     */
    md.MetadataXml.prototype.getExtents = function() {
        var data_geographicextents = [];
        var data_temporalextents = [];
        // Check type of resource: data or service and adapt xpath
        var xpath = this.getHierarchyLevelXpath('dataExtents', 'serviceExtents');
        jQuery(this.xml).find(xpath).each(function() {
            var ext;
            var dataExtentName = jQuery(this).find(md.xpaths.dataExtentName).text();
            var dataExtentNorthbound = jQuery(this).find(md.xpaths.dataExtentNorthbound).text();
            var dataExtentSouthbound = jQuery(this).find(md.xpaths.dataExtentSouthbound).text();
            var dataExtentEastbound = jQuery(this).find(md.xpaths.dataExtentEastbound).text();
            var dataExtentWestbound = jQuery(this).find(md.xpaths.dataExtentWestbound).text();
            var dataTemporalExtent_Begin = jQuery(this).find(md.xpaths.dataTemporalExtent_Begin).text();
            var dataTemporalExtent_End = jQuery(this).find(md.xpaths.dataTemporalExtent_End).text();
            if (dataTemporalExtent_Begin) {
                ext = {
                    description: dataExtentName,
                    begin: dataTemporalExtent_Begin,
                    start: dataTemporalExtent_End
                };
                data_temporalextents.push(ext);
            } else {
                ext = {
                    name: dataExtentName,
                    ymax: dataExtentNorthbound,
                    ymin: dataExtentSouthbound,
                    xmax: dataExtentEastbound,
                    xmin: dataExtentWestbound
                };
                data_geographicextents.push(ext);
            }
        });
        return {
            data_geographicextents: data_geographicextents,
            data_temporalextents: data_temporalextents
        };
    };

    /**
     * Get the reference systems of resource
     * @return {Object} reference systems of resource
     */
    md.MetadataXml.prototype.getReferenceSystems = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataReferenceSystems).each(function() {
            // If node content a EPSG code, the value is used in metadata json object
            var rf_value = jQuery(this).find(md.xpaths.dataReferenceSystemCode).text();
            var rf = {
                code: rf_value
            };
            jQuery.each(md.codeslists.mdReferenceSystemCode, function(key, obj) {
                if (rf_value.toLowerCase().indexOf(obj.search) > -1) {
                    rf = {
                        code: obj.id,
                        codespace: 'EPSG'
                    };
                }
            });
            data.push(rf);
        });
        return data;
    };

    /**
     * Get the identifiers of the resource
     * @return {List} identifiers of the resource
     */
    md.MetadataXml.prototype.getIdentifiers = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataIdentifiers).each(function() {
            var id = {
                code: jQuery(this).find(md.xpaths.dataCode).text(),
                codespace: jQuery(this).find(md.xpaths.dataCodeSpace).text()
            };
            data.push(id);
        });
        return data;
    };

    /**
     * Get the presentation form of the resource
     * @return {String} presentation form of the resource
     */
    md.MetadataXml.prototype.getPresentationForm = function() {
        return jQuery(this.xml).find(md.xpaths.dataPresentationForm).attr('codeListValue');
    };

    /**
     * Get the browse graphics of the resource
     * @return {List} browse graphics of the resource
     */
    md.MetadataXml.prototype.getBrowsegraphics = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataBrowseGraphics).each(function() {
            var bg = {
                url: jQuery(this).find(md.xpaths.dataBrowseGraphic_Name).text(),
                description: jQuery(this).find(md.xpaths.dataBrowseGraphic_Description).text(),
                type: jQuery(this).find(md.xpaths.dataBrowseGraphic_Type).text()
            };
            data.push(bg);
        });
        return data;
    };

    /**
     * Get the keywords of the resource
     * @return {List} keywords of the resource
     */
    md.MetadataXml.prototype.getKeywords = function() {
        var Metadata = this;
        var data = {
            'inspire': [],
            'keywords': []
        };
        jQuery(this.xml).find(md.xpaths.dataKeywords).each(function() {
            var kw = {
                keyword: jQuery(this).find(md.xpaths.dataKeyword).text(),
                type: jQuery(this).find(md.xpaths.dataKeywordType).attr('codeListValue'),
                thesaurus_name: jQuery(this).find(md.xpaths.dataThesaurusName).text(),
                //thesaurus_dates: getIsoDates(jQuery(this), 'Data_ThesaurusDates'),
                thesaurus_dates: Metadata.getDates(this, 'dataThesaurusDates').dates
            };
            //console.log('test ', kw.thesaurus_dates, kw.keyword);
            if (kw.thesaurus_name.toLowerCase().indexOf('gemet') > -1 && kw.thesaurus_name.toLowerCase().indexOf('inspire') > -1) {
                data.inspire.push(kw);
            } else {
                data.keywords.push(kw);
            }
        });
        return data;
    };

    /**
     * Get the keywords list string from keywords list object
     * @param {List} keywords - list of keywords objects
     * @return {String} keywords list of the resource
     */
    md.MetadataXml.prototype.getKeywordsList = function(keywords) {
        var keywordsList = [];
        jQuery.each(keywords, function(index, keyword) {
            keywordsList.push(this.keyword);
        });
        return keywordsList.join(', ');
    };

    //**************************************************************************
    // TODO
    //**************************************************************************


    /**
     * Get the spatial representation type
     * @return {String} spatial representation type
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getSpatialRepresentationType = function() {
        return jQuery(this.xml).find(md.xpaths.dataSpatialRepresentationType).attr('codeListValue');
    };

    /**
     * Get the use limitations of the reource
     * @return {List} use limitations of the reource
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getUseLimitations = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataUseLimitations).each(function() {
            var ul = jQuery(this).find(md.xpaths.characterString).text();
            data.push(ul);
        });
        return data;
    };

    /**
     * Get the legal use limitations of the reource
     * @return {List} legal use limitations of the reource
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getLegalUseLimitations = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataLegalUseLimitations).each(function() {
            var ul = jQuery(this).find(md.xpaths.characterString).text();
            data.push(ul);
        });
        return data;
    };


    /**
     * Get the legal access constraints of the resource
     * @return {List} legal access constraints of the resource
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getLegalAccessConstraints = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataLegalAccessConstraints).each(function() {
            var restriction = jQuery(this).find(md.xpaths.dataRestrictionCode).attr('codeListValue');
            if (restriction != 'otherRestrictions') {
                data.push(restriction);
            }
        });
        return data;
    };

    /**
     * Get the legal access other constraints of the resource
     * @return {List} legal access other constraints of the resource
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getLegalAccessOtherConstraints = function() {
        var data = {
            'inspire': [],
            'others': []
        };
        jQuery(this.xml).find(md.xpaths.dataLegalAccessOtherConstraints).each(function() {
            var otherconstraint_value = jQuery(this).find(md.xpaths.characterString).text();
            var otherconstraint = otherconstraint_value;
            var inspire = false;
            // Check if node contents item from codeslist
            md.codeslists.mdInspireRestrictionCode.forEach(function(obj, key) {
                if (otherconstraint_value.toLowerCase().indexOf(obj.search) > -1) {
                    inspire = true;
                    otherconstraint = obj.id;
                }
            });
            if (inspire) {
                data.inspire.push(otherconstraint);
            } else {
                data.others.push(otherconstraint);
            }
        });
        return data;
    };

    /**
     * Get the legal use constraints of the resource
     * @return {List} legal use constraints of the resource
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getLegalUseConstraints = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataLegalUseConstraints).each(function() {
            var restriction = jQuery(this).find(md.xpaths.dataRestrictionCode).attr('codeListValue');
            if (restriction != 'otherRestrictions') {
                var ac = {
                    data_RestrictionCode: restriction
                };
                data.push(ac);
            }
        });
        return data;
    };


    /**
     * Get the topic categories of the resource
     * @return {String} topic categories of the resource
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getTopicCategories = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataTopicCategories).each(function() {
            var tc = jQuery(this).find(md.xpaths.dataTopicCategory).text();
            data.push(tc);
        });
        return data;
    };

    /**
     * Get the distribution formats of the resource
     * @return {List} distribution formats of the resource
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getDistributionFormats = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataDistributionFormats).each(function() {
            var df = {
                name: jQuery(this).find(md.xpaths.dataDistributionFormatName).text(),
                version: jQuery(this).find(md.xpaths.dataDistributionFormatVersion).text(),
                specification: jQuery(this).find(md.xpaths.dataDistributionFormatSpecification).text()
            };
            data.push(df);
        });
        return data;
    };

    /**
     * Get the online linkages of the resource
     * @return {List} online linkages of the resource
     */
    // TODO: à vérifier
    md.MetadataXml.prototype.getLinkages = function() {
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataLinkages).each(function() {
            var df = {
                name: jQuery(this).find(md.xpaths.dataLinkageName).text(),
                description: jQuery(this).find(md.xpaths.dataLinkageDescription).text(),
                url: jQuery(this).find(md.xpaths.dataLinkageURL).text()
            };
            data.push(df);
        });
        return data;
    };

    /**
     * Get the conformities of the resource
     * @return {List} conformities of the resource
     */
    // TODO: manage Inspire conformities and other conformities
    md.MetadataXml.prototype.getConformities = function() {
        var Metadata = this;
        var data = [];
        jQuery(this.xml).find(md.xpaths.dataDqConformities).each(function() {
            var dc = {
                //Data_LinkageName: jQuery(this).find(md.xpaths.dataLinkageName).text(),
                specification: jQuery(this).find(md.xpaths.dataDqConformityTest).text(),
                // dates: getIsoDates(jQuery(this), 'Data_DqConformityDates'),
                dates: Metadata.getDates(this, 'Data_DqConformityDates').dates,
                explaination: jQuery(this).find(md.xpaths.dataDqConformityResult).text(),
                pass: jQuery(this).find(md.xpaths.dataDqConformityPass).text()
            };
            data.push(dc);
        });
        return data;
    };

    /**
     * Get the dates of resource
     * @return {Object} dates of resource
     */
    md.MetadataXml.prototype.getDates = function(xml, xpath_date) {
        var data = {
            dates: []
        };
        // Get xml to parse
        xml = xml || this.xml;
        // Check type of resource: data or service and adapt xpath
        xpath_date = md.xpaths[xpath_date] || this.getHierarchyLevelXpath('dataDates', 'serviceDates');
        // Get and parse nodes from xpath
        jQuery(xml).find(xpath_date).each(function() {
            var date = jQuery(this).find(md.xpaths.date).text();
            var dateType = jQuery(this).find(md.xpaths.dateType).text();
            if (dateType == 'creation') {
                data.data_datecreation = date;
            } else if (dateType == 'publication') {
                data.data_datepublication = date;
            } else if (dateType == 'revision') {
                data.data_daterevision = date;
            }
            data.dates.push({
                type: dateType,
                date: date
            });
        });
        return data;
    };

    /**
     * Get an empty contact object
     * @return {Object} empty contact object
     */
    md.MetadataXml.prototype.getEmptyContact = function() {
        // return md.empty_js.contact;
        return jQuery.extend(true, {}, md.empty_js.contact);
    };

    /**
     * Get an empty date object
     * @return {Object} empty date object
     */
    md.MetadataXml.prototype.getEmptyDate = function() {
        // return md.empty_js.date;
        return jQuery.extend(true, {}, md.empty_js.date);
    };

    /**
     * Get an empty identifier object
     * @return {Object} empty identifier object
     */
    md.MetadataXml.prototype.getEmptyIdentifier = function() {
        // return md.empty_js.identifier;
        return jQuery.extend(true, {}, md.empty_js.identifier);
    };

    /**
     * Get an empty geographic extent object
     * @return {Object} empty geographic extent object
     */
    md.MetadataXml.prototype.getEmptyGeographicExtent = function() {
        // return md.empty_js.geographicextent;
        return jQuery.extend(true, {}, md.empty_js.geographicextent);
    };

    /**
     * Get an empty browse graphic object
     * @return {Object} empty browse graphic object
     */
    md.MetadataXml.prototype.getEmptyBrowseGraphic = function() {
        // return md.empty_js.browsegraphic;
        return jQuery.extend(true, {}, md.empty_js.browsegraphic);
    };

    /**
     * Get an empty temporal extent object
     * @return {Object} empty temporal extent object
     */
    md.MetadataXml.prototype.getEmptyTemporalExtent = function() {
        // return md.empty_js.temporalextent;
        return jQuery.extend(true, {}, md.empty_js.temporalextent);
    };

    /**
     * Get an empty keyword object
     * @return {Object} empty keyword object
     */
    md.MetadataXml.prototype.getEmptyKeyword = function() {
        // return md.empty_js.keyword;
        return jQuery.extend(true, {}, md.empty_js.keyword);
    };

    /**
     * Get an empty inspire keyword object
     * @return {Object} empty inspire keyword object
     */
    md.MetadataXml.prototype.getEmptyInspireKeyword = function() {
        // return md.empty_js.inspirekeyword;
        return jQuery.extend(true, {}, md.empty_js.inspirekeyword);
    };

    /**
     * Get an empty reference system object
     * @return {Object} empty reference system object
     */
    md.MetadataXml.prototype.getEmptyReferenceSystem = function() {
        // return md.empty_js.referencesystem;
        return jQuery.extend(true, {}, md.empty_js.referencesystem);
    };

    /**
     * Get an empty distribution format object
     * @return {Object} empty distribution format object
     */
    md.MetadataXml.prototype.getEmptyDistributionFormat = function() {
        // return md.empty_js.distributionformat;
        return jQuery.extend(true, {}, md.empty_js.distributionformat);
    };

    /**
     * Get an empty linkage object
     * @return {Object} empty linkage object
     */
    md.MetadataXml.prototype.getEmptyLinkage = function() {
        // return md.empty_js.linkage;
        return jQuery.extend(true, {}, md.empty_js.linkage);
    };

    /**
     * Get an empty data quality conformity object
     * @return {Object} empty data quality conformity object
     */
    md.MetadataXml.prototype.getEmptyDqConformity = function() {
        // return md.empty_js.dq_conformity;
        return jQuery.extend(true, {}, md.empty_js.dq_conformity);
    };

    /**
     * Get an empty metadata object
     * @return {Object} empty metadata object
     */
    md.MetadataXml.prototype.getEmptyMetadata = function() {
        // return md.empty_js.metadata;
        return jQuery.extend(true, {}, md.empty_js.metadata);
    };

}(window.md = window.md || {}));
