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
     * @param {Object} conf - configuration object
     * var conf = {
     * 		'append': false // if false, remove items in node before add new one
     * 	};
     * @return {String} XML metadata file content or False
     */
    md.MetadataObj.prototype.getMetadataXml = function(conf) {
        var append = conf.append || false;
        var $xmlDoc = jQuery.parseXML(this.xml);
        var $xml = jQuery($xmlDoc);
        var $root = $xml.find(':root');

        // md_fileidentifier
        var $md_fileidentifier = $xml.find(md.xpaths.md_fileidentifier).remove();
        $root.append(this.getXmlMdFileIdentifier());

        // md_language
        var $md_language = $xml.find(md.xpaths.md_language).remove();
        $root.append(this.getXmlMdLanguage());

        // md_characterset
        var $md_characterset = $xml.find(md.xpaths.md_characterset).remove();
        $root.append(this.getXmlMdCharacterSet());

        // md_HierarchyLevel
        var $md_hierarchylevel = $xml.find(md.xpaths.md_hierarchylevel).remove();
        $root.append(this.getXmlMdHierarchyLevel());


        /*
        // #TODO: md_contacts
        var md_contacts = xmlContacts(metadata.md_contacts, 'md', errors);
        xml += md_contacts.xml;
        errors = md_contacts.errors;

        // #TODO: md_datestamp
        if (!metadata.md_datestamp) {
            var currentTime = new Date();
            var month = ((currentTime.getMonth() + 1) < 10 ? '0' : '') + (currentTime.getMonth() + 1);
            var day = currentTime.getDate();
            var year = currentTime.getFullYear();
            metadata.md_datestamp = year + '-' + month + '-' + day;
            errors.push('md_datestamp');
        }
        xml += '<gmd:dateStamp><gco:Date>' + metadata.md_datestamp + '</gco:Date></gmd:dateStamp>\n';

        // #TODO: md_standardname
        if (metadata.md_standardname) {
            xml += '<gmd:metadataStandardName><gco:CharacterString>' + metadata.md_standardname + '</gco:CharacterString></gmd:metadataStandardName>\n';
        } else {
            errors.push('md_standardname');
        }

        // #TODO: md_standardversion
        if (metadata.md_standardversion) {
            xml += '<gmd:metadataStandardVersion><gco:CharacterString>' + metadata.md_standardversion + '</gco:CharacterString></gmd:metadataStandardVersion>\n';
        } else {
            errors.push('md_standardversion');
        }

        // DATA
        // #TODO: data_referencesystem
        var data_referencesystems_error = 1;
        if (metadata.data_referencesystems) {
            metadata.data_referencesystems.forEach(function(referencesystem, key) {
                if (referencesystem) {
                    data_referencesystems_error = 0;
                    xml += '<gmd:referenceSystemInfo><gmd:MD_ReferenceSystem>\n';
                    xml += '<gmd:referenceSystemIdentifier><gmd:RS_Identifier>\n';
                    xml += '<gmd:code><gco:CharacterString>' + referencesystem.code + '</gco:CharacterString></gmd:code>\n';
                    xml += '</gmd:RS_Identifier></gmd:referenceSystemIdentifier>\n';
                    xml += '</gmd:MD_ReferenceSystem></gmd:referenceSystemInfo>\n';
                }
            });
        }
        if (data_referencesystems_error) {
            errors.push('data_referencesystems');
        }

        // IDENTIFICATION INFO
        xml += '<gmd:identificationInfo><gmd:MD_DataIdentification>\n';
        xml += '<gmd:citation><gmd:CI_Citation>\n';

        // #TODO: data_title
        if (metadata.data_title) {
            xml += '<gmd:title><gco:CharacterString>' + metadata.data_title + '</gco:CharacterString></gmd:title>\n';
        } else {
            errors.push('data_title');
        }

        // #TODO: data_dates
        // Init data_dates
        metadata.data_dates = [];
        // data_DateCreation / data_DateRevision / data_DatePublication
        if (metadata.data_datecreation) {
            var data_datecreation = xmlDataDate(metadata.data_datecreation, 'creation');
            metadata.data_dates.push(data_datecreation);
        }
        if (metadata.data_daterevision) {
            var data_daterevision = xmlDataDate(metadata.data_daterevision, 'revision');
            metadata.data_dates.push(data_daterevision);
        }
        if (metadata.data_datepublication) {
            var data_datepublication = xmlDataDate(metadata.data_datepublication, 'publication');
            metadata.data_dates.push(data_datepublication);
        }

        var data_dates_error = 1;
        if (metadata.data_dates) {
            metadata.data_dates.forEach(function(date, key) {
                if (date) {
                    data_dates_error = 0;
                    xml += '<gmd:date><gmd:CI_Date>\n';
                    xml += '<gmd:date><gco:Date>' + date.date + '</gco:Date></gmd:date>\n';
                    xml += '<gmd:dateType><gmd:CI_DateTypeCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode" codeListValue="' + date.type + '">' + date.type + '</gmd:CI_DateTypeCode></gmd:dateType>\n';
                    xml += '</gmd:CI_Date></gmd:date>\n';
                }
            });
        }
        if (data_dates_error) {
            errors.push('data_dates');
        }

        // #TODO: data_Identifier
        // Renseigner md_fileidentifier comme data_Identifier par défaut si n'existe pas + message
        if (!metadata.data_identifiers) {
            metadata.data_identifiers = [{
                code: metadata.md_fileidentifier,
                codespace: 'md_fileidentifier'
            }];
            errors.push('data_identifiers');
        }
        metadata.data_identifiers.forEach(function(identifier, key) {
            if (identifier.code) {
                xml += '<gmd:identifier><gmd:RS_Identifier>\n';
                xml += '<gmd:code><gco:CharacterString>' + identifier.code + '</gco:CharacterString></gmd:code>\n';
                xml += '<gmd:codeSpace><gco:CharacterString>' + identifier.codespace + '</gco:CharacterString></gmd:codeSpace>\n';
                xml += '</gmd:RS_Identifier></gmd:identifier>\n';
            }
        });
        xml += '</gmd:CI_Citation></gmd:citation>\n';

        // #TODO: data_abstract
        if (metadata.data_abstract) {
            xml += '<gmd:abstract><gco:CharacterString>' + metadata.data_abstract + '</gco:CharacterString></gmd:abstract>\n';
        } else {
            errors.push('data_abstract');
        }

        // #TODO: data_PointOfContact
        if (metadata.data_contacts) {
            var data_contacts = xmlContacts(metadata.data_contacts, 'data', errors);
            xml += data_contacts.xml;
            errors = data_contacts.errors;
        }
        // #TODO: data_maintenancefrequencycode
        if (metadata.data_maintenancefrequencycode) {
            xml += '<gmd:resourceMaintenance>\n';
            xml += '<gmd:MD_MaintenanceInformation>\n';
            xml += '<gmd:maintenanceAndUpdateFrequency>\n';
            xml += '<gmd:MD_MaintenanceFrequencyCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_MaintenanceFrequencyCode" codeListValue="' + metadata.data_maintenancefrequencycode + '">' + metadata.data_maintenancefrequencycode + '</gmd:MD_MaintenanceFrequencyCode>\n';
            xml += '</gmd:maintenanceAndUpdateFrequency>\n';
            xml += '</gmd:MD_MaintenanceInformation>\n';
            xml += '</gmd:resourceMaintenance>\n';
        } else {
            errors.push('data_maintenancefrequencycode');
        }

        // #TODO: data_browsegraphic
        if (metadata.data_browsegraphics) {
            metadata.data_browsegraphics.forEach(function(browsegraphic, key) {
                if (browsegraphic.url) {
                    if (!browsegraphic.type) {
                        var parts = browsegraphic.url.split('.');
                        browsegraphic.type = parts[(parts.length - 1)];
                    }
                    xml += '<gmd:graphicOverview>\n';
                    xml += '<gmd:MD_BrowseGraphic>\n';
                    xml += '<gmd:fileName>\n';
                    xml += '<gco:CharacterString>' + browsegraphic.url + '</gco:CharacterString>\n';
                    xml += '</gmd:fileName>\n';
                    xml += '<gmd:fileDescription>\n';
                    xml += '<gco:CharacterString>' + browsegraphic.description + '</gco:CharacterString>\n';
                    xml += '</gmd:fileDescription>\n';
                    xml += '<gmd:fileType>\n';
                    xml += '<gco:CharacterString>' + browsegraphic.type + '</gco:CharacterString>\n';
                    xml += '</gmd:fileType>\n';
                    xml += '</gmd:MD_BrowseGraphic>\n';
                    xml += '</gmd:graphicOverview>\n';
                } else {
                    errors.push('data_browsegraphics');
                }
            });
        }

        // #TODO: Keywords
        var data_keywords_error = 1;

        // #TODO: data_inspirekeywords
        var inspire_keywords = [];
        if (metadata.data_inspirekeywords) {
            data_keywords_error = 0;
            metadata.data_inspirekeywords.forEach(function(inspirekeyword, key) {
                var inspire_keyword = {
                    "keyword": inspirekeyword.keyword,
                    "type": inspirekeyword.type,
                    "thesaurus_name": "GEMET - INSPIRE themes, version 1.0",
                    "thesaurus_dates": [{
                        "type": "publication",
                        "date": "2008-06-01"
                    }]
                };
                inspire_keywords.push(inspire_keyword);
            });
        } else {
            errors.push('data_inspirekeywords');
        }
        var data_inspirekeywords = xmlKeywords(inspire_keywords, errors);
        xml += data_inspirekeywords.xml;
        errors = data_inspirekeywords.errors;

        // #TODO: data_keywords_list
        var data_keywords_list = [];
        if (metadata.data_keywords_list) {
            var keywords_list = metadata.data_keywords_list.split(',');
            keywords_list.forEach(function(keyword, key) {
                var data_keyword = {
                    keyword: keyword.trim(),
                    type: '',
                    thesaurus_name: '',
                    thesaurus_dates: [{
                        type: '',
                        date: ''
                    }]
                };
                data_keywords_list.push(data_keyword);
            });
        }
        data_keywords_list = xmlKeywords(data_keywords_list, errors);
        xml += data_keywords_list.xml;
        errors = data_keywords_list.errors;

        // #TODO: data_keywords
        if (metadata.data_keywords) {
            var data_keywords = xmlKeywords(metadata.data_keywords, errors);
            xml += data_keywords.xml;
            errors = data_keywords.errors;
        }

        // resourceConstraints: le principe retenu ici est d'utiliser 1 <resourceConstraints> pour chaque type de contrainte: <MD_Constraints>, <MD_LegalConstraints> et <MD_SecurityConstraints>
        // resourceConstraints > Constraints
        // #TODO: data_uselimitations
        var data_uselimitations_error = 1;
        if (metadata.data_uselimitations) {
            metadata.data_uselimitations.forEach(function(uselimitation, key) {
                if (uselimitation) {
                    data_uselimitations_error = 0;
                    xml += '<gmd:resourceConstraints><gmd:MD_Constraints>\n';
                    xml += '<gmd:useLimitation><gco:CharacterString>' + uselimitation + '</gco:CharacterString></gmd:useLimitation>\n';
                    xml += '</gmd:MD_Constraints></gmd:resourceConstraints>\n';
                }
            });
        }
        if (data_uselimitations_error) {
            errors.push('data_uselimitations');
        }

        // ResourceConstraints > LegalConstraints
        xml += '<gmd:resourceConstraints><gmd:MD_LegalConstraints>\n';

        // #TODO: data_legal_useLimitations
        var data_legal_uselimitations_error = 1;
        if (metadata.data_legal_uselimitations) {
            metadata.data_legal_uselimitations.forEach(function(legal_uselimitation, key) {
                if (legal_uselimitation) {
                    data_legal_uselimitations_error = 0;
                    xml += '<gmd:useLimitation>\n';
                    xml += '<gco:CharacterString>' + legal_uselimitation + '</gco:CharacterString>\n';
                    xml += '<gmd:useLimitation>\n';
                }
            });
        }
        if (data_legal_uselimitations_error) {
            errors.push('data_legal_useLimitations');
        }

        // #TODO: data_legal_accessconstraints
        var data_legal_accessconstraints_error = 1;
        if (metadata.data_legal_accessconstraints) {
            metadata.data_legal_accessconstraints.forEach(function(legal_accessconstraint, key) {
                if (legal_accessconstraint) {
                    data_legal_accessconstraints_error = 0;
                    xml += '<gmd:accessConstraints>\n';
                    xml += '<gmd:MD_RestrictionCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode" codeListValue="' + legal_accessconstraint + '">' + legal_accessconstraint + '</gmd:MD_RestrictionCode>\n';
                    xml += '</gmd:accessConstraints>\n';
                }
            });
        }
        if (data_legal_accessconstraints_error) {
            errors.push('data_legal_accessconstraints');
        }

        // #TODO: data_legal_useconstraints
        var data_legal_useconstraints_error = 1;
        if (metadata.data_legal_useconstraints) {
            metadata.data_legal_useconstraints.forEach(function(legal_useconstraint, key) {
                if (legal_useconstraint) {
                    data_legal_useconstraints_error = 0;
                    xml += '<gmd:useConstraints>\n';
                    xml += '<gmd:MD_RestrictionCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode" codeListValue="' + legal_useconstraint + '">' + legal_useconstraint + '</gmd:MD_RestrictionCode>\n';
                    xml += '</gmd:useConstraints>\n';
                }
            });
        }
        if (data_legal_useconstraints_error) {
            errors.push('data_legal_useconstraints');
        }

        // #TODO: data_legal_accessinspireconstraints
        if (metadata.data_legal_accessinspireconstraints) {
            metadata.data_legal_accessinspireconstraints.forEach(function(legal_accessinspireconstraint, key) {
                metadata.data_legal_accessotherconstraints.push(legal_accessinspireconstraint);
            });
        }
        // #TODO: data_legal_accessotherconstraints
        var data_legal_accessotherconstraints_error = 1;
        if (metadata.data_legal_accessotherconstraints) {
            metadata.data_legal_accessotherconstraints.forEach(function(legal_accessotherconstraint, key) {
                if (legal_accessotherconstraint) {
                    data_legal_accessotherconstraints_error = 0;
                    xml += '<gmd:otherConstraints><gco:CharacterString>' + legal_accessotherconstraint + '</gco:CharacterString></gmd:otherConstraints>\n';
                }
            });
        }
        if (data_legal_accessotherconstraints_error) {
            errors.push('data_legal_accessotherconstraints');
        }

        xml += '</gmd:MD_LegalConstraints></gmd:resourceConstraints>\n';

        // ResourceConstraints > SecurityConstraints
        // #TODO: data_security_uselimitations

        // #TODO: data_security_classification
        if (metadata.data_security_classification) {
            xml += '<gmd:resourceConstraints><gmd:MD_SecurityConstraints><gmd:classification>\n';
            xml += '<gmd:MD_ClassificationCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ClassificationCode" codeListValue="' + metadata.data_security_classification + '">' + metadata.data_security_classification + '</gmd:MD_ClassificationCode>\n';
            xml += '</gmd:classification></gmd:MD_SecurityConstraints></gmd:resourceConstraints>\n';
        } else {
            errors.push('data_security_classification');
        }

        // Fin de data_ResourceConstraints

        // #TODO: data_SpatialRepresentationType
        if (metadata.data_spatialrepresentationtype) {
            xml = xml + '<gmd:spatialRepresentationType>\n';
            xml = xml + '<gmd:MD_SpatialRepresentationTypeCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_SpatialRepresentationTypeCode" codeListValue="' + metadata.data_spatialrepresentationtype + '">' + metadata.data_spatialrepresentationtype + '</gmd:MD_SpatialRepresentationTypeCode>\n';
            xml = xml + '</gmd:spatialRepresentationType>\n';
        } else {
            errors.push('data_spatialrepresentationtype');
        }

        // #TODO: data_ScaleDenominator / data_ScaleDistance
        if (metadata.data_scaledenominator || metadata.data_scaledistance) {
            xml = xml + '<gmd:spatialResolution><gmd:MD_Resolution>\n';
            if (metadata.data_scaledenominator) {
                xml = xml + '<gmd:equivalentScale><gmd:MD_RepresentativeFraction>\n';
                xml = xml + '<gmd:denominator><gco:Integer>' + metadata.data_scaledenominator + '</gco:Integer></gmd:denominator>\n';
                xml = xml + '</gmd:MD_RepresentativeFraction></gmd:equivalentScale>\n';
            }
            if (metadata.data_scaledistance) {
                xml = xml + '<gmd:distance><gco:Distance uom="http://standards.iso.org/ittf/PublicityAvailableStandards/ISO_19139_Schemas/resources.uom/ML_gmxUom.xml#m">' + metadata.data_scaledistance + '</gco:Distance></gmd:distance>\n';
            }
            xml = xml + '</gmd:MD_Resolution></gmd:spatialResolution>\n';
        } else {
            errors.push('data_scales');
        }

        // #TODO: data_Languages
        if (!metadata.data_languages) {
            metadata.data_languages[0] = config.userLang;
            errors.push('data_languages');
        }
        metadata.data_languages.forEach(function(language, key) {
            if (language) {
                data_languages_error = 0;
                xml += '<gmd:language>\n';
                xml += '<gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="' + language + '">' + language + '</gmd:LanguageCode>\n';
                xml += '</gmd:language>\n';
            }
        });

        // #TODO: data_CharacterSet
        if (metadata.data_characterset) {
            xml = xml + '<gmd:spatialRepresentationType>\n';
            xml = xml + '<gmd:MD_SpatialRepresentationTypeCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_SpatialRepresentationTypeCode" codeListValue="' + metadata.data_characterset + '">' + metadata.data_characterset + '</gmd:MD_SpatialRepresentationTypeCode>\n';
            xml = xml + '</gmd:spatialRepresentationType>\n';
        } else {
            errors.push('data_spatialrepresentationtype');
        }

        // #TODO: data_topiccategories_error = 1;
        if (metadata.data_topiccategories) {
            metadata.data_topiccategories.forEach(function(topiccategory, key) {
                if (topiccategory) {
                    data_topiccategories_error = 0;
                    xml += '<gmd:topicCategory><gmd:MD_TopicCategoryCode>' + topiccategory + '</gmd:MD_TopicCategoryCode></gmd:topicCategory>\n';
                }
            });
        } else {
            errors.push('data_topiccategories');
        }

        // data_Extent
        // #TODO: data_geographicextents
        data_geographicextents_error = 1;
        if (metadata.data_geographicextents) {
            metadata.data_geographicextents.forEach(function(geographicextent, key) {
                if (geographicextent.xmin && geographicextent.xmax && geographicextent.ymin && geographicextent.ymax) {
                    data_geographicextents_error = 0;
                    xml += '<gmd:extent><gmd:EX_Extent>\n';
                    xml += '<gmd:description><gco:CharacterString>' + geographicextent.name + '</gco:CharacterString></gmd:description>\n';
                    xml += '<gmd:geographicElement><gmd:EX_GeographicBoundingBox>\n';
                    xml += '<gmd:westBoundLongitude><gco:Decimal>' + geographicextent.xmin + '</gco:Decimal></gmd:westBoundLongitude>\n';
                    xml += '<gmd:eastBoundLongitude><gco:Decimal>' + geographicextent.xmax + '</gco:Decimal></gmd:eastBoundLongitude>\n';
                    xml += '<gmd:southBoundLatitude><gco:Decimal>' + geographicextent.ymin + '</gco:Decimal></gmd:southBoundLatitude>\n';
                    xml += '<gmd:northBoundLatitude><gco:Decimal>' + geographicextent.ymax + '</gco:Decimal></gmd:northBoundLatitude>\n';
                    xml += '</gmd:EX_GeographicBoundingBox></gmd:geographicElement>\n';
                    xml += '</gmd:EX_Extent></gmd:extent>\n';
                }
            });
        }
        if (data_geographicextents_error) {
            errors.push('data_geographicextents');
        }

        // #TODO: data_temporalextents
        data_temporalextents_error = 1;
        if (metadata.data_temporalextents) {
            metadata.data_temporalextents.forEach(function(temporalextent, key) {
                if (temporalextent.description) {
                    data_temporalextents_error = 0;
                    xml += '<gmd:extent><gmd:EX_Extent>\n';
                    xml += '<gmd:description><gco:CharacterString>' + temporalextent.description + '</gco:CharacterString></gmd:description>\n';
                    xml += '<gmd:temporalElement><gmd:EX_TemporalExtent>\n';
                    xml += '<gmd:extent><gml:TimePeriod xsi:type="gml:TimePeriodType" gml:id="TemporalId_' + key + '">\n';
                    xml += '<gml:beginPosition>' + temporalextent.begin + '</gml:beginPosition>\n';
                    xml += '<gml:endPosition>' + temporalextent.end + '</gml:endPosition>\n';
                    xml += '</gml:TimePeriod></gmd:extent>\n';
                    xml += '</gmd:EX_TemporalExtent></gmd:temporalElement>\n';
                    xml += '</gmd:EX_Extent></gmd:extent>\n';
                }
            });
        }
        if (data_temporalextents_error) {
            errors.push('data_temporalextents');
        }

        // #TODO: data_VerticalExtent
        // for i in range(1, 20):
        // e, data_VerticalExtent_Min = _get_xls_value('data_verticalextent'+str(i)+'_min', lst_name, 'string')
        // e, data_VerticalExtent_Max = _get_xls_value('data_verticalextent'+str(i)+'_max', lst_name, 'string')
        // e, data_VerticalExtent_Unit = _get_xls_value('data_verticalextent'+str(i)+'_unit', lst_name, 'string')
        // e, data_VerticalExtent_Ref = _get_xls_value('data_verticalextent'+str(i)+'_ref', lst_name, 'string')
        // if data_VerticalExtent_Min and data_VerticalExtent_Max and data_VerticalExtent_Unit and data_VerticalExtent_Ref:
        // xml += '<gmd:extent><gmd:EX_Extent>\n';
        // xml += '<gmd:verticalElement><gmd:EX_VerticalExtent>\n';
        // xml += '<gmd:minValue><gco:CharacterString>' + data_VerticalExtent_Min + '</gco:CharacterString></gmd:minValue>\n';
        // xml += '<gmd:maxValue><gco:CharacterString>' + data_VerticalExtent_Max + '</gco:CharacterString></gmd:maxValue>\n';
        // xml += '<gmd:uom><gco:CharacterString>' + data_VerticalExtent_Unit + '</gco:CharacterString></gmd:uom>\n';
        // xml += '<gmd:verticalDatum><gco:CharacterString>' + data_VerticalExtent_Ref + '</gco:CharacterString></gmd:verticalDatum>\n';
        // xml += '</gmd:EX_VerticalExtent></gmd:verticalElement>\n';
        // xml += '</gmd:EX_Extent></gmd:extent>\n';

        xml += '</gmd:MD_DataIdentification></gmd:identificationInfo>\n';

        // DISTRIBUTION INFO
        xml += '<gmd:distributionInfo><gmd:MD_Distribution>\n';

        // #TODO: data_distformats
        data_distformats_error = 1;
        if (metadata.data_distformats) {
            metadata.data_distformats.forEach(function(distformat, key) {
                if (distformat.name) {
                    data_distformats_error = 0;
                    xml += '<gmd:distributionFormat><gmd:MD_Format>\n';
                    xml += '<gmd:name><gco:CharacterString>' + distformat.name + '</gco:CharacterString></gmd:name>\n';
                    xml += '<gmd:version><gco:CharacterString>' + distformat.version + '</gco:CharacterString></gmd:version>\n';
                    xml += '<gmd:specification><gco:CharacterString>' + distformat.specification + '</gco:CharacterString></gmd:specification>\n';
                    xml += '</gmd:MD_Format></gmd:distributionFormat>\n';
                }
            });
        }
        if (data_distformats_error) {
            errors.push('data_distformats');
        }

        xml += '<gmd:transferOptions><gmd:MD_DigitalTransferOptions>\n';

        // #TODO: data_linkages (url)
        data_linkages_error = 1;
        if (metadata.data_linkages) {
            metadata.data_linkages.forEach(function(linkage, key) {
                if (linkage.name) {
                    data_linkages_error = 0;
                    xml += '<gmd:onLine><gmd:CI_OnlineResource>\n';
                    xml += '<gmd:linkage><gmd:URL>' + linkage.url + '</gmd:URL></gmd:linkage>\n';
                    xml += '<gmd:protocol><gco:CharacterString>' + linkage.protocol + '</gco:CharacterString></gmd:protocol>\n';
                    xml += '<gmd:name><gco:CharacterString>' + linkage.name + '</gco:CharacterString></gmd:name>\n';
                    xml += '<gmd:description><gco:CharacterString>' + linkage.description + '</gco:CharacterString></gmd:description>\n';
                    xml += '</gmd:CI_OnlineResource></gmd:onLine>\n';
                }
            });
        }
        if (data_linkages_error) {
            errors.push('data_linkages');
        }

        xml += '</gmd:MD_DigitalTransferOptions></gmd:transferOptions>\n';

        xml += '</gmd:MD_Distribution></gmd:distributionInfo>\n';

        // DATA QUALITY INFO
        xml += '<gmd:dataQualityInfo><gmd:DQ_DataQuality>\n';

        // #TODO: DQ_Level
        if (!metadata.data_dq_level) {
            metadata.data_dq_level = metadata.md_hierarchylevel;
            errors.push('data_dq_level'); // valeur par defaut  = hierarchylevel
        }
        //if (metadata.data_dq_level) {
        xml += '<gmd:scope><gmd:DQ_Scope>\n';
        xml += '<gmd:level><gmd:MD_ScopeCode codeListValue="' + metadata.data_dq_level + '" codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode">' + metadata.data_dq_level + '</gmd:MD_ScopeCode></gmd:level>\n';
        xml += '</gmd:DQ_Scope></gmd:scope>\n';
        //}

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

        // DQ_Lineage
        xml += '<gmd:lineage><gmd:LI_Lineage>\n';

        // #TODO: LI_Statement
        if (metadata.data_li_statement) {
            xml += '<gmd:statement><gco:CharacterString>' + metadata.data_li_statement + '</gco:CharacterString></gmd:statement>\n';
        } else {
            errors.push('data_li_statement');
        }

        // #TODO: LI_ProcessStep
        if (metadata.data_li_processstep) {
            xml += '<gmd:processStep><gmd:LI_ProcessStep>\n';
            xml += '<gmd:description><gco:CharacterString>' + metadata.data_li_processstep + '</gco:CharacterString></gmd:description>\n';
            xml += '</gmd:LI_ProcessStep></gmd:processStep>\n';
        } else {
            errors.push('data_li_processstep');
        }

        // #TODO: LI_Source
        if (metadata.data_li_source) {
            xml += '<gmd:source><gmd:LI_Source>\n';
            xml += '<gmd:description><gco:CharacterString>' + metadata.data_li_source + '</gco:CharacterString></gmd:description>\n';
            xml += '</gmd:LI_Source></gmd:source>\n';
        } else {
            errors.push('data_li_source');
        }

        xml += '</gmd:LI_Lineage></gmd:lineage>\n';
        xml += '</gmd:DQ_DataQuality></gmd:dataQualityInfo>\n';

        // Fin du fichier
        xml += '</gmd:MD_Metadata>\n';
        */


        /*
        var channel = $xml.find("gmd\\:channel, channel");
        // console.log('aaa', this.checkValue_(this.obj, 'title'));
        if (this.checkValue_(this.obj, 'title')) {
            var title = channel.find("gmd\\:title, title");
            //var test = channel.find("gmd\\:test, test");
            //console.log(title.length, test.length);
            if (!append) title.remove();
            channel.append(this.getXmlTitle(this.obj.title));
        }
        */

        this.xml = new XMLSerializer().serializeToString($xmlDoc);
        var regex = /( xmlns:[a-z]*="null")/igm;
        this.xml = this.xml.replace(regex, '');
        return this.xml;
    };

    /**
     * Set node from node parameters
     * @private
     * @param  {Object} node - node object to construct node XML
     * node = {
     * 		nameSpace: 'gmd',                  // namespace of node
     * 		nameNode: 'fileIdentifier',        // name of node
     * 		textNode: 'xxxx-xxxx-xxxx-xxxx',   // text of node
     * 		attributes: {                      // list of attributes
     * 			name1: 'value1',               // name and value of attribute
     * 			name2: 'value2'                // name and value of attribute
     * 		}
     * };
     * @return {String} XML node
     */
    md.MetadataObj.prototype.addNode_ = function addNode(node) {
        node = node || {};
        var str_attributes = '';
        if (node.nameSpace) {
            node.fullName = node.nameSpace + ':' + node.nameNode;
            str_attributes += 'xmlns:' + node.nameSpace + '="null"';
        }
        if (node.attributes) {
            for (var a in node.attributes) {
                str_attributes += ' ' + a + '="' + node.attributes[a] + '"';
            }
        }
        var xml = '<' + node.fullName + ' ' + str_attributes + '>' + node.textNode + '</' + node.fullName + '>';
        return xml;
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
        defaultValue = defaultValue || false;
        if (property && object.hasOwnProperty(property)) {
            return object[property];
        }
        this.errors.push(property);
        return defaultValue;
    };

    /**
     * Get md_fileidentifier XML string
     * @return {String} md_fileidentifier XML string
     */
    md.MetadataObj.prototype.getXmlMdFileIdentifier = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'md_fileidentifier', md.guid());
        var characterString = this.addNode_({
            nameSpace: 'gco',
            nameNode: 'CharacterString',
            textNode: textNode
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'fileIdentifier',
            textNode: characterString
        });
    };

    /**
     * Get title XML string
     * @return {String} title XML string
     */
    md.MetadataObj.prototype.getXmlTitle = function(textNode) {
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'title',
            textNode: textNode,
            attributes: {
                'att1': "val1",
                'att2': "val2"
            }
        });
    };


    /**
     * Get md_language XML string
     * @return {String} md_language XML string
     */
    md.MetadataObj.prototype.getXmlMdLanguage = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'md_language', md.config.userLanguage);
        var languageCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'LanguageCode',
            textNode: textNode,
            attributes: {
                codelist: 'http://www.loc.gov/standards/iso639-2/',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'language',
            textNode: languageCode
        });
    };

    /**
     * Get md_characterset XML string
     * @return {String} md_characterset XML string
     */
    md.MetadataObj.prototype.getXmlMdCharacterSet = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'md_characterset', 'utf8');
        var characterSetCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_CharacterSetCode ',
            textNode: textNode,
            attributes: {
                codelist: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'characterSet',
            textNode: characterSetCode
        });
    };


    /**
     * Get md_hierarchylevel XML string
     * @return {String} md_hierarchylevel XML string
     */
    md.MetadataObj.prototype.getXmlMdHierarchyLevel = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'md_hierarchylevel');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get md_contacts XML string
     * @return {String} md_contacts XML string
     */
    md.MetadataObj.prototype.getXmlMdContacts = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'md_contacts');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     *  Get md_datestamp XML string
     *  @return {String} md_datestamp XML string
     */
    md.MetadataObj.prototype.getXmlMdDateStamp = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'md_datestamp');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get md_standardname XML string
     * @return {String} md_standardname XML string
     */
    md.MetadataObj.prototype.getXmlMdStandardName = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'md_standardname');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get md_standardversion XML string
     * @return {String} md_standardversion XML string
     */
    md.MetadataObj.prototype.getXmlMdStandardVersion = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'md_standardversion');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_title XML string
     * @return {String} data_title XML string
     */
    md.MetadataObj.prototype.getXmlDataTitle = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_title');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_dates XML string
     * @return {String} data_dates XML string
     */
    md.MetadataObj.prototype.getXmlDataDates = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_dates');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /***
     * Get data_identifiers XML string
     * @return {String} data_identifiers XML string
     */
    md.MetadataObj.prototype.getXmlDataIdentifiers = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_identifiers');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_abstract XML string
     * @return {String} data_abstract XML string
     */
    md.MetadataObj.prototype.getXmlDataAbstract = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_abstract');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_browsegraphics XML string
     * @return {String} data_browsegraphics XML string
     */
    md.MetadataObj.prototype.getXmlDataBrowseGraphics = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_browsegraphics');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_maintenancefrequencycode XML string
     * @return {String} data_maintenancefrequencycode XML string
     */
    md.MetadataObj.prototype.getXmlDataMaintenancefrequencyCode = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_maintenancefrequencycode');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_temporalextents XML string
     * @return {String} data_temporalextents XML string
     */
    md.MetadataObj.prototype.getXmlDataTemporalExtents = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_temporalextents');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_languages XML string
     * @return {String} data_languages XML string
     */
    md.MetadataObj.prototype.getXmlDataLanguages = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_languages');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_topiccategories XML string
     * @return {String} data_topiccategories XML string
     */
    md.MetadataObj.prototype.getXmlDataTopicCategories = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_topiccategories');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_keywords XML string
     * @return {String} data_keywords XML string
     */
    md.MetadataObj.prototype.getXmlDataKeywords = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_keywords');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };
    /**
     * Get data_inspirekeywords XML string
     * @return {String} data_inspirekeywords XML string
     */
    md.MetadataObj.prototype.getXmlDataInspireKeywords = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_inspirekeywords');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_pointofcontacts XML string
     * @return {String} data_pointofcontacts XML string
     */
    md.MetadataObj.prototype.getXmlDataPointOfContacts = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_pointofcontacts');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_geographicextents XML string
     * @return {String} data_geographicextents XML string
     */
    md.MetadataObj.prototype.getXmlDataGeographicExtents = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_geographicextents');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_referencesystems XML string
     * @return {String} data_referencesystems XML string
     */
    md.MetadataObj.prototype.getXmlDataReferenceSystems = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_referencesystems');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_presentationform XML string
     * @return {String} data_presentationform XML string
     */
    md.MetadataObj.prototype.getXmlDataPresentationForm = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_presentationform');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_spatialrepresentationtype XML string
     * @return {String} data_spatialrepresentationtype XML string
     */
    md.MetadataObj.prototype.getXmlDataSpatialRepresentationType = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_spatialrepresentationtype');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_scaledenominator XML string
     * @return {String} data_scaledenominator XML string
     */
    md.MetadataObj.prototype.getXmlDataScaleDenominator = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_scaledenominator');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_scaledistance XML string
     * @return {String} data_scaledistance XML string
     */
    md.MetadataObj.prototype.getXmlDataScaleDistance = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_scaledistance');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_dq_level XML string
     * @return {String} data_dq_level XML string
     */
    md.MetadataObj.prototype.getXmlDataDqLevel = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_dq_level');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_li_statement XML string
     * @return {String} data_li_statement XML string
     */
    md.MetadataObj.prototype.getXmlDataLiStatement = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_li_statement');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_characterset XML string
     * @return {String} data_characterset XML string
     */
    md.MetadataObj.prototype.getXmlDataCharacterSetCode = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_characterset');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };
    /**
     * Get data_distributionformats XML string
     * @return {String} data_distributionformats XML string
     */
    md.MetadataObj.prototype.getXmlDataDistributionFormat = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_distributionformats');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_uselimitations XML string
     * @return {String} data_uselimitations XML string
     */
    md.MetadataObj.prototype.getXmlDataUseLimitations = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_uselimitations');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_legal_uselimitations XML string
     * @return {String} data_legal_uselimitations XML string
     */
    md.MetadataObj.prototype.getXmlDataLegalUseLimitations = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_legal_uselimitations');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_legal_useconstraints XML string
     * @return {String} data_legal_useconstraints XML string
     */
    md.MetadataObj.prototype.getXmlDataLegalUseConstraints = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_legal_useconstraints');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_legal_accessconstraints XML string
     * @return {String} data_legal_accessconstraints XML string
     */
    md.MetadataObj.prototype.getXmlDataLegalAccessConstraints = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_legal_accessconstraints');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_legal_accessinspireconstraints XML string
     * @return {String} data_legal_accessinspireconstraints XML string
     */
    md.MetadataObj.prototype.getXmlDataLegalAccessinspireConstraints = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_legal_accessinspireconstraints');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_legal_accessotherconstraints XML string
     * @return {String} data_legal_accessotherconstraints XML string
     */
    md.MetadataObj.prototype.getXmlDataLegalAccessotherConstraints = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_legal_accessotherconstraints');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_security_classification XML string
     * @return {String} data_security_classification XML string
     */
    md.MetadataObj.prototype.getXmlDataSecurityClassification = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_security_classification');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_security_uselimitations XML string
     * @return {String} data_security_uselimitations XML string
     */
    md.MetadataObj.prototype.getXmlDataSecurityUseLimitations = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_security_uselimitations');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_linkages XML string
     * @return {String} data_linkages XML string
     */
    md.MetadataObj.prototype.getXmlDataLinkages = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_linkages');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_dq_inspireconformities XML string
     * @return {String} data_dq_inspireconformities XML string
     */
    md.MetadataObj.prototype.getXmlDataDqInspireConformities = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_dq_inspireconformities');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };

    /**
     * Get data_dq_conformities XML string
     * @return {String} data_dq_conformities XML string
     */
    md.MetadataObj.prototype.getXmlDataDqConformities = function(textNode) {
        textNode = textNode || this.checkValue_(this.obj, 'data_dq_conformities');
        var scopeCode = this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'MD_ScopeCode',
            textNode: textNode,
            attributes: {
                codelist: ' http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode ',
                codeListValue: textNode
            }
        });
        return this.addNode_({
            nameSpace: 'gmd',
            nameNode: 'hierarchyLevel',
            textNode: scopeCode
        });
    };








}(window.md = window.md || {}));



