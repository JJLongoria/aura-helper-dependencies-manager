# **Aura Helper Dependencies Manager Module**
Module to check and repair Metadata Dependencies on Salesforce's project files. You can repair your dependencies with one simple method or check if have errors. Also you can use a .ahignore.json file (see [Ignore File](#ignore-file) section) to exclude the specified metadata types when check dependencies error and compress or not the affected XML files. 

# [**DependeciesManager Class**](#dependenciesmanager-class)
Class to check dependencies errors on files or repair it automatically. This class analize all metadata types and files to check if any file or type does not exists on the local project to repair it from the files where exists.

# [**Methods**](#dependenciesmanager-class-methods)

---
## options()
Method to get the default options object to Repair Dependencies. The available options are:

- **types**: JSON Metadata Object or JSON Metadata File path with the objects to repair (if you don't want to repair all Metadata Types). See [Metadata JSON Format](#metadata-file) section to understand the JSON Metadata Format 
- **compress**: true to compress the affected XML files
- **sortOrder**: Sort order to compress XML Files
- **checkOnly**: true to only check  and return the errors data, false to repair dependencies automatically 
- **ignoreFile**: ignore file path to use to ignore metadata types from repair dependencies

### **Return:**
Returns a RepairDependenciesOptions object with the default values. 
- RepairDependenciesOptions

The default values are:

    types: undefined
    compress: false
    sortOrder: undefined
    checkOnly: false
    ignoreFile: undefined
---

## getSupportedTypes()
Method to get a list with all supported types to repair or check dependencies

### **Return:**
Return a list with the supported Metadata Type API Names 
- Array\<String\>

### **Examples:**

    const DependenciesManager = require('@ah/dependencies-manager');

    const supportedTypes = DependenciesManager.getSupportedTypes();
    console.log(supportedTypes);
    // ['CustomApplication', 'PermissionSet'...]
---

### repairDependencies(projectPath, metadataDetails, options, progressCallback)
Method to repair or check any Salesforce project dependencies to fix possible deploy errors.

### **Parameters:**
  - **projectPath**: Path to the root project folder
    - String
  - **metadataDetails**: List of metadata details
    - Array\<MetadataDetail\>
  - **options**: Options object to process this method on several forms
    - RepairDependenciesOptions
  - **progressCallback**: Callback function to handle the repair progress

### **Return:**
Return an object with the errors data (The errors output its different if you choose onlyCheck or repair dependencies). See [Repair Response](#repair-response) section to understand the response when repair dependencies or see [Only Check Response](#only-check-response) section to understand the reponse when only check dependencies errors.
- Object

### **Throws:**
This method can throw the next exceptions:

- **WrongDirectoryPathException**: If the project path is not a String or can't convert to absolute path
- **DirectoryNotFoundException**: If the project path not exists or not have access to it
- **InvalidDirectoryPathException**: If the project path is not a directory
- **WrongFilePathException**: If the ignore file or types file is not a String or can't convert to absolute path
- **FileNotFoundException**: If the ignore file or types file not exists or not have access to it
- **InvalidFilePathException**: If the ignore file or types file is not a file
- **WrongFormatException**: If types is not a Metadata JSON file or Metadata JSON Object or ignore file is not a JSON file

### **Examples:**
**Repair all Dependencies**

    const DependenciesManager = require('@ah/dependencies-manager');
    const Connection = require('@ah/connector');

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        const projectRoot = 'path/to/your/project';
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // Handle errors
    });

**Repair all Dependencies and compress**

    const DependenciesManager = require('@ah/dependencies-manager');
    const Connection = require('@ah/connector');
    const { SORT_ORDER } = require('@ah/xml-compressor');

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        const projectRoot = 'path/to/your/project';
        const options = {
            compress: true,
            sortOrder: SORT_ORDER.SIMPLE_FIRST      // You can choose a sort order for compression
        };
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails, options);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // Handle errors
    });

