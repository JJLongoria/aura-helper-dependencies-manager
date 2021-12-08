import EventEmitter from "events";
import { MetadataFactory } from '@aurahelper/metadata-factory';
import { XMLCompressor } from '@aurahelper/xml-compressor';
import { XML } from '@aurahelper/languages';
import { MetadataTypes, CoreUtils, FileWriter, FileReader, MetadataDetail, MetadataType, Datatypes, DependenciesRepairResponse, DependenciesCheckResponse, ProgressStatus, MetadataObject, MetadataItem, DependenciesXMLFileError, DependencyError } from "@aurahelper/core";
import { XMLDefinitions } from "@aurahelper/xml-definitions";
const XMLUtils = XML.XMLUtils;
const Utils = CoreUtils.Utils;
const Validator = CoreUtils.Validator;

const SORT_ORDER = XMLCompressor.getSortOrderValues();

const SUPPORTED_TYPES: string[] = [
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

const TYPES_XML_RELATION: { [key: string]: any } = {
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

const STANDARD_PROFILES: string[] = [
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

const EVENT: { [key: string]: string } = {
    PREPARE: 'preapre',
    PROCESS: 'process',
    COMPRESS_FILE: 'compressFile',
    START_TYPE: 'startType',
    START_OBJECT: 'startObject',
    START_ITEM: 'startItem',
    END_TYPE: 'endType',
    END_OBJECT: 'endObject',
    END_ITEM: 'endItem',
    START_ERROR: 'startError',
    END_ERROR: 'endError',
    FILE_ERROR: 'fileError',
};

/**
 * Class to check dependencies errors on files or repair it automatically. This class analize all metadata types and files to check if any file or type does not exists
 * on the local project to repair it from the files where exists.
 * 
 * All Dependecies Manager methods return a Promise with the associated data to the processes.  
 */
export class DependenciesManager {

    projectFolder: string;
    metadataDetails?: MetadataDetail[];
    typesToRepair?: string | { [key: string]: MetadataType };
    compress: boolean;
    sortOrder: string;
    ignoreFile?: string;
    _ignoredMetadata?: { [key: string]: any };
    _checkOnly: boolean;
    _event: EventEmitter;
    _typesToRepair: { [key: string]: MetadataType };

    /**
     * Constructor to create a new DependenciesManager instance. All parameters are optional and you can use the setters methods to set the values when you want.
     * @param {string} [projectFolder] Path to the project root folder 
     * @param {MetadataDetail[]} [metadataDetails] List of metadata details 
     */
    constructor(projectFolder?: string, metadataDetails?: MetadataDetail[]) {
        this.projectFolder = projectFolder || './';
        this.metadataDetails = metadataDetails;
        this.typesToRepair = undefined;
        this.compress = false;
        this.sortOrder = SORT_ORDER.ALPHABET_ASC;
        this.ignoreFile = undefined;

        this._ignoredMetadata = undefined;
        this._checkOnly = false;
        this._event = new EventEmitter();
        this._typesToRepair = {};
    }

    /**
     * Method to handle the event when preparing execution of repair or check dependencies
     * @param {Function} callback Callback function to call when manager is on prepare
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onPrepare(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.PREPARE, callback);
        return this;
    }

    /**
     * Method to handle the event before start process Metadata Type
     * @param {Function} callback Callback function to handle progress before start process Metadata Type
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onStartType(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.START_TYPE, callback);
        return this;
    }

    /**
     * Method to handle the event before start process Metadata Object
     * @param {Function} callback Callback function to handle progress before start process Metadata Object
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onStartObject(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.START_OBJECT, callback);
        return this;
    }

    /**
     * Method to handle the event before start process Metadata Item
     * @param {Function} callback Callback function to handle progress before start process Metadata Item
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onStartItem(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.START_ITEM, callback);
        return this;
    }

    /**
     * Method to handle the event before after process Metadata Type
     * @param {Function} callback Callback function to handle progress after process Metadata Type
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onEndType(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.END_TYPE, callback);
        return this;
    }

    /**
     * Method to handle the event before after process Metadata Object
     * @param {Function} callback Callback function to handle progress after process Metadata Object
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onEndObject(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.END_OBJECT, callback);
        return this;
    }

    /**
     * Method to handle the event before after process Metadata Item
     * @param {Function} callback Callback function to handle progress after process Metadata Item
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onEndItem(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.END_ITEM, callback);
        return this;
    }

    /**
     * Method to handle the event before start processing results on some processes
     * @param {Function} callback Callback function to handle progress when manager is processing results
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onProcess(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.PROCESS, callback);
        return this;
    }

    /**
     * Method to handle the event before start process errors on metadata type
     * @param {Function} callback Callback function to handle progress before start process errors
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onStartErrors(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.START_ERROR, callback);
        return this;
    }

    /**
     * Method to handle the event after process errors on metadata type
     * @param {Function} callback Callback function to handle progress after process errors
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onEndErrors(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.END_ERROR, callback);
        return this;
    }

    /**
     * Method to handle the event before start processing the errors encuntered on file
     * @param {Function} callback Callback function to handle progress before start processing the errors encuntered on file
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onFileError(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.FILE_ERROR, callback);
        return this;
    }

    /**
     * Method to handle the event before start compress XML affected files 
     * @param {Function} callback Callback function to handle progress when start compress
     * 
     * @returns {DependenciesManager} Returns the DependenciesManager object
     */
    onCompressFile(callback: (status: ProgressStatus) => void): DependenciesManager {
        this._event.on(EVENT.COMPRESS_FILE, callback);
        return this;
    }

    /**
     * Method to set the project folder path
     * @param {string} projectFolder Path to the project root folder
     * 
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    setProjectFolder(projectFolder: string): DependenciesManager {
        this.projectFolder = projectFolder;
        return this;
    }

    /**
     * Method to set the metadata details to repair dependencies
     * @param {MetadataDetail[]} metadataDetails List of metadata details to repair dependencies
     * 
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    setMetadataDetails(metadataDetails: MetadataDetail[]): DependenciesManager {
        this.metadataDetails = metadataDetails;
        return this;
    }

    /**
     * Method to set the ignore file to ignore the metadata types on repair
     * @param {string} ignorefile Path to the ignore file
     * 
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    setIgnoreFile(ignoreFile?: string): DependenciesManager {
        this.ignoreFile = ignoreFile;
        return this;
    }

    /**
     * Method to set the Metadata JSON Object or Metadata JSON file path to process
     * @param {string | { [key:string]: MetadataType }} typesToRepair JSON Metadata Object or JSON Metadata File path with the objects to repair (if you don't want to repair all Metadata Types)
     * 
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    setTypesToRepair(typesToRepair: string | { [key: string]: MetadataType }): DependenciesManager {
        this.typesToRepair = typesToRepair;
        return this;
    }

    /**
     * Method to set if compress the affected XML Files when repair project metadata
     * @param {boolean} compress True to compress the XML Files, false in otherwise. If undefined or not pass parameter, also set to true.
     * 
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    setCompress(compress: boolean): DependenciesManager {
        this.compress = (compress !== undefined && Utils.isBoolean(compress)) ? compress : true;
        return this;
    }

    /**
     * Method to set the sort order for the XML Elements when compress the files
     * @param {string} sortOrder Sort order to order the XML elements. Values: simpleFirst, complexFirst, alphabetAsc or alphabetDesc. (alphabetDesc by default)
     * 
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    setSortOrder(sortOrder: string): DependenciesManager {
        this.sortOrder = sortOrder;
        return this;
    }

    /**
     * Method to set Simple XML Elements first as sort order (simpleFirst)
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    sortSimpleFirst(): DependenciesManager {
        this.sortOrder = SORT_ORDER.SIMPLE_FIRST;
        return this;
    }

    /**
     * Method to set Complex XML Elements first as sort order (complexFirst)
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    sortComplexFirst(): DependenciesManager {
        this.sortOrder = SORT_ORDER.COMPLEX_FIRST;
        return this;
    }

    /**
     * Method to set Alphabet Asc as sort order (alphabetAsc)
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    sortAlphabetAsc(): DependenciesManager {
        this.sortOrder = SORT_ORDER.ALPHABET_ASC;
        return this;
    }

    /**
     * Method to set Alphabet Desc as sort order (alphabetDesc)
     * @returns {DependenciesManager} Return the DependenciesManager object instance
     */
    sortAlphabetDesc(): DependenciesManager {
        this.sortOrder = SORT_ORDER.ALPHABET_DESC;
        return this;
    }

    /**
     * Method to get a list with all supported types to repair or check dependencies
     * 
     * @returns {string[]} Return a list with the supported Metadata Type API Names 
     */
    static getSupportedTypes(): string[] {
        return SUPPORTED_TYPES;
    }

    /**
     * Method to repair any Salesforce project dependencies to fix possible deploy errors.
     * 
     * @returns {{ [key:string]: DependenciesRepairResponse } | undefined} Return an object with the repaired errors data
     * 
     * @throws {WrongDirectoryPathException} If the project path is not a String or can't convert to absolute path
     * @throws {DirectoryNotFoundException} If the project path not exists or not have access to it
     * @throws {InvalidDirectoryPathException} If the project path is not a directory
     * @throws {WrongFilePathException} If the ignore file or types file is not a String or can't convert to absolute path
     * @throws {FileNotFoundException} If the ignore file or types file not exists or not have access to it
     * @throws {InvalidFilePathException} If the ignore file or types file is not a file
     * @throws {WrongFormatException} If types is not a Metadata JSON file or Metadata JSON Object or ignore file is not a JSON file
     */
    repairDependencies(): { [key: string]: DependenciesRepairResponse } | undefined {
        this._checkOnly = false;
        callEvent(this, EVENT.PREPARE);
        this.projectFolder = Validator.validateFolderPath(this.projectFolder);
        if (this.ignoreFile) {
            this._ignoredMetadata = createIgnoreMetadataMap(Validator.validateJSONFile(this.ignoreFile, 'Ignore'));
        }
        if (this.typesToRepair) {
            this._typesToRepair = Validator.validateMetadataJSON(this.typesToRepair);
            this._typesToRepair = MetadataFactory.deserializeMetadataTypes(this._typesToRepair);
        }
        this.metadataDetails = MetadataFactory.createMetadataDetails(this.metadataDetails);
        const folderMetadataMap = MetadataFactory.createFolderMetadataMap(this.metadataDetails);
        const metadataFromFileSystem = MetadataFactory.createMetadataTypesFromFileSystem(folderMetadataMap, this.projectFolder);
        const result = repair(metadataFromFileSystem, this);
        if(result){

        }
        return undefined;
    }

    /**
     * Method to check errors on any Salesforce project dependencies to fix possible deploy errors.
     * @returns {{ [key: string]: DependenciesCheckResponse[] } | undefined} Return an object with the errors data
     * 
     * @throws {WrongDirectoryPathException} If the project path is not a String or can't convert to absolute path
     * @throws {DirectoryNotFoundException} If the project path not exists or not have access to it
     * @throws {InvalidDirectoryPathException} If the project path is not a directory
     * @throws {WrongFilePathException} If the ignore file or types file is not a String or can't convert to absolute path
     * @throws {FileNotFoundException} If the ignore file or types file not exists or not have access to it
     * @throws {InvalidFilePathException} If the ignore file or types file is not a file
     * @throws {WrongFormatException} If types is not a Metadata JSON file or Metadata JSON Object or ignore file is not a JSON file
     */
    checkErrors(): { [key: string]: DependenciesCheckResponse[] } | undefined {
        this._checkOnly = true;
        callEvent(this, EVENT.PREPARE);
        this.projectFolder = Validator.validateFolderPath(this.projectFolder);
        if (this.ignoreFile) {
            this._ignoredMetadata = createIgnoreMetadataMap(Validator.validateJSONFile(this.ignoreFile, 'Ignore'));
        }
        if (this.typesToRepair) {
            this._typesToRepair = Validator.validateMetadataJSON(this.typesToRepair);
            this._typesToRepair = MetadataFactory.deserializeMetadataTypes(this._typesToRepair);
        }
        this.metadataDetails = MetadataFactory.createMetadataDetails(this.metadataDetails);
        const folderMetadataMap = MetadataFactory.createFolderMetadataMap(this.metadataDetails);
        const metadataFromFileSystem = MetadataFactory.createMetadataTypesFromFileSystem(folderMetadataMap, this.projectFolder);
        const result = repair(metadataFromFileSystem, this);
        if(result !== undefined){
            return processErrors(result, this);
        }
        return undefined;
    }
}

function repair(metadataFromFileSystem: { [key: string]: MetadataType }, manager: DependenciesManager): { [key: string]: DependenciesRepairResponse } | undefined {
    let errors: { [key: string]: DependenciesRepairResponse } | undefined = {};
    for (const metadataTypeName of Object.keys(metadataFromFileSystem)) {
        if (!SUPPORTED_TYPES.includes(metadataTypeName) || !metadataFromFileSystem[metadataTypeName]) {
            continue;
        }
        const haveTypesToRepair = Utils.hasKeys(manager._typesToRepair);
        const typeToRepair = (haveTypesToRepair) ? manager._typesToRepair[metadataTypeName] : undefined;
        if (haveTypesToRepair && !typeToRepair) {
            continue;
        }
        callEvent(manager, EVENT.START_TYPE, metadataTypeName);
        const metadataType = metadataFromFileSystem[metadataTypeName];
        const xmlDefinition = XMLDefinitions.getRawDefinition(metadataTypeName);
        if (metadataType.hasChilds()) {
            for (const metadataObjectName of Object.keys(metadataType.getChilds())) {
                const objectToRepair = (!typeToRepair || !typeToRepair.hasChilds()) ? undefined : typeToRepair.childs[metadataObjectName];
                if (!haveTypesToRepair || (typeToRepair && typeToRepair.checked) || (objectToRepair && objectToRepair.checked)) {
                    callEvent(manager, EVENT.START_OBJECT, metadataTypeName, metadataObjectName);
                    const metadataObject = metadataType.getChild(metadataObjectName);
                    if (!metadataObject) {
                        continue;
                    }
                    if (metadataObject.hasChilds()) {
                        for (const metadataItemName of Object.keys(metadataObject.getChilds())) {
                            const itemToRepair = (!objectToRepair || !objectToRepair.hasChilds()) ? undefined : objectToRepair.childs[metadataItemName];
                            if (!haveTypesToRepair || (typeToRepair && typeToRepair.checked) || (objectToRepair && objectToRepair.checked) || (itemToRepair && itemToRepair.checked)) {
                                callEvent(manager, EVENT.START_ITEM, metadataTypeName, metadataObjectName, metadataItemName);
                                const metadataItem = metadataObject.getChild(metadataItemName);
                                const fileErrors = processXMLFile(xmlDefinition, metadataFromFileSystem, manager, metadataType, metadataObject, metadataItem);
                                if (fileErrors) {
                                    if (!errors[metadataTypeName]) {
                                        errors[metadataTypeName] = {
                                            metadataType: metadataTypeName,
                                            errors: [],
                                        };
                                    }
                                    errors[metadataTypeName].errors.push(fileErrors);
                                }
                                callEvent(manager, EVENT.END_ITEM, metadataTypeName, metadataObjectName, metadataItemName);
                            }
                        }
                    } else {
                        const fileErrors = processXMLFile(xmlDefinition, metadataFromFileSystem, manager, metadataType, metadataObject);
                        if (fileErrors) {
                            if (!errors[metadataTypeName]) {
                                errors[metadataTypeName] = {
                                    metadataType: metadataTypeName,
                                    errors: [],
                                };
                            }
                            errors[metadataTypeName].errors.push(fileErrors);
                        }
                    }
                    callEvent(manager, EVENT.END_OBJECT, metadataTypeName, metadataObjectName);
                }
            }
        }
        callEvent(manager, EVENT.END_TYPE, metadataTypeName);
    }
    if (!Utils.hasKeys(errors)) {
        errors = undefined;
    }
    return errors;
}

function callEvent(manager: DependenciesManager, stage: string, type?: string, object?: string, item?: string, file?: string) {
    manager._event.emit(stage, new ProgressStatus(undefined, undefined, type, object, item, file));
}

function processXMLFile(xmlDefinition: any, metadataFromFileSystem: { [key: string]: MetadataType }, manager: DependenciesManager, metadataType: MetadataType, metadataObject: MetadataObject, metadataItem?: MetadataItem): DependenciesXMLFileError | undefined {
    try {
        let filePath;
        if (metadataItem) {
            filePath = metadataItem.path;
        } else if (metadataObject) {
            filePath = metadataObject.path;
        }
        if (!filePath) {
            return;
        }
        filePath = Validator.validateFilePath(filePath);
        let errors: DependencyError[] = [];
        let fileErrors: DependenciesXMLFileError | undefined;
        const xmlRoot = XML.XMLParser.parseXML(FileReader.readFileSync(filePath), true);
        const xmlData = XMLUtils.cleanXMLFile(xmlDefinition, xmlRoot[metadataType.name]);
        for (const xmlKey of Object.keys(xmlDefinition)) {
            const fieldValue = xmlData[xmlKey];
            if (fieldValue !== undefined) {
                if (!Array.isArray(fieldValue) && typeof fieldValue === 'object' && Object.keys(fieldValue).length === 0) {
                    continue;
                }
                if (Array.isArray(fieldValue) && fieldValue.length === 0) {
                    continue;
                }
                const fieldDefinition = xmlDefinition[xmlKey];
                const fieldErrors = processXMLField(xmlDefinition, fieldValue, fieldDefinition, metadataFromFileSystem, manager);
                if (fieldErrors) {
                    for (const error of fieldErrors) {
                        errors.push(error);
                    }
                    if (!manager._checkOnly) {
                        if ((!isComplexField(fieldDefinition)) || (fieldDefinition.datatype === Datatypes.OBJECT && !haveComplexChild(fieldDefinition))) {
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
            if (!manager._checkOnly) {
                xmlRoot[metadataType.name] = xmlData;
                let content;
                if (manager.compress) {
                    callEvent(manager, EVENT.COMPRESS_FILE, metadataType.name, metadataObject.name, (metadataItem) ? metadataItem.name : undefined, filePath);
                    content = new XMLCompressor().setXMLRoot(xmlRoot).setSortOrder(manager.sortOrder).getCompressedContentSync();
                }
                else {
                    content = XML.XMLParser.toXML(xmlRoot);
                }
                FileWriter.createFileSync(filePath, content);
            }
        }
        return fileErrors;
    } catch (error) {
        throw error;
    }
}

function processXMLField(xmlDefinition: any, fieldValue: any, fieldDefinition: any, metadataFromFileSystem: { [key: string]: MetadataType }, manager: DependenciesManager): DependencyError[] | undefined {
    let errors: DependencyError[] | undefined = [];
    if (isComplexField(fieldDefinition)) {
        if (Array.isArray(fieldValue) || fieldDefinition.datatype === Datatypes.ARRAY) {
            fieldValue = XMLUtils.forceArray(fieldValue);
            const indexToRemove: number[] = [];
            let index = 0;
            for (let value of fieldValue) {
                if (fieldDefinition.fields && Object.keys(fieldDefinition.fields).length > 0) {
                    for (let key of Object.keys(fieldDefinition.fields)) {
                        const subFieldValue = value[key];
                        if (subFieldValue !== undefined && subFieldValue !== null) {
                            if (!Array.isArray(subFieldValue) && typeof subFieldValue === 'object' && Object.keys(subFieldValue).length === 0) {
                                continue;
                            }
                            if (Array.isArray(subFieldValue) && subFieldValue.length === 0) {
                                continue;
                            }
                            let subFieldDefinition = fieldDefinition.fields[key];
                            if (subFieldDefinition.definitionRef) {
                                subFieldDefinition = XMLDefinitions.resolveDefinitionReference(xmlDefinition, subFieldDefinition);
                            }
                            const fieldErrors = processXMLField(xmlDefinition, subFieldValue, subFieldDefinition, metadataFromFileSystem, manager);
                            if (fieldErrors) {
                                if (!indexToRemove.includes(index)) {
                                    indexToRemove.push(index);
                                }
                                for (const error of fieldErrors) {
                                    error.elementPath = fieldDefinition.key + '>' + error.elementPath;
                                    error.xmlElement = value;
                                    errors.push(error);
                                }
                            }
                        }
                    }
                } else {
                    const error = checkDependency(value, fieldDefinition, metadataFromFileSystem, manager);
                    if (error) {
                        if (!indexToRemove.includes(index)) {
                            indexToRemove.push(index);
                        }
                        errors.push(error);
                    }
                }
                index++;
            }
            if (!manager._checkOnly && indexToRemove.length > 0) {
                for (const index of indexToRemove) {
                    fieldValue.splice(index, 1);
                }
            }
        } else {
            for (let key of Object.keys(fieldDefinition.fields)) {
                const subFieldValue = fieldValue[key];
                if (subFieldValue !== undefined && subFieldValue !== null) {
                    if (!Array.isArray(subFieldValue) && typeof subFieldValue === 'object' && Object.keys(subFieldValue).length === 0) {
                        continue;
                    }
                    if (Array.isArray(subFieldValue) && subFieldValue.length === 0) {
                        continue;
                    }
                    let subFieldDefinition = fieldDefinition.fields[key];
                    if (subFieldDefinition.definitionRef) {
                        subFieldDefinition = XMLDefinitions.resolveDefinitionReference(xmlDefinition, subFieldDefinition);
                    }
                    const fieldErrors = processXMLField(xmlDefinition, subFieldValue, subFieldDefinition, metadataFromFileSystem, manager);
                    if (fieldErrors) {
                        for (const error of fieldErrors) {
                            error.elementPath = fieldDefinition.key + '>' + error.elementPath;
                            errors.push(error);
                        }
                        if (!manager._checkOnly) {
                            if (fieldDefinition.datatype === Datatypes.OBJECT && !haveComplexChild(fieldDefinition)) {
                                delete fieldValue[key];
                            }
                        }
                    }
                }
            }
        }
    } else {
        const error = checkDependency(fieldValue, fieldDefinition, metadataFromFileSystem, manager);
        if (error) {
            errors.push(error);
        }
    }
    if (errors.length === 0) {
        errors = undefined;
    }
    return errors;
}

function checkDependency(fieldValue: any, fieldDefinition: any, metadataFromFileSystem: { [key: string]: MetadataType }, manager: DependenciesManager): DependencyError | undefined {
    let error: DependencyError | undefined;
    let value = fieldValue;
    if (fieldValue['#text']) {
        value = fieldValue['#text'];
    }
    if (fieldValue['@attrs'] && fieldValue['@attrs']['xsi:nil']) {
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
        if (hasError) {
            hasError = checkSpecialErrors(fieldDefinition, metadataFromFileSystem, objectName, itemName);
        }
        if (hasError && manager._ignoredMetadata && manager._ignoredMetadata[fieldDefinition.metadataType]) {
            hasError = checkOnIgnoreErrors(fieldDefinition, manager._ignoredMetadata, objectName, itemName);
        }
        if (hasError) {
            error = {
                elementPath: fieldDefinition.key,
                value: value,
                metadataType: fieldDefinition.metadataType,
                metadataObject: objectName,
                metadataItem: itemName
            };
        }
    }
    return error;
}

function checkError(fieldDefinition: any, metadataFromFileSystem: { [key: string]: MetadataType }, objectName: string, itemName: string): boolean {
    if (objectName && itemName) {
        return !metadataFromFileSystem[fieldDefinition.metadataType] || !metadataFromFileSystem[fieldDefinition.metadataType].childs[objectName] || !metadataFromFileSystem[fieldDefinition.metadataType].childs[objectName].childs[itemName];
    } else {
        return !metadataFromFileSystem[fieldDefinition.metadataType] || !metadataFromFileSystem[fieldDefinition.metadataType].childs[objectName];
    }
}

function checkSpecialErrors(fieldDefinition: any, metadataFromFileSystem: { [key: string]: MetadataType }, objectName: string, itemName: string): boolean {
    if (fieldDefinition.metadataType === MetadataTypes.CUSTOM_OBJECT) {
        return !metadataFromFileSystem[MetadataTypes.CUSTOM_FIELD] || !metadataFromFileSystem[MetadataTypes.CUSTOM_FIELD].childs[objectName];
    }
    if (fieldDefinition.metadataType === MetadataTypes.CUSTOM_FIELD) {
        if (objectName === 'Task') {
            return !metadataFromFileSystem[fieldDefinition.metadataType] || !metadataFromFileSystem[fieldDefinition.metadataType].childs['Activity'] || !metadataFromFileSystem[fieldDefinition.metadataType].childs['Activity'].childs[itemName];
        }
        if (objectName === 'Event') {
            return !metadataFromFileSystem[fieldDefinition.metadataType] || !metadataFromFileSystem[fieldDefinition.metadataType].childs['Activity'] || !metadataFromFileSystem[fieldDefinition.metadataType].childs['Activity'].childs[itemName];
        }
    }
    return true;
}

function checkOnIgnoreErrors(fieldDefinition: any, ignoredMetadata: { [key: string]: any }, objectName: string, itemName: string): boolean {
    let hasError = false;
    const typeData = TYPES_XML_RELATION[fieldDefinition.metadataType];
    switch (fieldDefinition.metadataType) {
        case MetadataTypes.CUSTOM_LABELS:
        case MetadataTypes.MATCHING_RULES:
        case MetadataTypes.ASSIGNMENT_RULES:
        case MetadataTypes.AUTORESPONSE_RULES:
        case MetadataTypes.ESCALATION_RULES:
            hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, typeData.singularName, objectName, itemName);
            if (hasError) {
                hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, objectName, itemName);
            }
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
            if (hasError) {
                hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, objectName, itemName);
            }
            if (hasError && (objectName === 'Task' || objectName === 'Event')) {
                hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, typeData.parentName, 'Activity', itemName);
                if (hasError) {
                    hasError = checkErrorOnIgnoreMetadata(ignoredMetadata, fieldDefinition.metadataType, 'Activity', itemName);
                }
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

function checkErrorOnIgnoreMetadata(ignoredMetadata: { [key: string]: any }, metadataType: string, objectName: string, itemName: string) {
    let hasError = false;
    if (metadataType === MetadataTypes.CUSTOM_OBJECT && ignoredMetadata[metadataType]['*'] && ignoredMetadata[metadataType]['*'].includes('*')) {
        hasError = false;
    } else if (ignoredMetadata[metadataType]['*']) {
        hasError = false;
    } else if (ignoredMetadata[metadataType][objectName] && ignoredMetadata[metadataType][objectName].includes('*')) {
        hasError = false;
    } else if (objectName && itemName) {
        if (ignoredMetadata[metadataType][objectName] && ignoredMetadata[metadataType][objectName].includes('*')) {
            hasError = false;
        } else if (ignoredMetadata[metadataType][objectName] && ignoredMetadata[metadataType][objectName].includes(itemName)) {
            hasError = false;
        } else {
            hasError = true;
        }
    } else if (ignoredMetadata[metadataType][objectName]) {
        hasError = false;
    } else {
        hasError = true;
    }
    return hasError;
}

function mustProcessType(metadataTypeName: string, fieldValue: string): boolean {
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

function isComplexField(fieldDefinition: any): boolean {
    return fieldDefinition.datatype === Datatypes.ARRAY || fieldDefinition.datatype === Datatypes.OBJECT;
}

function haveComplexChild(field: any): boolean {
    if (field.fields) {
        for (let key of Object.keys(field.fields)) {
            if (isComplexField(field.fields[key])) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}

function createIgnoreMetadataMap(ignoredMetadata: { [key: string]: string[] }): { [key: string]: any } {
    const ignoreMetadataMap: { [key: string]: any } = {};
    for (const metadataTypeName of Object.keys(ignoredMetadata)) {
        ignoreMetadataMap[metadataTypeName] = createIgnoreTypeMap(ignoredMetadata[metadataTypeName]);
    }
    return ignoreMetadataMap;
}

function createIgnoreTypeMap(objectsForIgnore: string[]): { [key: string]: any } {
    let objectToIgnoreMap: { [key: string]: any } = {};
    for (let objectToIgnore of objectsForIgnore) {
        if (objectToIgnore.indexOf(':') !== -1) {
            let splits = objectToIgnore.split(':');
            if (splits.length === 2) {
                if (!objectToIgnoreMap[splits[0]]) {
                    objectToIgnoreMap[splits[0]] = [];
                }
                objectToIgnoreMap[splits[0]].push(splits[1]);
            } else if (splits.length === 3 && splits[0].toLowerCase() === 'userpermission') {
                if (!objectToIgnoreMap['userpermission']) {
                    objectToIgnoreMap['userpermission'] = {};
                }
                if (!objectToIgnoreMap['userpermission'][splits[1]]) {
                    objectToIgnoreMap['userpermission'][splits[1]] = [];
                }
                objectToIgnoreMap['userpermission'][splits[1]].push(splits[2]);
            }
        } else {
            objectToIgnoreMap[objectToIgnore] = [objectToIgnore];
        }
    }
    return objectToIgnoreMap;
}

function processErrors(errors: { [key: string]: DependenciesRepairResponse }, manager: DependenciesManager): { [key: string]: DependenciesCheckResponse[] } | undefined {
    if (errors === undefined) {
        return undefined;
    }
    callEvent(manager, EVENT.PROCESS);
    const result: { [key: string]: DependenciesCheckResponse[] } = {};
    for (const metadataTypeName of Object.keys(errors)) {
        let errorsAdded: string[] = [];
        callEvent(manager, EVENT.START_ERROR, metadataTypeName);
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
                    let startTag = XML.XMLParser.startTag(line, elementPaths[indexElement]);
                    while (startTag) {
                        indexElement++;
                        startTag = XML.XMLParser.startTag(line, elementPaths[indexElement]);
                    }
                    if (indexElement === maxIndex) {
                        if (line.indexOf(fileError.value) !== -1) {
                            const startColumn = line.indexOf(fileError.value) + (countTabs(line) * 4);
                            const endColumn = startColumn + fileError.value.length;
                            const errorKey = fileError.elementPath + fileError.value + fileError.metadataObject + nLine + startColumn + endColumn;
                            if (!errorsAdded.includes(errorKey)) {
                                callEvent(manager, EVENT.FILE_ERROR, metadataTypeName, fileError.metadataObject, fileError.metadataItem, typeError.file);
                                if (!result[metadataTypeName]) {
                                    result[metadataTypeName] = [];
                                }
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
                    let endTag = XML.XMLParser.endTag(line, elementPaths[indexElement - 1]);
                    while (endTag || indexElement > 0) {
                        indexElement--;
                        endTag = XML.XMLParser.endTag(line, elementPaths[indexElement - 1]);
                    }
                    nLine++;
                }
            }
        }
        callEvent(manager, EVENT.END_ERROR, metadataTypeName);
    }
    return result;
}

function countTabs(line: string): number {
    let tabCounter = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== '\t') {
            break;
        }
        tabCounter++;
    }
    return tabCounter;
}