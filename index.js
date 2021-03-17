const { MetadataTypes, DataTypes } = require('@ah/core').Values;
const { TypesFactory } = require('@ah/core').Types;
const { Validator, XMLUtils } = require('@ah/core').Utils;
const { XMLParser } = require('@ah/core').Languages;
const { FileReader, FileWriter } = require('@ah/core').FileSystem;
const XMLDefinitions = require('@ah/xml-definitions');
const XMLCompressor = require('@ah/xml-compresor');

const SUPPORTED_TYPES = [
    MetadataTypes.ACCOUNT_RELATIONSHIP_SHARE_RULE,
    MetadataTypes.ANIMATION_RULE,
    MetadataTypes.APPOINTMENT_SCHEDULING_POLICY,
    MetadataTypes.BATCH_CALC_JOB_DEFINITION,
    MetadataTypes.BATCH_PROCESS_JOB_DEFINITION,
    MetadataTypes.BLACKLISTED_CONSUMER,
    MetadataTypes.BOT,
    MetadataTypes.CARE_PROVIDER_SEARCH_CONFIG,
    MetadataTypes.CLEAN_DATA_SERVICE,
    MetadataTypes.COMMUNITY,
    MetadataTypes.CONNECTED_APP,
    MetadataTypes.CUSTOM_APPLICATION,
    MetadataTypes.CUSTOM_FEED_FILTER,
    MetadataTypes.CUSTOM_FIELD,
    MetadataTypes.CUSTOM_OBJECT,
    MetadataTypes.CUSTOM_OBJECT_TRANSLATIONS,
    MetadataTypes.CUSTOM_PAGE_WEB_LINK,
    MetadataTypes.CUSTOM_PERMISSION,
    MetadataTypes.CUSTOM_SITE,
    MetadataTypes.CUSTOM_TAB,
    MetadataTypes.DASHBOARD,
    MetadataTypes.DATA_SOURCE_OBJECT,
    MetadataTypes.DATA_STREAM_DEFINITION,
    MetadataTypes.DECISION_TABLE,
    MetadataTypes.DECISION_TABLE_DATASET_LINK,
    MetadataTypes.DELEGATE_GROUP,
    MetadataTypes.EMAIL_TEMPLATE,
    MetadataTypes.EMBEDDED_SERVICE_CONFIG,
    MetadataTypes.EMBEDDED_SERVICE_LIVE_AGENT,
    MetadataTypes.EMBEDDED_SERVICE_MENU_SETTINGS,
    MetadataTypes.ENTITLEMENT_PROCESS,
    MetadataTypes.FIELD_SET,
    MetadataTypes.FLEXI_PAGE,
    MetadataTypes.FLOW,
    MetadataTypes.FLOW_CATEGORY,
    MetadataTypes.HOME_PAGE_LAYOUT,
    MetadataTypes.INDEX,
    MetadataTypes.LAYOUT,
    MetadataTypes.LIGHTNING_BOLT,
    MetadataTypes.LISTVIEW,
    MetadataTypes.LIVE_CHAT_AGENT_CONFIG,
    MetadataTypes.LIVE_CHAT_BUTTON,
    MetadataTypes.LIVE_CHAT_DEPLOYMENT,
    MetadataTypes.MATCHING_RULES,
    MetadataTypes.ML_DATA_DEFINITION,
    MetadataTypes.ML_PREDICTION_DEFINITION,
    MetadataTypes.MODERATION_RULE,
    MetadataTypes.MUTING_PERMISSION_SET,
    MetadataTypes.MY_DOMAIN_DISCOVERABLE_LOGIN,
    MetadataTypes.NAMED_FILTER,
    MetadataTypes.NAVIGATION_MENU,
    MetadataTypes.NETWORK,
    MetadataTypes.NOTIFICATION_TYPE_CONFIG,
    MetadataTypes.OAUTH_CUSTOM_SCOPE,
    MetadataTypes.PACKAGE,
    MetadataTypes.PATH_ASSISTANT,
    MetadataTypes.PAYMENT_GATEWAY_PROVIDER,
    MetadataTypes.PERMISSION_SET,
    MetadataTypes.PERMISSION_SET_GROUP,
    MetadataTypes.PLATFORM_EVENT_CHANNEL,
    MetadataTypes.PORTAL,
    MetadataTypes.PRESENCE_USER_CONFIG,
    MetadataTypes.PROFILE,
    MetadataTypes.PROFILE_PASSWORD_POLICY,
    MetadataTypes.PROFILE_SEARCH_LAYOUTS,
    MetadataTypes.PROFILE_SESSION_SETTING,
    MetadataTypes.PROMPT,
    MetadataTypes.QUEUE,
    MetadataTypes.QUICK_ACTION,
    MetadataTypes.RECOMMENDATION_STRATEGY,
    MetadataTypes.RECORD_ACTION_DEPLOYMENT,
    MetadataTypes.RECORD_TYPE,
    MetadataTypes.REPORT,
    MetadataTypes.REPORT_TYPE,
    MetadataTypes.ROLE,
    MetadataTypes.SALES_WORK_QUEUE_SETTINGS,
    MetadataTypes.SAML_SSO_CONFIG,
    MetadataTypes.SEARCH_LAYOUTS,
    MetadataTypes.SERVICE_AI_SETUP_DEFINITION,
    MetadataTypes.SHARING_REASON,
    MetadataTypes.SHARING_RULES,
    MetadataTypes.SHARING_SET,
    MetadataTypes.SHARING_RULES,
    MetadataTypes.SKILL,
    MetadataTypes.TERRITORY,
    MetadataTypes.TIME_SHEET_TEMPLATE,
    MetadataTypes.TOPICS_FOR_OBJECT,
    MetadataTypes.TRANSACTION_SECURITY_POLICY,
    MetadataTypes.TRANSLATIONS,
    MetadataTypes.USER_PROVISIONING_CONFIG,
    MetadataTypes.VALIDATION_RULE,
    MetadataTypes.WAVE_APPLICATION,
    MetadataTypes.WAVE_LENS,
    MetadataTypes.WAVE_RECIPE,
    MetadataTypes.WAVE_XMD,
    MetadataTypes.WEBLINK,
    MetadataTypes.WORKFLOW,
];

