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