**Repair specified types**
You can choose specified Metadata Types (and childs) to repair. See [Metadata JSON Format](#metadata-file) section to understand the JSON Metadata Format

    const { Types, Values } = require('@ah/core');
    const DependenciesManager = require('@ah/dependencies-manager');
    const Connection = require('@ah/connector');
    const MetadataTypes = Values.MetadataTypes;
    const MetadataType = Types.MetadataType;
    const MetadataObject = Types.MetadataObject;
    const MetadataItem = Types.MetadataItem;

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {

        const projectRoot = 'path/to/your/project';
        const options = {
            types: {}
        };
        options.types[MetadataTypes.CUSTOM_APPLICATION] = new MetadataType(MetadataTypes.CUSTOM_APPLICATION, true); // set to true Metadata Type to ignore all custom application
        options.types[MetadataTypes.PERMISSION_SET] = new MetadataType(MetadataTypes.PERMISSION_SET, false);    // set to false Metadata Type to ignore some permission sets 
        options.types[MetadataTypes.PERMISSION_SET].addChild(new MetadataObject('PermissionSet1', true));   // Set to true to repair PermissionSet1
        options.types[MetadataTypes.PERMISSION_SET].addChild(new MetadataObject('PermissionSet2', true));  // Set to true to repair PermissionSet2
        options.types[MetadataTypes.PERMISSION_SET].addChild(new MetadataObject('PermissionSet3', false));  // Set to false to not repair PermissionSet3

        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails, options);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // handle errors
    });

**Repair all using ignore file**

    const DependenciesManager = require('@ah/dependencies-manager');
    const Connection = require('@ah/connector');

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        const projectRoot = 'path/to/your/project';
        const options = {
            ignoreFile: 'path/to/the/ignore/file'
        };
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails, options);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // handle errors
    });

**Check errors only**

You can choose check errors instead repair dependencies. In this case, the process not modified files or remove errors, only return the errors by Metadata type, with the affected file, the line, start column and end column... 

    const DependenciesManager = require('@ah/dependencies-manager');
    const Connection = require('@ah/connector');

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        
        // Now, you can repair project dependencies
        const projectRoot = 'path/to/your/project';
        const options = {
            checkOnly: true
        };
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails, options);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // handle errors
    });

**Monitorize Progress**

You can monitorize the progress for every file and metadata type with the progress calback. The progress callback return a ProgressStatus object with the progress data and some util methods to handle the progress

    const DependenciesManager = require('@ah/dependencies-manager');
    const Connection = require('@ah/connector');
    const { SORT_ORDER } = require('@ah/xml-compressor');

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        
        // Now, you can repair project dependencies
        const projectRoot = 'path/to/your/project';
        const options = {
            ignoreFile: 'path/to/the/ignore/file',
            compress: true,
            sortOrder: SORT_ORDER.SIMPLE_FIRST      // Yoy can choose a sort order for compression
        };
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails, options, (status) => {
            // Progress Callback
            if(status.isOnPrepareStage()){
                // preparing stage. First step before process dependencies
            }
            if(status.isOnStartTypeStage()){
                // Start processing Metadata type
                console.log(status.entityType);
            }
            if(status.isOnStartObjectStage()){
                // Start processing Metadata object
                console.log(status.entityType);
                console.log(status.entityObject);
            }
            if(status.isOnStartItemStage()){
                // Start processing Metadata Item
                console.log(status.entityType);
                console.log(status.entityObject);
                console.log(status.entityItem);
            }
            if(status.isOnEndItemStage()){
                // End processing Metadata Item
                console.log(status.entityType);
                console.log(status.entityObject);
                console.log(status.entityItem);
            }
            if(status.isOnEndObjectStage()){
                // End processing Metadata object
                console.log(status.entityType);
                console.log(status.entityObject);
            }
            if(status.isOnEndTypeStage()){
                // End processing Metadata type
                console.log(status.entityType);
            }
            if(status.isOnProcessStage()){
                // Start procesing errors. (Stage only executed for checkOnly options)
            }
            if(status.isOnStartErrorStage()){
                // Start procesing a Metadata type errors. (Stage only executed for checkOnly options)
                console.log(status.entityType);
            }
            if(status.isOnFileErrorStage()){
                // On file error added. (Stage only executed for checkOnly options)
                console.log(status.entityType);
                console.log(status.entityObject);
                console.log(status.entityItem);
                console.log(status.data);   // file path
            }
            if(status.isOnEndErrorStage()){
                // End procesing a Metadata type errors. (Stage only executed for checkOnly options)
                console.log(status.entityType);
            }
        });
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // handle errors
    });

