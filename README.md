# Aura Helper Dependencies Manager Module
Module to check and repair Metadata Dependencies on Salesforce's project files. You can repair your dependencies with one simple method or check if have errors. Also you can use a .ahignore.json file (see [Ignore File](#ignore-file) section) to exclude the specified metadata types when check dependencies error and compress or not the affected XML files. 

**Support up to API 51.0**

# [Usage](#usage)
The Dependencies Manager module has several options to use: Check or repair dependencies, compress and sort affected files, repair only specified types... Examples:

## [Repair all Dependencies](#repair-all-dependencies)
You can repair all project dependencies simple with only one method. For this operation, also need a Metadata Details from your salesforce project. You can get it with [@ah/connector](https://github.com/JJLongoria/aura-helper-connector) from your org using the listMetadataTypes() method.

To handle the error response see [Repair Response](#repair-response) section on [Returned Responses](#returned-responses)

    const DependenciesManager = require('@ah/dependencies-manager');
    const Connection = require('@ah/connector');

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        
        // Now, you can repair project dependencies
        const projectRoot = 'path/to/your/project';
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        
    });


***
## [Repair all Dependencies and compress](#repair-all-dependencies-and-compress)
You can repair all project dependencies and compress the affected files easy. For this operation, also need a Metadata Details from your salesforce project. You can get it with [@ah/connector](https://github.com/JJLongoria/aura-helper-connector) from your org using the listMetadataTypes() method. Also allow to you to compress files with the [@ah/xml-compressor](https://github.com/JJLongoria/aura-helper-xml-compressor)

To handle the error response see [Repair Response](#repair-response) section on [Returned Responses](#returned-responses)

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
            compress: true,
            sortOrder: SORT_ORDER.SIMPLE_FIRST      // Yoy can choose a sort order for compression
        };
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails, options);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        
    });


***
## [Repair specified types](#repair-specified-dependencies)
You can choose specified Metadata Types (and childs) to repair. For this operation, also need a Metadata Details from your salesforce project. You can get it with [@ah/connector](https://github.com/JJLongoria/aura-helper-connector) from your org using the listMetadataTypes() method.

To handle the error response see [Repair Response](#repair-response) section on [Returned Responses](#returned-responses)

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
            typesToRepair: {
                CustomApplication: [
                    '*'
                ],
                PermissionSet: [
                    'PermissionSet1',
                    'PermissionSet2'
                ],
            }
        };
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails, options);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        
    });


***
## [Repair all using ignore file](#repair-all-dependencies-ignore)
To grant a correct dependencies treatment according your needs, you can use an ignore file (see [Ignore File](#ignore-file) section) to exclude the specified types to check errors. For this operation, also need a Metadata Details from your salesforce project. You can get it with [@ah/connector](https://github.com/JJLongoria/aura-helper-connector) from your org using the listMetadataTypes() method.

To handle the error response see [Repair Response](#repair-response) section on [Returned Responses](#returned-responses)

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
            ignoreFile: 'path/to/the/ignore/file'
        };
        const errors = DependenciesManager.repairDependencies(projectRoot, metadataDetails, options);
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        
    });

***
## [Check errors only](#check-errors-only)
Yo can choose check errors instead repair dependencies. In this case, the process not modified files or remove errors, only return the errors by Metadata type, with the affected file, the line, start column and end column... For this operation, also need a Metadata Details from your salesforce project. You can get it with [@ah/connector](https://github.com/JJLongoria/aura-helper-connector) from your org using the listMetadataTypes() method.

### IMPORTANT
The returned errors reponse with check errors are different when repair errors. When you repair errors, the returned response are the errors by metadata type, file and include de element path or the xml value to check. When you only check errors, the returned response containes the errors by type, including the affected file, the errors line, start column and end column with other data. Are two different JSON objects. (See the [Returned Responses](#returned-responses) section)

To handle the error response see [Only Check Response](#only-check-response) section on [Returned Responses](#returned-responses)

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
        
    });

***
## [Monitorize Progress](#monitorize-progress)
You can monitorize the progress for every file and metadata type with the progress calback. For this operation, also need a Metadata Details from your salesforce project. You can get it with [@ah/connector](https://github.com/JJLongoria/aura-helper-connector) from your org using the listMetadataTypes() method. Also allow to you to compress files with the [@ah/xml-compressor](https://github.com/JJLongoria/aura-helper-xml-compressor)

To handle the error response see [Repair Response](#repair-response) section on [Returned Responses](#returned-responses)

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
            if(status.stage === 'prepare'){
                // preparing stage. First step before process dependencies
            }
            if(status.stage === 'startType'){
                // Start processing Metadata type
                console.log(status.metadataType);
            }
            if(status.stage === 'startObject'){
                // Start processing Metadata object
                console.log(status.metadataType);
                console.log(status.metadataObject);
            }
            if(status.stage === 'startItem'){
                // Start processing Metadata Item
                console.log(status.metadataType);
                console.log(status.metadataObject);
                console.log(status.metadataItem);
            }
            if(status.stage === 'endItem'){
                // End processing Metadata Item
                console.log(status.metadataType);
                console.log(status.metadataObject);
                console.log(status.metadataItem);
            }
            if(status.stage === 'endObject'){
                // End processing Metadata object
                console.log(status.metadataType);
                console.log(status.metadataObject);
            }
            if(status.stage === 'endType'){
                // End processing Metadata type
                console.log(status.metadataType);
            }
            if(status.stage === 'onErrors'){
                // Start procesing errors. (Stage only executed for checkOnly options)
            }
            if(status.stage === 'startError'){
                // Start procesing a Metadata type errors. (Stage only executed for checkOnly options)
                console.log(status.metadataType);
            }
            if(status.stage === 'fileError'){
                // On file error added. (Stage only executed for checkOnly options)
                console.log(status.metadataType);
                console.log(status.metadataObject);
                console.log(status.metadataItem);
                console.log(status.file);
            }
            if(status.stage === 'endError'){
                // End procesing a Metadata type errors. (Stage only executed for checkOnly options)
                console.log(status.metadataType);
            }
        });
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        
    });

***
## [Get Supported Types](#get-supported-types)
If you want to get all supported types to the Dependencies Manager module, run the getSupportedTypes() methods:

    const DependenciesManager = require('@ah/dependencies-manager');

    const supportedTypes = DependenciesManager.getSupportedTypes();
    console.log(supportedTypes);
    // ['CustomApplication', 'PermissionSet'...]


***
# [Returned Responses](#returned-responses)
The Dependencies Manager Module return two response types, one reponse when repair dependencies and other when only check errors:

## [Repair Response](#repair-response)
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

***
## [Only Check Response](#only-check-response)
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

***
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