const TYPES_XML_RELATION = {
    AssignmentRules: {
        singularName: MetadataTypes.ASSIGNMENT_RULE,
    },
    AutoResponseRules: {
        singularName: MetadataTypes.AUTORESPONSE_RULE,
    },
    EscalationRules: {
        singularName: MetadataTypes.ESCALATION_RULE,
    },
    MatchingRules: {
        singularName: MetadataTypes.MATCHING_RULE,
    },
    CustomLabels: {
        singularName: MetadataTypes.CUSTOM_LABEL,
    },
    SharingCriteriaRule: {
        parentName: MetadataTypes.SHARING_RULES,
    },
    SharingOwnerRule: {
        parentName: MetadataTypes.SHARING_RULES,
    },
    SharingGuestRule: {
        parentName: MetadataTypes.SHARING_RULES,
    },
    SharingTerritoryRule: {
        parentName: MetadataTypes.SHARING_RULES,
    },
    WorkflowAlert: {
        parentName: MetadataTypes.WORKFLOW,
    },
    WorkflowKnowledgePublish: {
        parentName: MetadataTypes.WORKFLOW,
    },
    WorkflowFieldUpdate: {
        parentName: MetadataTypes.WORKFLOW,
    },
    WorkflowRule: {
        parentName: MetadataTypes.WORKFLOW,
    },
    WorkflowTask: {
        parentName: MetadataTypes.WORKFLOW,
    },
    WorkflowOutboundMessage: {
        parentName: MetadataTypes.WORKFLOW,
    },
    CustomField: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    Index: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    BusinessProcess: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    CompactLayout: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    RecordType: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    WebLink: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    ValidationRule: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    SharingReason: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    ListView: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    },
    FieldSet: {
        parentName: MetadataTypes.CUSTOM_OBJECT,
    }
};

const STANDARD_PROFILES = [
    'Admin',
    'Chatter External User',
    'Chatter Free User',
    'Chatter Moderator User',
    'ContractManager',
    'CPQ Integration User',
    'MarketingProfile',
    'Partner App Subscription User',
    'Premier Support User',
    'ReadOnly',
    'SolutionManager',
    'Standard',
    'StandardAul'
];

class DependeciesManager {