# [**Repair Response**](#repair-response)
When you repair dependencies with any option (compress or not, repair specified types...) the response error has the next structure:

    {
        "MetadataTypeName": {
            "metadataType": "MetadataTypeName"
            "errors": [
                {
                    "file": "path/to/file"
                    "errors": [
                        {
                            "elementPath": "xmlSuperParentTag>xmlParentTag>xmlTag",
                            "value": "error value",
                            "metadataType": "error Metadata Type",
                            "metadataObject": "error Metadata Object",
                            "metadataItem": "error Metadata Item",
                            "xmlElement": {
                                // xml Element error data
                            }
                        },
                        {
                            ...
                        },
                        {
                            ...
                        }
                    ]
                },
                {
                    ...
                },
                {
                    ...
                }
            ]
        }
    }

Example:

    {
        "CustomApplication": {
            "metadataType": "CustomApplication"
            "errors": [
                {
                    "file": "..../force-app/main/default/applications/customApplicationExample.app-meta.xml"
                    "errors": [
                        {
                            "elementPath": "actionOverrides>content",
                            "value": "FlexiPageExample",
                            "metadataType": "FlexiPage",
                            "metadataObject": "FlexiPageExample",
                            "xmlElement": {
                                "actionName": "View",
                                "comment": "Action override description",
                                "content": "FlexiPageExample",
                                "formFactor": "Large",
                                "pageOrSobjectType": "Account",
                                "skipRecordTypeSelect": false,
                                "type": "Flexipage"
                            }
                        },
                        {
                            ...
                        },
                        {
                            ...
                        }
                    ]
                },
                {
                    ...
                },
                {
                    ...
                }
            ]
        },
        "PermissionSet": {
            "metadataType": "PermissionSet"
            "errors": [
                {
                    "file": "..../force-app/main/default/permissionsets/permissionSetExample.app-meta.xml"
                    "errors": [
                        {
                            "elementPath": "fieldPermissions>field",
                            "value": "Account.custom_field__c",
                            "metadataType": "CustomField",
                            "metadataObject": "Account",
                            "metadataItem": "custom_field__c",
                            "xmlElement": {
                                "editable": false,
                                "field": "Account.custom_field__c",
                                "readable": false
                            }
                        },
                        {
                            ...
                        },
                        {
                            ...
                        }
                    ]
                },
                {
                    ...
                },
                {
                    ...
                }
            ]
        }
    }

# [**Only Check Response**](#only-check-response)
When you only check dependencies errors the response error has the next structure:

    {
        "MetadataTypeName": [
            {
                "object": "MetadataObject",
                "item": "MetadataItem"
                "line": 16,
                "startColumn": 146,
                "endColumn": 166,
                "message": "MetadataTypeName named MetadataObject.MetadataItem does not exists",
                "severity": "Warning",
                "file": "/path/to/file"
            },
            {
                "object": "MetadataObject",
                "item": "MetadataItem"
                "line": 17,
                "startColumn": 146,
                "endColumn": 166,
                "message": "MetadataTypeName named MetadataObject.MetadataItem does not exists",
                "severity": "Warning",
                "file": "/path/to/file"
            },
        ],
        "MetadataTypeName": [
            {
                ...
            },
            {
                ...
            }
        ]
    }

