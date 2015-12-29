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