    static getSupportedTypes() {
        return SUPPORTED_TYPES;
    }

    static repairDependencies(projectPath, metadataDetails, options, progressCallback) {
        if (!options)
            options = {
                typesToRepair: undefined,
                compress: false,
                sortOrder: undefined,
                checkOnly: false,
                ignoreFile: undefined,
            }
        callProgressCallback(progressCallback, 'prepare');
        if (options.ignoreFile)
            options.ignoredMetadata = createIgnoreMetadataMap(Validator.validateJSONFile(options.ignoreFile, 'Ignore'));
        metadataDetails = TypesFactory.createMetadataDetails(metadataDetails);
        const folderMetadataMap = TypesFactory.createFolderMetadataMap(metadataDetails);
        const metadataFromFileSystem = TypesFactory.createMetadataTypesFromFileSystem(folderMetadataMap, projectPath);
        return repair(metadataFromFileSystem, options, progressCallback);
    }
}
module.exports = DependeciesManager;

function repair(metadataFromFileSystem, options, progressCallback) {
    let errors = {};
    for (const metadataTypeName of Object.keys(metadataFromFileSystem)) {
        if (!SUPPORTED_TYPES.includes(metadataTypeName))
            continue;
        if (options.typesToRepair && !options.typesToRepair[metadataTypeName])
            continue;
        callProgressCallback(progressCallback, 'startType', metadataTypeName);
        const metadataType = metadataFromFileSystem[metadataTypeName];
        const xmlDefinition = XMLDefinitions.getRawDefinition(metadataTypeName);
        if (metadataType.haveChilds()) {
            for (const metadataObjectName of Object.keys(metadataType.getChilds())) {
                if (options.typesToRepair && !options.typesToRepair[metadataTypeName].includes(metadataObjectName) && !options.typesToRepair[metadataTypeName].includes('*'))
                    continue;
                callProgressCallback(progressCallback, 'startObject', metadataTypeName, metadataObjectName);
                const metadataObject = metadataType.getChild(metadataObjectName);
                if (metadataObject.haveChilds()) {
                    for (const metadataItemName of Object.keys(metadataObject.getChilds())) {
                        callProgressCallback(progressCallback, 'startItem', metadataTypeName, metadataObjectName, metadataItemName);
                        const metadataItem = metadataObject.getChild(metadataItemName);
                        const fileErrors = processXMLFile(xmlDefinition, metadataType, metadataObject, metadataItem, metadataFromFileSystem, options);
                        if (fileErrors) {
                            if (!errors[metadataTypeName])
                                errors[metadataTypeName] = {
                                    metadataType: metadataTypeName,
                                    errors: [],
                                }
                            errors[metadataTypeName].errors.push(fileErrors);
                        }
                        callProgressCallback(progressCallback, 'endItem', metadataTypeName, metadataObjectName, metadataItemName);
                    }
                } else {
                    const fileErrors = processXMLFile(xmlDefinition, metadataType, metadataObject, undefined, metadataFromFileSystem, options);
                    if (fileErrors) {
                        if (!errors[metadataTypeName])
                            errors[metadataTypeName] = {
                                metadataType: metadataTypeName,
                                errors: [],
                            }
                        errors[metadataTypeName].errors.push(fileErrors);
                    }
                }
                callProgressCallback(progressCallback, 'endObject', metadataTypeName, metadataObjectName);
            }
        }
        callProgressCallback(progressCallback, 'endType', metadataTypeName);
    }
    if (Object.keys(errors).length === 0)
        errors = undefined;
    if (options.checkOnly)
        return processErrors(errors, progressCallback);
    else
        return errors;
}

function callProgressCallback(progressCallback, stage, type, object, item, file) {
    if (progressCallback)
        progressCallback.call(this, {
            stage: stage,
            metadataType: type,
            metadataObject: object,
            metadataItem: item,
            file: file
        })
}