Example:

    {
        "CustomApplication": [
            {
                "object": "FlexiPageExample",
                "line": 16,
                "startColumn": 146,
                "endColumn": 166,
                "message": "FlexiPage named FlexiPageExample does not exists",
                "severity": "Warning",
                "file": "..../force-app/main/default/applications/customApplicationExample.app-meta.xml"
            },
            {
                "object": "FlexiPageExample",
                "line": 17,
                "startColumn": 146,
                "endColumn": 166,
                "message": "FlexiPage named FlexiPageExample does not exists",
                "severity": "Warning",
                "file": "..../force-app/main/default/applications/customApplicationExample.app-meta.xml"
            },
        ],
        "PermissionSet": [
            {
                "object": "Account",
                "item": "custom_field__c",
                "line": 1771,
                "startColumn": 56,
                "endColumn": 85,
                "message": "CustomField named Account.custom_field__c does not exists",
                "severity": "Warning",
                "file": "..../force-app/main/default/permissionsets/permissionSetExample.permissionset-meta.xml"
            },
            {
                "object": "Account",
                "item": "custom_field2__c",
                "line": 1772,
                "startColumn": 56,
                "endColumn": 85,
                "message": "CustomField named Account.custom_field2__c does not exists",
                "severity": "Warning",
                "file": "..../force-app/main/default/permissionsets/permissionSetExample.permissionset-meta.xml"
            },
        ]
    }

# [**Metadata JSON Format**](#metadata-file)

The Metadata JSON Format used by Aura Helper Framework and modules have the next structure. Some fields are required and the datatypes checked to ensure the correct file structure. 

    {
        "MetadataAPIName": {
            "name": "MetadataAPIName",                                  // Required (String). Contains the Metadata Type API Name (like object Key)
            "checked": false,                                           // Required (Boolean). Field for include this type on package or not
            "path": "path/to/the/metadata/folder",                      // Optional (String). Path to the Metadata Type folder in local project
            "suffix": "fileSuffix",                                     // Optional (String). Metadata File suffix
            "childs": {                                                 // Object with a collection of childs (Field required (JSON Object) but can be an empty object)
                "MetadataObjectName":{
                    "name": "MetadataObjectName",                       // Required (String). Contains the Metadata Object API Name (like object Key)
                    "checked": false,                                   // Required (Boolean). Field for include this object on package or not
                    "path": "path/to/the/metadata/file/or/folder",      // Optional (String). Path to the object file or folder path
                    "childs": {                                         // Object with a collection of childs (Field required (JSON Object) but can be an empty object)
                        "MetadataItemName": {
                            "name": "MetadataItemName",                 // Required (String). Contains the Metadata Item API Name (like object Key)
                            "checked": false,                           // Required (Boolean). Field for include this object on package or not
                            "path": "path/to/the/metadata/file"
                        },
                        "MetadataItemName2": {
                            ...
                        },
                        ...,
                        ...,
                        ...
                    }
                }
                "MetadataObjectName2":{
                   ...
                },
                ...,
                ...,
                ...
            }
        }
    }

### **Example**:

***
    {
        "CustomObject": {
            "name": "CustomObject",
            "checked": false,
            "path":  "path/to/root/project/force-app/main/default/objects",
            "suffix": "object",
            "childs": {
                "Account": {
                    "name": "Account",
                    "checked": true,            // Add Account Object to the package
                    "path": "path/to/root/project/force-app/main/default/objects/Account/Account.object-meta.xml",
                    "childs": {}
                },
                "Case": {
                    "name": "Case",
                    "checked": true,            // Add Case Object to the package
                    "path": "path/to/root/project/force-app/main/default/objects/Case/Case.object-meta.xml",
                    "childs": {}
                },
                ...,
                ...,
                ...
            }
        },
        "CustomField": {
            "name": "CustomField",
            "checked": false,
            "path":  "path/to/root/project/force-app/main/default/objects",
            "suffix": "field",
            "childs": {
                "Account": {
                    "name": "Account",
                    "checked": false,            
                    "path": "path/to/root/project/force-app/main/default/objects/Account/fields",
                    "childs": {
                        "customField__c": {
                            "name": "customField__c",
                            "checked": true,    // Add customField__c to the package
                            "path": "path/to/root/project/force-app/main/default/objects/Account/fields/customField__c.field-meta.xml",
                        },
                        ...,
                        ...,
                        ...
                    }
                },
                "Case": {
                    "name": "Case",
                    "checked": false,           
                    "path": "path/to/root/project/force-app/main/default/objects/Case/fields",
                    "childs": {
                        "CaseNumber": {
                            "name": "CaseNumber",
                            "checked": true,    // Add CaseNumber to the package
                            "path": "path/to/root/project/force-app/main/default/objects/Account/fields/CaseNumber.field-meta.xml",
                        },
                        ...,
                        ...,
                        ...
                    }
                },
                ...,
                ...,
                ...
            }
        }
    }