// Fichier XML source
/*
var defaultBaseXml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<gmd:MD_Metadata xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xmlns:gmd="http://www.isotc211.org/2005/gmd" xsi:schemaLocation="http://www.isotc211.org/2005/gmd http://schemas.opengis.net/iso/19139/20060504/gmd/gmd.xsd">' +
        '<gmd:channel>' +
            '<gmd:title>' +
                'RSS Title' +
            '</gmd:title>' +
        '</gmd:channel>' +
    '</gmd:MD_Metadata>';
xmlDoc = $.parseXML(defaultBaseXml);
$xml = $(xmlDoc);
// Infos sur le noeud à ajouter
var attributes = {
    'att1': "val1",
    'att2': "val2"
};
// rouver l'ensemble des éléments 'title'
$title = $xml.find("gmd\\:channel>gmd\\:title, channel>title");
//$title.first().remove();
// Supprimer les éléments title
$title.remove();

// Ajouter le nouvel élément title
$channel = $xml.find("gmd\\:channel, channel");
$channel.append(addNode('gmd', 'title', attributes, 'test 2'));
// Afficher le résultat
var xmlString = new XMLSerializer().serializeToString(xmlDoc);
var regex = /( xmlns:[a-z]*="null")/igm;
xmlString = xmlString.replace(regex, '');
console.log(xmlString);
*/