function processXMLFile(xmlDefinition, metadataType, metadataObject, metadataItem, metadataFromFileSystem, options) {
    let filePath;
    if (metadataItem)
        filePath = metadataItem.path;
    else
        filePath = metadataObject.path;
    if (!filePath)
        return;
    filePath = Validator.validateFilePath(filePath);
    let errors = [];
    let fileErrors;
    const xmlRoot = XMLParser.parseXML(FileReader.readFileSync(filePath), true);
    const xmlData = XMLUtils.cleanXMLFile(xmlDefinition, xmlRoot[metadataType.name]);
    for (const xmlKey of Object.keys(xmlDefinition)) {
        const fieldValue = xmlData[xmlKey];
        if (fieldValue != undefined) {
            if (!Array.isArray(fieldValue) && typeof fieldValue === 'object' && Object.keys(fieldValue).length === 0)
                continue;
            if (Array.isArray(fieldValue) && fieldValue.length === 0)
                continue;
            const fieldDefinition = xmlDefinition[xmlKey];
            const fieldErrors = processXMLField(fieldValue, fieldDefinition, metadataFromFileSystem, options);
            if (fieldErrors) {
                for (const error of fieldErrors)
                    errors.push(error);
                if (!options.checkOnly) {
                    if ((!isComplexField(fieldDefinition)) || (fieldDefinition.datatype === DataTypes.OBJECT && !haveComplexChild(fieldDefinition))) {
                        delete xmlData[xmlKey];
                    }
                }
            }
        }
    }
    if (errors.length > 0) {
        fileErrors = {
            file: filePath,
            errors: errors
        };
        if (!options.checkOnly) {
            xmlRoot[metadataType.name] = xmlData;
            if (options.compress)
                content = XMLCompressor.getCompressedContentSync(xmlRoot, options.sortOrder);
            else
                content = XMLParser.toXML(xmlRoot);
            FileWriter.createFileSync(filePath, content);
        }
    }
    return fileErrors;
}

function processXMLField(fieldValue, fieldDefinition, metadataFromFileSystem, options) {
    let errors = [];
    if (isComplexField(fieldDefinition)) {
        if (Array.isArray(fieldValue) || fieldDefinition.datatype === DataTypes.ARRAY) {
            fieldValue = XMLUtils.forceArray(fieldValue);
            const indexToRemove = [];
            let index = 0;
            for (let value of fieldValue) {
                if (fieldDefinition.fields && Object.keys(fieldDefinition.fields).length > 0) {
                    for (let key of Object.keys(fieldDefinition.fields)) {
                        const subFieldValue = value[key];
                        if (subFieldValue !== undefined && subFieldValue !== null) {
                            if (!Array.isArray(subFieldValue) && typeof subFieldValue === 'object' && Object.keys(subFieldValue).length === 0)
                                continue;
                            if (Array.isArray(subFieldValue) && subFieldValue.length === 0)
                                continue;
                            let subFieldDefinition = fieldDefinition.fields[key];
                            if (subFieldDefinition.definitionRef)
                                subFieldDefinition = XMLDefinitions.resolveDefinitionReference(subFieldDefinition);
                            const fieldErrors = processXMLField(subFieldValue, subFieldDefinition, metadataFromFileSystem, options);
                            if (fieldErrors) {
                                if (!indexToRemove.includes(index))
                                    indexToRemove.push(index);
                                for (const error of fieldErrors) {
                                    error.elementPath = fieldDefinition.key + '>' + error.elementPath;
                                    error.xmlElement = value;
                                    errors.push(error);
                                }
                            }
                        }
                    }
                } else {
                    const error = checkDependency(value, fieldDefinition, metadataFromFileSystem, options);
                    if (error) {
                        if (!indexToRemove.includes(index))
                            indexToRemove.push(index);
                        errors.push(error);
                    }
                }
                index++;
            }
            if (!options.checkOnly && indexToRemove.length > 0) {
                for (const index of indexToRemove) {
                    fieldValue.splice(index, 1);
                }
            }
        } else {
            for (let key of Object.keys(fieldDefinition.fields)) {
                const subFieldValue = fieldValue[key];
                if (subFieldValue !== undefined && subFieldValue !== null) {
                    if (!Array.isArray(subFieldValue) && typeof subFieldValue === 'object' && Object.keys(subFieldValue).length === 0)
                        continue;
                    if (Array.isArray(subFieldValue) && subFieldValue.length === 0)
                        continue;
                    let subFieldDefinition = fieldDefinition.fields[key];
                    if (subFieldDefinition.definitionRef)
                        subFieldDefinition = XMLDefinitions.resolveDefinitionReference(subFieldDefinition);
                    const fieldErrors = processXMLField(subFieldValue, subFieldDefinition, metadataFromFileSystem, options);
                    if (fieldErrors) {
                        for (const error of fieldErrors) {
                            error.elementPath = fieldDefinition.key + '>' + error.elementPath;
                            errors.push(error);
                        }
                        if (!options.checkOnly) {
                            if (fieldDefinition.datatype === DataTypes.OBJECT && !haveComplexChild(fieldDefinition)) {
                                delete fieldValue[key];
                            }
                        }
                    }
                }
            }
        }
    } else {
        const error = checkDependency(fieldValue, fieldDefinition, metadataFromFileSystem, options);
        if (error)
            errors.push(error);
    }
    if (errors.length === 0)
        errors = undefined;
    return errors;
}