# [Ignore File](#ignore-file)

The ignore file is a JSON file used on ignore, create package or dependencies manager modules. On this file you can specify metadata types, objects and elements for ignore or delete from your local project, package files or ignore when check dependencies.

The ignore file have the next structure

    {
        // Basic structure
        "MetadataTypeAPIName": {
            "MetadataObject1",
            "MetadataObject2"
        }

        // Advance Structure
        "MetadataTypeAPIName": {
            "MetadataObject1:MetadataItem1",
            "MetadataObject1:MetadataItem2",
            "MetadataObject2:*",
            "*",
            "*:*" // Only valid on Custom Objects
        }

        // Special for Permissions
        "MetadataTypeAPIName": {
            "UserPermission:MetadataObject1:PermissionName",
            "UserPermission:MetadataObject2:*",
            "UserPermission:*:PermissionName"
        }
    }

*Example*:

    {
        "CustomLabels": {
            "labelName1",                   // Ignore or remove the custom label "labelName1"
            "labelName2",                   // Ignore or remove the custom label "labelName2",
            "*"                             // Ignore or remove all Custom Labels
        },
        "AssignmentRules":{
            "Case:Assign1",                 // Ignore or remove the Assignent Rule "Assign1" from the object Case
            "Lead:*",                       // Ignore or remove all Assignment Rules from Lead
            "*"                             // Ignore or remove all Assignment Rules
        },
        "CustomObject": {
            "Account",                      // Ignore or remove the Account Object
            "Case:*",                       // Ignore or remove all related objects from case, including the object (Bussines Process, Fields, Validation Rules...),
            "*",                            // Ignore or remove all custom objects (only the object not the related metadata)
            "*:*",                          // Ignore or remove all custom objects and the related metadata (Bussines Process, Fields, Validation Rules...)
        },
        "Report": {
            "ReportFolder",                 // Ignore or remove the entire folder
            "ReportFolder1:ReportName2",    // Ignore or remove the report "ReportName2" from "ReportFolder1" folder.
            "*",                            // Ignore or remove all reports.
        },
        "Workflow": {
            "Account",                      // Ignore or remove the Account worflows (Rules, Task, Alerts...)
            "*"                             // Ignore or  remove all workflows (Rules, Task, Alerts...) from all objects 
        },
        "WorkflowRule": {
            "Case:*",                       // Ignore or remove all Workflow rules from case object
            "Account:Rule1",                // Ignore or remove "Rule1" from Account workflows,
            "*"                             // Ignore or remove all Worflow rules from all objects
        },
        "Profile": {
            "UserPermission:*:Permission1", // Remove the "Permission1" User Permission from all profiles
            "UserPermission:TestProfile:*", // Remove all User permissions from TestProfile file
            "UserPermission:Admin:Perm1",   // Remove the Perm1 User Permission from Admin profile
            "TestProfile2",                 // Ignore or remove  the "TestProfile" profile 
            "*"                             // Ignore or remove all profiles
        }
    }

#### IMPORTANT

    Some Metadata Types have singular and plural name like CustomLabels, MatchingRules, EscalationRules... For ignore or remove this types you must use the plural name, if use the singular name the ignore process not take effect with this types.