function xmlContacts(contacts, contactType, errors) {
    var xml = '';
    var xml_begin, xml_end, email_error, organisation_error, contacts_error;
    if (contactType == 'md') {
        xml_begin = '<gmd:contact>\n' + '<gmd:CI_ResponsibleParty>\n';
        xml_end = '</gmd:CI_ResponsibleParty>\n' + '</gmd:contact>\n';
        email_error = 'md_contact_email';
        organisation_error = 'md_contact_organisation';
        contacts_error = 'md_contacts';
    } else {
        xml_begin = '<gmd:pointOfContact>\n' + '<gmd:CI_ResponsibleParty>\n';
        xml_end = '</gmd:CI_ResponsibleParty>\n' + '</gmd:pointOfContact>\n';
        email_error = 'data_contact_email';
        organisation_error = 'data_contact_organisation';
        contacts_error = 'data_contacts';
    }

    var cnt_error = 1;
    contacts.forEach(function(contact, key) {
        if (!contact.role) {
            contact.role = 'pointOfContact';
        }
        //if (contact.organisation || contact.name || contact.position) {
        if (contact) {
            cnt_error = 0;
            xml += xml_begin;
            if (contact.name) {
                xml += '<gmd:individualName><gco:CharacterString>' + contact.name + '</gco:CharacterString></gmd:individualName>\n';
            }
            if (contact.organisation) {
                xml += '<gmd:organisationName><gco:CharacterString>' + contact.organisation + '</gco:CharacterString></gmd:organisationName>\n';
            } else {
                errors.push(organisation_error);
            }
            if (contact.position) {
                xml += '<gmd:positionName><gco:CharacterString>' + contact.position + '</gco:CharacterString></gmd:positionName>\n';
            }
            xml += '<gmd:contactInfo><gmd:CI_Contact>\n';
            if (contact.tel) {
                xml += '<gmd:phone><gmd:CI_Telephone><gmd:voice><gco:CharacterString>' + contact.tel + '</gco:CharacterString></gmd:voice></gmd:CI_Telephone></gmd:phone>\n';
            }
            xml += '<gmd:address><gmd:CI_Address>\n';
            if (contact.address) {
                xml += '<gmd:deliveryPoint><gco:CharacterString>' + contact.address + '</gco:CharacterString></gmd:deliveryPoint>\n';
            }
            if (contact.city) {
                xml += '<gmd:city><gco:CharacterString>' + contact.city + '</gco:CharacterString></gmd:city>\n';
            }
            if (contact.cp) {
                xml += '<gmd:postalCode><gco:CharacterString>' + contact.cp + '</gco:CharacterString></gmd:postalCode>\n';
            }
            if (contact.email) {
                xml += '<gmd:electronicMailAddress><gco:CharacterString>' + contact.email + '</gco:CharacterString></gmd:electronicMailAddress>\n';
            } else {
                errors.push(email_error);
            }
            xml += '</gmd:CI_Address></gmd:address>\n';

            /* #TODO: ajouter logo
            <gmd:contactInstructions>
                <gmx:FileName src="https://cigalsace.org/metadata/ARAA/Logos/Logo_ARAA.jpg">logo</gmx:FileName>
            </gmd:contactInstructions>
            */

            xml += '</gmd:CI_Contact></gmd:contactInfo>\n';
            xml += '<gmd:role><gmd:CI_RoleCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_RoleCode" codeListValue="' + contact.role + '">' + contact.role + '</gmd:CI_RoleCode></gmd:role>\n';
            xml += xml_end;
        }
    });
    if (cnt_error) {
        errors.push(contacts_error);
    }
    return {
        xml: xml,
        errors: errors
    };
}

