jQuery(function(md, undefined) {

    /**
     * codeslist main object
     * @lends md
     * @type {Object}
     */
    md.codeslists = {};

    /**
     * codeslist of type of date
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
     * @lends md.codeslist
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
