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