function xmlDataDate(date, dateType) {
    //console.log('date: '+date);
    //console.log('date: '+moment(date).format('YYYY-MM-DD'));
    //alert('date: '+moment(date).format('YYYY-MM-DD'));
    if (date) {
        var data_date = {
            type: dateType,
            date: moment(date).format('YYYY-MM-DD')
        };
        return data_date;
    }
    return '';

}

function xmlKeywords(keywords, errors) {
    var xml = '';
    var data_keywords_error = 1;
    if (keywords) {
        keywords.forEach(function(keyword, key) {
            if (keyword) {
                data_keywords_error = 0;
                xml += '<gmd:descriptiveKeywords><gmd:MD_Keywords>\n';
                xml += '<gmd:keyword><gco:CharacterString>' + keyword.keyword + '</gco:CharacterString></gmd:keyword>\n';
                if (keyword.type) {
                    xml += '<gmd:type><gmd:MD_KeywordTypeCode codeListValue="' + keyword.type + '" codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_KeywordTypeCode" />' + keyword.type + '</gmd:type>\n';
                }
                if (keyword.thesaurus_name) {
                    xml += '<gmd:thesaurusName><gmd:CI_Citation>\n';
                    xml += '<gmd:title><gco:CharacterString>' + keyword.thesaurus_name + '</gco:CharacterString></gmd:title>\n';
                    if (keyword.thesaurus_dates) {
                        //console.log(keyword.thesaurus_dates);
                        keyword.thesaurus_dates.forEach(function(date, key) {
                            xml += '<gmd:date><gmd:CI_Date>\n';
                            xml += '<gmd:date><gco:Date>' + date.date + '</gco:Date></gmd:date>\n';
                            xml += '<gmd:dateType><gmd:CI_DateTypeCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode" codeListValue="' + date.type + '">creation</gmd:CI_DateTypeCode></gmd:dateType>\n';
                            xml += '</gmd:CI_Date></gmd:date>\n';
                        });
                    }
                    xml += '</gmd:CI_Citation></gmd:thesaurusName>\n';
                }
                xml += '</gmd:MD_Keywords></gmd:descriptiveKeywords>\n';
            }
        });
    } else {
        errors.push('data_inspirekeywords');
    }
    return {
        xml: xml,
        errors: errors
    };
}