function checkDependency(fieldValue, fieldDefinition, metadataFromFileSystem, options) {
    let error;
    let value = fieldValue
    if (fieldValue['#text']) {
        value = fieldValue['#text'];
    }
    if(fieldValue['@attrs'] && fieldValue['@attrs']['xsi:nil']){
        return error;
    }
    if (fieldDefinition.metadataType && mustProcessType(fieldDefinition.metadataType, value)) {
        let objectName = value;
        let itemName;
        if (fieldDefinition.separator) {
            if (value.indexOf(fieldDefinition.separator) !== -1) {
                objectName = value.substring(0, value.indexOf(fieldDefinition.separator));
                itemName = value.substring(value.indexOf(fieldDefinition.separator) + 1);
            }
        }
        let hasError = checkError(fieldDefinition, metadataFromFileSystem, objectName, itemName);
        if (hasError)
            hasError = checkSpecialErrors(fieldDefinition, metadataFromFileSystem, objectName, itemName);
        if (hasError && options.ignoredMetadata && options.ignoredMetadata[fieldDefinition.metadataType])
            hasError = checkOnIgnoreErrors(fieldDefinition, options.ignoredMetadata, objectName, itemName);
        if (hasError) {
            error = {
                elementPath: fieldDefinition.key,
                value: value,
                metadataType: fieldDefinition.metadataType,
                metadataObject: objectName,
                metadataItem: itemName
            }
        }
    }
    return error;
}

function checkError(fieldDefinition, metadataFromFileSystem, objectName, itemName) {
    if (objectName && itemName) {
        return !metadataFromFileSystem[fieldDefinition.metadataType] || !metadataFromFileSystem[fieldDefinition.metadataType].childs[objectName] || !metadataFromFileSystem[fieldDefinition.metadataType].childs[objectName].childs[itemName];
    } else {
        return !metadataFromFileSystem[fieldDefinition.metadataType] || !metadataFromFileSystem[fieldDefinition.metadataType].childs[objectName];
    }
}

function checkSpecialErrors(fieldDefinition, metadataFromFileSystem, objectName, itemName) {
    if (fieldDefinition.metadataType === MetadataTypes.CUSTOM_OBJECT)
        return !metadataFromFileSystem[MetadataTypes.CUSTOM_FIELD] || !metadataFromFileSystem[MetadataTypes.CUSTOM_FIELD].childs[objectName];
    if (fieldDefinition.metadataType === MetadataTypes.CUSTOM_FIELD) {
        if (objectName === 'Task')
            return !metadataFromFileSystem[fieldDefinition.metadataType] || !metadataFromFileSystem[fieldDefinition.metadataType].childs['Activity'] || !metadataFromFileSystem[fieldDefinition.metadataType].childs['Activity'].childs[itemName];
        if (objectName === 'Event')
            return !metadataFromFileSystem[fieldDefinition.metadataType] || !metadataFromFileSystem[fieldDefinition.metadataType].childs['Activity'] || !metadataFromFileSystem[fieldDefinition.metadataType].childs['Activity'].childs[itemName];
    }
    return true;
}

function checkOnIgnoreErrors(fieldDefinition, ignoredMetadata, objectName, itemName) {
    let hasError = false;
    const typeData = TYPES_XML_RELATION[fieldDefinition.metadataType];
    switch (fieldDefinition.metadataType) {
        case MetadataTypes.CUSTOM_LABELS:
        case MetadataTypes.MATCHING_RULES:
        case MetadataTypes.ASSIGNMENT_RULES:
        case MetadataTypes.AUTORESPONSE_RULES:
        case MetadataTypes.ESCALATION_RULES:
            hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, typeData.singularName, objectName, itemName);
            if (hasError)
                hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, objectName, itemName);
            break;
        case MetadataTypes.SHARING_CRITERIA_RULE:
        case MetadataTypes.SHARING_OWNER_RULE:
        case MetadataTypes.SHARING_GUEST_RULE:
        case MetadataTypes.SHARING_TERRITORY_RULE:
        case MetadataTypes.WORKFLOW_ALERT:
        case MetadataTypes.WORKFLOW_KNOWLEDGE_PUBLISH:
        case MetadataTypes.WORKFLOW_FIELD_UPDATE:
        case MetadataTypes.WORKFLOW_RULE:
        case MetadataTypes.WORKFLOW_TASK:
        case MetadataTypes.WORKFLOW_OUTBOUND_MESSAGE:
        case MetadataTypes.CUSTOM_FIELD:
        case MetadataTypes.INDEX:
        case MetadataTypes.BUSINESS_PROCESS:
        case MetadataTypes.COMPACT_LAYOUT:
        case MetadataTypes.RECORD_TYPE:
        case MetadataTypes.WEBLINK:
        case MetadataTypes.VALIDATION_RULE:
        case MetadataTypes.SHARING_REASON:
        case MetadataTypes.LISTVIEW:
        case MetadataTypes.FIELD_SET:
            hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, typeData.parentName, objectName, itemName);
            if (hasError)
                hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, objectName, itemName);
            if (hasError && (objectName === 'Task' || objectName === 'Event')) {
                hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, typeData.parentName, 'Activity', itemName);
                if (hasError)
                    hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, 'Activity', itemName);
            }
            break;
        case MetadataTypes.CUSTOM_OBJECT:
        case MetadataTypes.WORKFLOW:
        case MetadataTypes.SHARING_RULES:
            hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, objectName, itemName);
            if (hasError && (objectName === 'Task' || objectName === 'Event')) {
                hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, 'Activity', itemName);
            }
            break;
        default:
            hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, objectName, itemName);
            break;
    }
    return hasError;
}

function checkErrorOnIgnoreMetadata(ignoredMetadata, metadataType, objectName, itemName) {
    if (metadataType === MetadataTypes.CUSTOM_OBJECT && ignoredMetadata[metadataType]['*'] && ignoredMetadata[metadataType]['*'].includes('*')) {
        hasError = false;
    } else if (ignoredMetadata[metadataType]['*']) {
        hasError = false;
    } else if (ignoredMetadata[metadataType][objectName] && ignoredMetadata[metadataType][objectName].includes('*')) {
        hasError = false;
    } else if (objectName && itemName) {
        if (ignoredMetadata[metadataType][objectName] && ignoredMetadata[metadataType][objectName].includes('*'))
            hasError = false;
        else if (ignoredMetadata[metadataType][objectName] && ignoredMetadata[metadataType][objectName].includes(itemName))
            hasError = false;
        else
            hasError = true;
    } else if (ignoredMetadata[metadataType][objectName]) {
        hasError = false;
    } else {
        hasError = true;
    }
    return hasError;
}

function mustProcessType(metadataTypeName, fieldValue) {
    if (metadataTypeName === MetadataTypes.CUSTOM_TAB) {
        if (!fieldValue.startsWith('standard-')) {
            return true;
        }
        return false;
    } else if (metadataTypeName === MetadataTypes.CUSTOM_OBJECT) {
        if (fieldValue.endsWith('__c') || fieldValue.endsWith('__mdt')) {
            return true;
        }
        return false;
    } else if (metadataTypeName === MetadataTypes.CUSTOM_FIELD) {
        if (fieldValue.endsWith('__c')) {
            return true;
        }
        return false;
    } else if (metadataTypeName === MetadataTypes.RECORD_TYPE) {
        if (fieldValue !== 'master' && fieldValue !== 'Master') {
            return true;
        }
        return false;
    } else if (metadataTypeName === MetadataTypes.PROFILE) {
        if (!STANDARD_PROFILES.includes(fieldValue)) {
            return true;
        }
        return false;
    }
    return true;

}