function xmlConformities(conformities, conformityType, errors) {
    var xml = '';
    var conformities_error;
    if (conformityType == 'inspire') {
        conformities_error = 'data_dq_inspireconformities';
    } else {
        conformities_error = 'data_dq_conformities';
    }
    data_dq_conformities_error = 1;
    if (conformities) {
        conformities.forEach(function(conformity, key) {
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
        });
    }
    if (data_dq_conformities_error) {
        errors.push(conformities_error);
    }
    return {
        xml: xml,
        errors: errors
    };
}

/*
function json2xml(metadata) {
    var xml = '';
    var errors = [];

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<gmd:MD_Metadata xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.isotc211.org/2005/gmd http://schemas.opengis.net/iso/19139/20060504/gmd/gmd.xsd">\n';

    // md_fileidentifier
    //var md_fileidentifier = metadata.md_fileidentifier;
    if (!metadata.md_fileidentifier) {
        metadata.md_fileidentifier = guid();
        errors.push('md_fileidentifier');
    }
    xml += '<gmd:fileIdentifier><gco:CharacterString>' + metadata.md_fileidentifier + '</gco:CharacterString></gmd:fileIdentifier>\n';

    // md_Language
    // Default value define in metametadata.json else use config.userLang
    if (!metadata.md_language) {
        metadata.md_language = config.userLang;
        errors.push('md_language');
    }
    xml += '<gmd:language><gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="' + metadata.md_language + '">' + metadata.md_language + '</gmd:LanguageCode></gmd:language>\n';

    // md_CharacterSet
    // Default value define in metametadata.json
    if (metadata.md_characterset) {
        xml += '<gmd:characterSet><gmd:MD_CharacterSetCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode" codeListValue="' + metadata.md_characterset + '">' + metadata.md_characterset + '</gmd:MD_CharacterSetCode></gmd:characterSet>\n';
    } else {
        errors.push('md_characterset');
    }

    // md_HierarchyLevel
    if (metadata.md_hierarchylevel) {
        xml += '<gmd:hierarchyLevel><gmd:MD_ScopeCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode" codeListValue="' + metadata.md_hierarchylevel + '">' + metadata.md_hierarchylevel + '</gmd:MD_ScopeCode></gmd:hierarchyLevel>\n';
    } else {
        errors.push('md_hierarchylevel');
    }

    // md_contacts
    var md_contacts = xmlContacts(metadata.md_contacts, 'md', errors);
    xml += md_contacts.xml;
    errors = md_contacts.errors;

    // md_datestamp
    if (!metadata.md_datestamp) {
        var currentTime = new Date();
        var month = ((currentTime.getMonth() + 1) < 10 ? '0' : '') + (currentTime.getMonth() + 1);
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        metadata.md_datestamp = year + '-' + month + '-' + day;
        errors.push('md_datestamp');
    }
    xml += '<gmd:dateStamp><gco:Date>' + metadata.md_datestamp + '</gco:Date></gmd:dateStamp>\n';

    // md_standardname
    if (metadata.md_standardname) {
        xml += '<gmd:metadataStandardName><gco:CharacterString>' + metadata.md_standardname + '</gco:CharacterString></gmd:metadataStandardName>\n';
    } else {
        errors.push('md_standardname');
    }

    // md_standardversion
    if (metadata.md_standardversion) {
        xml += '<gmd:metadataStandardVersion><gco:CharacterString>' + metadata.md_standardversion + '</gco:CharacterString></gmd:metadataStandardVersion>\n';
    } else {
        errors.push('md_standardversion');
    }

    // DATA
    // data_referencesystem
    var data_referencesystems_error = 1;
    if (metadata.data_referencesystems) {
        metadata.data_referencesystems.forEach(function(referencesystem, key) {
            if (referencesystem) {
                data_referencesystems_error = 0;
                xml += '<gmd:referenceSystemInfo><gmd:MD_ReferenceSystem>\n';
                xml += '<gmd:referenceSystemIdentifier><gmd:RS_Identifier>\n';
                xml += '<gmd:code><gco:CharacterString>' + referencesystem.code + '</gco:CharacterString></gmd:code>\n';
                xml += '</gmd:RS_Identifier></gmd:referenceSystemIdentifier>\n';
                xml += '</gmd:MD_ReferenceSystem></gmd:referenceSystemInfo>\n';
            }
        });
    }
    if (data_referencesystems_error) {
        errors.push('data_referencesystems');
    }

    // IDENTIFICATION INFO
    xml += '<gmd:identificationInfo><gmd:MD_DataIdentification>\n';
    xml += '<gmd:citation><gmd:CI_Citation>\n';

    // data_title
    if (metadata.data_title) {
        xml += '<gmd:title><gco:CharacterString>' + metadata.data_title + '</gco:CharacterString></gmd:title>\n';
    } else {
        errors.push('data_title');
    }

    // Init data_dates
    metadata.data_dates = [];
    // data_DateCreation / data_DateRevision / data_DatePublication
    if (metadata.data_datecreation) {
        var data_datecreation = xmlDataDate(metadata.data_datecreation, 'creation');
        metadata.data_dates.push(data_datecreation);
    }
    if (metadata.data_daterevision) {
        var data_daterevision = xmlDataDate(metadata.data_daterevision, 'revision');
        metadata.data_dates.push(data_daterevision);
    }
    if (metadata.data_datepublication) {
        var data_datepublication = xmlDataDate(metadata.data_datepublication, 'publication');
        metadata.data_dates.push(data_datepublication);
    }

    var data_dates_error = 1;
    if (metadata.data_dates) {
        metadata.data_dates.forEach(function(date, key) {
            if (date) {
                data_dates_error = 0;
                xml += '<gmd:date><gmd:CI_Date>\n';
                xml += '<gmd:date><gco:Date>' + date.date + '</gco:Date></gmd:date>\n';
                xml += '<gmd:dateType><gmd:CI_DateTypeCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode" codeListValue="' + date.type + '">' + date.type + '</gmd:CI_DateTypeCode></gmd:dateType>\n';
                xml += '</gmd:CI_Date></gmd:date>\n';
            }
        });
    }
    if (data_dates_error) {
        errors.push('data_dates');
    }

    // data_Identifier
    // Renseigner md_fileidentifier comme data_Identifier par défaut si n'existe pas + message
    if (!metadata.data_identifiers) {
        metadata.data_identifiers = [{
            code: metadata.md_fileidentifier,
            codespace: 'md_fileidentifier'
        }];
        errors.push('data_identifiers');
    }
    metadata.data_identifiers.forEach(function(identifier, key) {
        if (identifier.code) {
            xml += '<gmd:identifier><gmd:RS_Identifier>\n';
            xml += '<gmd:code><gco:CharacterString>' + identifier.code + '</gco:CharacterString></gmd:code>\n';
            xml += '<gmd:codeSpace><gco:CharacterString>' + identifier.codespace + '</gco:CharacterString></gmd:codeSpace>\n';
            xml += '</gmd:RS_Identifier></gmd:identifier>\n';
        }
    });
    xml += '</gmd:CI_Citation></gmd:citation>\n';

    // data_abstract
    if (metadata.data_abstract) {
        xml += '<gmd:abstract><gco:CharacterString>' + metadata.data_abstract + '</gco:CharacterString></gmd:abstract>\n';
    } else {
        errors.push('data_abstract');
    }

    // data_PointOfContact
    if (metadata.data_contacts) {
        var data_contacts = xmlContacts(metadata.data_contacts, 'data', errors);
        xml += data_contacts.xml;
        errors = data_contacts.errors;
    }
    // data_maintenancefrequencycode
    if (metadata.data_maintenancefrequencycode) {
        xml += '<gmd:resourceMaintenance>\n';
        xml += '<gmd:MD_MaintenanceInformation>\n';
        xml += '<gmd:maintenanceAndUpdateFrequency>\n';
        xml += '<gmd:MD_MaintenanceFrequencyCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_MaintenanceFrequencyCode" codeListValue="' + metadata.data_maintenancefrequencycode + '">' + metadata.data_maintenancefrequencycode + '</gmd:MD_MaintenanceFrequencyCode>\n';
        xml += '</gmd:maintenanceAndUpdateFrequency>\n';
        xml += '</gmd:MD_MaintenanceInformation>\n';
        xml += '</gmd:resourceMaintenance>\n';
    } else {
        errors.push('data_maintenancefrequencycode');
    }

    // data_browsegraphic
    if (metadata.data_browsegraphics) {
        metadata.data_browsegraphics.forEach(function(browsegraphic, key) {
            if (browsegraphic.url) {
                if (!browsegraphic.type) {
                    var parts = browsegraphic.url.split('.');
                    browsegraphic.type = parts[(parts.length - 1)];
                }
                xml += '<gmd:graphicOverview>\n';
                xml += '<gmd:MD_BrowseGraphic>\n';
                xml += '<gmd:fileName>\n';
                xml += '<gco:CharacterString>' + browsegraphic.url + '</gco:CharacterString>\n';
                xml += '</gmd:fileName>\n';
                xml += '<gmd:fileDescription>\n';
                xml += '<gco:CharacterString>' + browsegraphic.description + '</gco:CharacterString>\n';
                xml += '</gmd:fileDescription>\n';
                xml += '<gmd:fileType>\n';
                xml += '<gco:CharacterString>' + browsegraphic.type + '</gco:CharacterString>\n';
                xml += '</gmd:fileType>\n';
                xml += '</gmd:MD_BrowseGraphic>\n';
                xml += '</gmd:graphicOverview>\n';
            } else {
                errors.push('data_browsegraphics');
            }
        });
    }

    // Keywords
    var data_keywords_error = 1;

    // data_inspirekeywords
    var inspire_keywords = [];
    if (metadata.data_inspirekeywords) {
        data_keywords_error = 0;
        metadata.data_inspirekeywords.forEach(function(inspirekeyword, key) {
            var inspire_keyword = {
                "keyword": inspirekeyword.keyword,
                "type": inspirekeyword.type,
                "thesaurus_name": "GEMET - INSPIRE themes, version 1.0",
                "thesaurus_dates": [{
                    "type": "publication",
                    "date": "2008-06-01"
                }]
            };
            inspire_keywords.push(inspire_keyword);
        });
    } else {
        errors.push('data_inspirekeywords');
    }
    var data_inspirekeywords = xmlKeywords(inspire_keywords, errors);
    xml += data_inspirekeywords.xml;
    errors = data_inspirekeywords.errors;

    // data_keywords_list
    var data_keywords_list = [];
    if (metadata.data_keywords_list) {
        var keywords_list = metadata.data_keywords_list.split(',');
        keywords_list.forEach(function(keyword, key) {
            var data_keyword = {
                keyword: keyword.trim(),
                type: '',
                thesaurus_name: '',
                thesaurus_dates: [{
                    type: '',
                    date: ''
                }]
            };
            data_keywords_list.push(data_keyword);
        });
    }
    data_keywords_list = xmlKeywords(data_keywords_list, errors);
    xml += data_keywords_list.xml;
    errors = data_keywords_list.errors;

    // data_keywords
    if (metadata.data_keywords) {
        var data_keywords = xmlKeywords(metadata.data_keywords, errors);
        xml += data_keywords.xml;
        errors = data_keywords.errors;
    }

    // resourceConstraints: le principe retenu ici est d'utiliser 1 <resourceConstraints> pour chaque type de contrainte: <MD_Constraints>, <MD_LegalConstraints> et <MD_SecurityConstraints>
    // resourceConstraints > Constraints
    // data_uselimitations
    var data_uselimitations_error = 1;
    if (metadata.data_uselimitations) {
        metadata.data_uselimitations.forEach(function(uselimitation, key) {
            if (uselimitation) {
                data_uselimitations_error = 0;
                xml += '<gmd:resourceConstraints><gmd:MD_Constraints>\n';
                xml += '<gmd:useLimitation><gco:CharacterString>' + uselimitation + '</gco:CharacterString></gmd:useLimitation>\n';
                xml += '</gmd:MD_Constraints></gmd:resourceConstraints>\n';
            }
        });
    }
    if (data_uselimitations_error) {
        errors.push('data_uselimitations');
    }

    // ResourceConstraints > LegalConstraints
    xml += '<gmd:resourceConstraints><gmd:MD_LegalConstraints>\n';

    // data_legal_useLimitations
    var data_legal_uselimitations_error = 1;
    if (metadata.data_legal_uselimitations) {
        metadata.data_legal_uselimitations.forEach(function(legal_uselimitation, key) {
            if (legal_uselimitation) {
                data_legal_uselimitations_error = 0;
                xml += '<gmd:useLimitation>\n';
                xml += '<gco:CharacterString>' + legal_uselimitation + '</gco:CharacterString>\n';
                xml += '<gmd:useLimitation>\n';
            }
        });
    }
    if (data_legal_uselimitations_error) {
        errors.push('data_legal_useLimitations');
    }

    // data_legal_accessconstraints
    var data_legal_accessconstraints_error = 1;
    if (metadata.data_legal_accessconstraints) {
        metadata.data_legal_accessconstraints.forEach(function(legal_accessconstraint, key) {
            if (legal_accessconstraint) {
                data_legal_accessconstraints_error = 0;
                xml += '<gmd:accessConstraints>\n';
                xml += '<gmd:MD_RestrictionCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode" codeListValue="' + legal_accessconstraint + '">' + legal_accessconstraint + '</gmd:MD_RestrictionCode>\n';
                xml += '</gmd:accessConstraints>\n';
            }
        });
    }
    if (data_legal_accessconstraints_error) {
        errors.push('data_legal_accessconstraints');
    }

    // data_legal_useconstraints
    var data_legal_useconstraints_error = 1;
    if (metadata.data_legal_useconstraints) {
        metadata.data_legal_useconstraints.forEach(function(legal_useconstraint, key) {
            if (legal_useconstraint) {
                data_legal_useconstraints_error = 0;
                xml += '<gmd:useConstraints>\n';
                xml += '<gmd:MD_RestrictionCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode" codeListValue="' + legal_useconstraint + '">' + legal_useconstraint + '</gmd:MD_RestrictionCode>\n';
                xml += '</gmd:useConstraints>\n';
            }
        });
    }
    if (data_legal_useconstraints_error) {
        errors.push('data_legal_useconstraints');
    }

    // data_legal_accessinspireconstraints
    if (metadata.data_legal_accessinspireconstraints) {
        metadata.data_legal_accessinspireconstraints.forEach(function(legal_accessinspireconstraint, key) {
            metadata.data_legal_accessotherconstraints.push(legal_accessinspireconstraint);
        });
    }
    // data_legal_accessotherconstraints
    var data_legal_accessotherconstraints_error = 1;
    if (metadata.data_legal_accessotherconstraints) {
        metadata.data_legal_accessotherconstraints.forEach(function(legal_accessotherconstraint, key) {
            if (legal_accessotherconstraint) {
                data_legal_accessotherconstraints_error = 0;
                xml += '<gmd:otherConstraints><gco:CharacterString>' + legal_accessotherconstraint + '</gco:CharacterString></gmd:otherConstraints>\n';
            }
        });
    }
    if (data_legal_accessotherconstraints_error) {
        errors.push('data_legal_accessotherconstraints');
    }

    xml += '</gmd:MD_LegalConstraints></gmd:resourceConstraints>\n';

    // ResourceConstraints > SecurityConstraints
    // TODO: data_security_uselimitations

    // data_security_classification
    if (metadata.data_security_classification) {
        xml += '<gmd:resourceConstraints><gmd:MD_SecurityConstraints><gmd:classification>\n';
        xml += '<gmd:MD_ClassificationCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ClassificationCode" codeListValue="' + metadata.data_security_classification + '">' + metadata.data_security_classification + '</gmd:MD_ClassificationCode>\n';
        xml += '</gmd:classification></gmd:MD_SecurityConstraints></gmd:resourceConstraints>\n';
    } else {
        errors.push('data_security_classification');
    }

    // Fin de data_ResourceConstraints

    // data_SpatialRepresentationType
    if (metadata.data_spatialrepresentationtype) {
        xml = xml + '<gmd:spatialRepresentationType>\n';
        xml = xml + '<gmd:MD_SpatialRepresentationTypeCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_SpatialRepresentationTypeCode" codeListValue="' + metadata.data_spatialrepresentationtype + '">' + metadata.data_spatialrepresentationtype + '</gmd:MD_SpatialRepresentationTypeCode>\n';
        xml = xml + '</gmd:spatialRepresentationType>\n';
    } else {
        errors.push('data_spatialrepresentationtype');
    }

    // data_ScaleDenominator / data_ScaleDistance
    if (metadata.data_scaledenominator || metadata.data_scaledistance) {
        xml = xml + '<gmd:spatialResolution><gmd:MD_Resolution>\n';
        if (metadata.data_scaledenominator) {
            xml = xml + '<gmd:equivalentScale><gmd:MD_RepresentativeFraction>\n';
            xml = xml + '<gmd:denominator><gco:Integer>' + metadata.data_scaledenominator + '</gco:Integer></gmd:denominator>\n';
            xml = xml + '</gmd:MD_RepresentativeFraction></gmd:equivalentScale>\n';
        }
        if (metadata.data_scaledistance) {
            xml = xml + '<gmd:distance><gco:Distance uom="http://standards.iso.org/ittf/PublicityAvailableStandards/ISO_19139_Schemas/resources.uom/ML_gmxUom.xml#m">' + metadata.data_scaledistance + '</gco:Distance></gmd:distance>\n';
        }
        xml = xml + '</gmd:MD_Resolution></gmd:spatialResolution>\n';
    } else {
        errors.push('data_scales');
    }

    // data_Languages
    if (!metadata.data_languages) {
        metadata.data_languages[0] = config.userLang;
        errors.push('data_languages');
    }
    metadata.data_languages.forEach(function(language, key) {
        if (language) {
            data_languages_error = 0;
            xml += '<gmd:language>\n';
            xml += '<gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="' + language + '">' + language + '</gmd:LanguageCode>\n';
            xml += '</gmd:language>\n';
        }
    });

    // data_CharacterSet
    if (metadata.data_characterset) {
        xml = xml + '<gmd:spatialRepresentationType>\n';
        xml = xml + '<gmd:MD_SpatialRepresentationTypeCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_SpatialRepresentationTypeCode" codeListValue="' + metadata.data_characterset + '">' + metadata.data_characterset + '</gmd:MD_SpatialRepresentationTypeCode>\n';
        xml = xml + '</gmd:spatialRepresentationType>\n';
    } else {
        errors.push('data_spatialrepresentationtype');
    }

    data_topiccategories_error = 1;
    if (metadata.data_topiccategories) {
        metadata.data_topiccategories.forEach(function(topiccategory, key) {
            if (topiccategory) {
                data_topiccategories_error = 0;
                xml += '<gmd:topicCategory><gmd:MD_TopicCategoryCode>' + topiccategory + '</gmd:MD_TopicCategoryCode></gmd:topicCategory>\n';
            }
        });
    } else {
        errors.push('data_topiccategories');
    }

    // data_Extent
    // data_geographicextents
    data_geographicextents_error = 1;
    if (metadata.data_geographicextents) {
        metadata.data_geographicextents.forEach(function(geographicextent, key) {
            if (geographicextent.xmin && geographicextent.xmax && geographicextent.ymin && geographicextent.ymax) {
                data_geographicextents_error = 0;
                xml += '<gmd:extent><gmd:EX_Extent>\n';
                xml += '<gmd:description><gco:CharacterString>' + geographicextent.name + '</gco:CharacterString></gmd:description>\n';
                xml += '<gmd:geographicElement><gmd:EX_GeographicBoundingBox>\n';
                xml += '<gmd:westBoundLongitude><gco:Decimal>' + geographicextent.xmin + '</gco:Decimal></gmd:westBoundLongitude>\n';
                xml += '<gmd:eastBoundLongitude><gco:Decimal>' + geographicextent.xmax + '</gco:Decimal></gmd:eastBoundLongitude>\n';
                xml += '<gmd:southBoundLatitude><gco:Decimal>' + geographicextent.ymin + '</gco:Decimal></gmd:southBoundLatitude>\n';
                xml += '<gmd:northBoundLatitude><gco:Decimal>' + geographicextent.ymax + '</gco:Decimal></gmd:northBoundLatitude>\n';
                xml += '</gmd:EX_GeographicBoundingBox></gmd:geographicElement>\n';
                xml += '</gmd:EX_Extent></gmd:extent>\n';
            }
        });
    }
    if (data_geographicextents_error) {
        errors.push('data_geographicextents');
    }

    // data_temporalextents
    data_temporalextents_error = 1;
    if (metadata.data_temporalextents) {
        metadata.data_temporalextents.forEach(function(temporalextent, key) {
            if (temporalextent.description) {
                data_temporalextents_error = 0;
                xml += '<gmd:extent><gmd:EX_Extent>\n';
                xml += '<gmd:description><gco:CharacterString>' + temporalextent.description + '</gco:CharacterString></gmd:description>\n';
                xml += '<gmd:temporalElement><gmd:EX_TemporalExtent>\n';
                xml += '<gmd:extent><gml:TimePeriod xsi:type="gml:TimePeriodType" gml:id="TemporalId_' + key + '">\n';
                xml += '<gml:beginPosition>' + temporalextent.begin + '</gml:beginPosition>\n';
                xml += '<gml:endPosition>' + temporalextent.end + '</gml:endPosition>\n';
                xml += '</gml:TimePeriod></gmd:extent>\n';
                xml += '</gmd:EX_TemporalExtent></gmd:temporalElement>\n';
                xml += '</gmd:EX_Extent></gmd:extent>\n';
            }
        });
    }
    if (data_temporalextents_error) {
        errors.push('data_temporalextents');
    }

    // data_VerticalExtent
    // for i in range(1, 20):
    // e, data_VerticalExtent_Min = _get_xls_value('data_verticalextent'+str(i)+'_min', lst_name, 'string')
    // e, data_VerticalExtent_Max = _get_xls_value('data_verticalextent'+str(i)+'_max', lst_name, 'string')
    // e, data_VerticalExtent_Unit = _get_xls_value('data_verticalextent'+str(i)+'_unit', lst_name, 'string')
    // e, data_VerticalExtent_Ref = _get_xls_value('data_verticalextent'+str(i)+'_ref', lst_name, 'string')
    // if data_VerticalExtent_Min and data_VerticalExtent_Max and data_VerticalExtent_Unit and data_VerticalExtent_Ref:
    // xml += '<gmd:extent><gmd:EX_Extent>\n';
    // xml += '<gmd:verticalElement><gmd:EX_VerticalExtent>\n';
    // xml += '<gmd:minValue><gco:CharacterString>' + data_VerticalExtent_Min + '</gco:CharacterString></gmd:minValue>\n';
    // xml += '<gmd:maxValue><gco:CharacterString>' + data_VerticalExtent_Max + '</gco:CharacterString></gmd:maxValue>\n';
    // xml += '<gmd:uom><gco:CharacterString>' + data_VerticalExtent_Unit + '</gco:CharacterString></gmd:uom>\n';
    // xml += '<gmd:verticalDatum><gco:CharacterString>' + data_VerticalExtent_Ref + '</gco:CharacterString></gmd:verticalDatum>\n';
    // xml += '</gmd:EX_VerticalExtent></gmd:verticalElement>\n';
    // xml += '</gmd:EX_Extent></gmd:extent>\n';

    xml += '</gmd:MD_DataIdentification></gmd:identificationInfo>\n';

    // DISTRIBUTION INFO
    xml += '<gmd:distributionInfo><gmd:MD_Distribution>\n';

    // data_distformats
    data_distformats_error = 1;
    if (metadata.data_distformats) {
        metadata.data_distformats.forEach(function(distformat, key) {
            if (distformat.name) {
                data_distformats_error = 0;
                xml += '<gmd:distributionFormat><gmd:MD_Format>\n';
                xml += '<gmd:name><gco:CharacterString>' + distformat.name + '</gco:CharacterString></gmd:name>\n';
                xml += '<gmd:version><gco:CharacterString>' + distformat.version + '</gco:CharacterString></gmd:version>\n';
                xml += '<gmd:specification><gco:CharacterString>' + distformat.specification + '</gco:CharacterString></gmd:specification>\n';
                xml += '</gmd:MD_Format></gmd:distributionFormat>\n';
            }
        });
    }
    if (data_distformats_error) {
        errors.push('data_distformats');
    }

    xml += '<gmd:transferOptions><gmd:MD_DigitalTransferOptions>\n';

    // data_linkages (url)
    data_linkages_error = 1;
    if (metadata.data_linkages) {
        metadata.data_linkages.forEach(function(linkage, key) {
            if (linkage.name) {
                data_linkages_error = 0;
                xml += '<gmd:onLine><gmd:CI_OnlineResource>\n';
                xml += '<gmd:linkage><gmd:URL>' + linkage.url + '</gmd:URL></gmd:linkage>\n';
                xml += '<gmd:protocol><gco:CharacterString>' + linkage.protocol + '</gco:CharacterString></gmd:protocol>\n';
                xml += '<gmd:name><gco:CharacterString>' + linkage.name + '</gco:CharacterString></gmd:name>\n';
                xml += '<gmd:description><gco:CharacterString>' + linkage.description + '</gco:CharacterString></gmd:description>\n';
                xml += '</gmd:CI_OnlineResource></gmd:onLine>\n';
            }
        });
    }
    if (data_linkages_error) {
        errors.push('data_linkages');
    }

    xml += '</gmd:MD_DigitalTransferOptions></gmd:transferOptions>\n';

    xml += '</gmd:MD_Distribution></gmd:distributionInfo>\n';

    // DATA QUALITY INFO
    xml += '<gmd:dataQualityInfo><gmd:DQ_DataQuality>\n';

    // DQ_Level
    if (!metadata.data_dq_level) {
        metadata.data_dq_level = metadata.md_hierarchylevel;
        errors.push('data_dq_level'); // valeur par defaut  = hierarchylevel
    }
    //if (metadata.data_dq_level) {
    xml += '<gmd:scope><gmd:DQ_Scope>\n';
    xml += '<gmd:level><gmd:MD_ScopeCode codeListValue="' + metadata.data_dq_level + '" codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode">' + metadata.data_dq_level + '</gmd:MD_ScopeCode></gmd:level>\n';
    xml += '</gmd:DQ_Scope></gmd:scope>\n';
    //}

    // DQ_InspireConformity
    if (metadata.data_dq_inspireconformities) {
        var data_inspireconformities = xmlConformities(metadata.data_dq_inspireconformities, 'inspire', errors);
        xml += data_inspireconformities.xml;
        errors = data_inspireconformities.errors;
    }

    // DQ_Conformity
    if (metadata.data_dq_conformities) {
        var data_conformities = xmlConformities(metadata.data_dq_conformities, '', errors);
        xml += data_conformities.xml;
        errors = data_conformities.errors;
    }

    // DQ_Lineage
    xml += '<gmd:lineage><gmd:LI_Lineage>\n';

    // LI_Statement
    if (metadata.data_li_statement) {
        xml += '<gmd:statement><gco:CharacterString>' + metadata.data_li_statement + '</gco:CharacterString></gmd:statement>\n';
    } else {
        errors.push('data_li_statement');
    }

    // LI_ProcessStep
    if (metadata.data_li_processstep) {
        xml += '<gmd:processStep><gmd:LI_ProcessStep>\n';
        xml += '<gmd:description><gco:CharacterString>' + metadata.data_li_processstep + '</gco:CharacterString></gmd:description>\n';
        xml += '</gmd:LI_ProcessStep></gmd:processStep>\n';
    } else {
        errors.push('data_li_processstep');
    }

    // LI_Source
    if (metadata.data_li_source) {
        xml += '<gmd:source><gmd:LI_Source>\n';
        xml += '<gmd:description><gco:CharacterString>' + metadata.data_li_source + '</gco:CharacterString></gmd:description>\n';
        xml += '</gmd:LI_Source></gmd:source>\n';
    } else {
        errors.push('data_li_source');
    }

    xml += '</gmd:LI_Lineage></gmd:lineage>\n';
    xml += '</gmd:DQ_DataQuality></gmd:dataQualityInfo>\n';

    // Fin du fichier
    xml += '</gmd:MD_Metadata>\n';

    return {
        xml: xml,
        errors: errors
    };
}
*/