function isComplexField(fieldDefinition) {
    return fieldDefinition.datatype === DataTypes.ARRAY || fieldDefinition.datatype === DataTypes.OBJECT;
}

function haveComplexChild(field) {
    if (field.fields) {
        for (let key of Object.keys(field.fields)) {
            if (isComplexField(field.fields[key]))
                return true;
        }
        return false;
    } else {
        return false;
    }
}

function createIgnoreMetadataMap(ignoredMetadata) {
    const ignoreMetadataMap = {};
    for (const metadataTypeName of Object.keys(ignoredMetadata)) {
        ignoreMetadataMap[metadataTypeName] = createIgnoreTypeMap(ignoredMetadata[metadataTypeName]);
    }
    return ignoreMetadataMap;
}

function createIgnoreTypeMap(objectsForIgnore) {
    let objectToIgnoreMap = {};
    for (let objectToIgnore of objectsForIgnore) {
        if (objectToIgnore.indexOf(':') !== -1) {
            let splits = objectToIgnore.split(':');
            if (splits.length === 2) {
                if (!objectToIgnoreMap[splits[0]])
                    objectToIgnoreMap[splits[0]] = [];
                objectToIgnoreMap[splits[0]].push(splits[1]);
            } else if (splits.length === 3 && splits[0].toLowerCase() === 'userpermission') {
                if (!objectToIgnoreMap[splits[1]])
                    objectToIgnoreMap[splits[1]] = [];
                objectToIgnoreMap[splits[1]].push({ permission: splits[2] });
            }
        } else {
            objectToIgnoreMap[objectToIgnore] = [objectToIgnore];
        }
    }
    return objectToIgnoreMap;
}

function processErrors(errors, callback) {
    if (errors === undefined)
        return undefined;
    callProgressCallback(callback, 'onErrors');
    const result = {};
    for (const metadataTypeName of Object.keys(errors)) {
        let errorsAdded = [];
        callProgressCallback(callback, 'startError', metadataTypeName);
        const typeErrors = errors[metadataTypeName];
        for (let typeError of typeErrors.errors) {
            let fileContent = FileReader.readFileSync(typeError.file);
            let lines = fileContent.split('\n');
            for (const fileError of typeError.errors) {
                const elementPaths = fileError.elementPath.split('>');
                const maxIndex = elementPaths.length;
                let indexElement = 0;
                let nLine = 1;
                for (const line of lines) {
                    let startTag = XMLParser.startTag(line, elementPaths[indexElement]);
                    while (startTag) {
                        indexElement++;
                        startTag = XMLParser.startTag(line, elementPaths[indexElement]);
                    }
                    if (indexElement === maxIndex) {
                        if (line.indexOf(fileError.value) !== -1) {
                            const startColumn = line.indexOf(fileError.value) + (countTabs(line) * 4);
                            const endColumn = startColumn + fileError.value.length;
                            const errorKey = fileError.elementPath + fileError.value + fileError.metadataObject + nLine + startColumn + endColumn;
                            if (!errorsAdded.includes(errorKey)) {
                                callProgressCallback(callback, 'fileError', metadataTypeName, fileError.metadataObject, fileError.metadataItem, typeError.file);
                                if (!result[metadataTypeName])
                                    result[metadataTypeName] = [];
                                result[metadataTypeName].push({
                                    object: fileError.metadataObject,
                                    item: fileError.metadataItem,
                                    line: nLine,
                                    startColumn: startColumn,
                                    endColumn: endColumn,
                                    message: fileError.metadataType + ' named ' + fileError.value + ' does not exists',
                                    severity: 'Warning',
                                    file: typeError.file
                                });
                                errorsAdded.push(errorKey);
                            }
                        }
                    }
                    let endTag = XMLParser.endTag(line, elementPaths[indexElement - 1]);
                    while (endTag || indexElement > 0) {
                        indexElement--;
                        endTag = XMLParser.endTag(line, elementPaths[indexElement - 1]);
                    }
                    nLine++;
                }
            }
        }
        callProgressCallback(callback, 'endError', metadataTypeName);
    }
    return result;
}

function countTabs(line) {
    let tabCounter = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== '\t') {
            break;
        }
        tabCounter++;
    }
    return tabCounter;
}