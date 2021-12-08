# **Aura Helper Dependencies Manager Module**

[![Version](https://img.shields.io/npm/v/@aurahelper/dependencies-manager?logo=npm)](https://www.npmjs.com/package/@aurahelper/dependencies-manager)
[![Total Downloads](https://img.shields.io/npm/dt/@aurahelper/dependencies-manager?logo=npm)](https://www.npmjs.com/package/@aurahelper/dependencies-manager)
[![Downloads/Month](https://img.shields.io/npm/dm/@aurahelper/dependencies-manager?logo=npm)](https://www.npmjs.com/package/@aurahelper/dependencies-manager)
[![Issues](https://img.shields.io/github/issues/jjlongoria/aura-helper-dependencies-manager)](https://github.com/JJLongoria/aura-helper-dependencies-manager/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/JJLongoria/aura-helper-dependencies-manager/badge.svg)](https://snyk.io/test/github/JJLongoria/aura-helper-dependencies-manager)
[![Code Size](https://img.shields.io/github/languages/code-size/jjlongoria/aura-helper-dependencies-manager)](https://github.com/JJLongoria/aura-helper-dependencies-manager)
[![License](https://img.shields.io/github/license/jjlongoria/aura-helper-dependencies-manager?logo=github)](https://github.com/JJLongoria/aura-helper-dependencies-manager/blob/master/LICENSE)

Module to check and repair Metadata Dependencies on Salesforce's project files. You can repair your dependencies with one simple method or check if have errors. Also you can use a .ahignore.json file (see [Ignore File](#ignore-file) section) to exclude the specified metadata types when check dependencies error and compress or not the affected XML files. 

---

## *Table of Contents*

- [**DependeciesManager Class**](#dependenciesmanager-class)

- [**Repair Response**](#repair-response)
  
- [**Only Check Response**](#only-check-response)
  
- [**Metadata JSON Format**](#metadata-json-format)

- [**Ignore File**](#ignore-file)

---

# [**DependeciesManager Class**](#dependenciesmanager-class)
Class to check dependencies errors on files or repair it automatically. This class analize all metadata types and files to check if any file or type does not exists on the local project to repair it from the files where exists.

All Dependecies Manager methods return a Promise with the associated data to the processes.  

#### **Class Members**
- [**Fields**](#connection-class-fields)

- [**Constructors**](#connection-class-constructor)

- [**Methods**](#connection-class-methods)

</br>

# [**Fields**](#connection-class-fields)
The fields that start with _ are for internal use only (Does not modify this fields to a correct connection work). To the rest of fields, setter methods are recommended instead modify fields.

### [**projectFolder**](#connection-class-fields-projectfolder)
Path to the project root folder
- `string`

### [**metadataDetails**](#connection-class-fields-metadatadetails)
List of metadata details to repair dependencies.
- `MetadataDetail[]`

### [**ignoreFile**](#connection-class-fields-ignorefile)
Path to the ignore file
- `string`

### [**typesToRepair**](#connection-class-fields-typestorepair)
JSON Metadata Object or JSON Metadata File path with the objects to repair (if you don't want to repair all Metadata Types)
- `string` | `{ [key: string]: MetadataType }` 

### [**compress**](#connection-class-fields-compress)
True to compress the XML Files, false in otherwise. If undefined or not pass parameter, also set to true.
- `boolean`

### [**sortOrder**](#connection-class-fields-sortorder)
Sort order to order the XML elements. Values: simpleFirst, complexFirst, alphabetAsc or alphabetDesc. (alphabetDesc by default)
- `string`

  
</br>

# [**Constructors**](#connection-class-constructors)
The Connection class has only one constructor to create a connection

## [**constructor(projectFolder, metadataDetails)**](#connection-class-constructors-construct)
Constructor to create a new connection object. All parameters are optional and you can use the setters methods to set the values when you want.

### **Parameters:**
  - **projectFolder**: Path to the project root folder 
    - `string`
  - **metadataDetails**: List of metadata details 
    - `MetadataDetail[]`

</br>

# [**Methods**](#dependenciesmanager-class-methods)

  - [**onPrepare(callback)**](#onpreparecallback)

    Method to handle the event when preparing execution of repair or check dependencies

  - [**onStartType(callback)**](#onstarttypecallback)

    Method to handle the event before start process Metadata Type

  - [**onStartObject(callback)**](#onstartobjectcallback)

    Method to handle the event before start process Metadata Object

  - [**onStartItem(callback)**](#onstartitemcallback)

    Method to handle the event before start process Metadata Item

  - [**onEndType(callback)**](#onendtypecallback)

    Method to handle the event before after process Metadata Type

  - [**onEndObject(callback)**](#onendobjectcallback)

    Method to handle the event before after process Metadata Object

  - [**onEndItem(callback)**](#onenditemcallback)

    Method to handle the event before after process Metadata Item

  - [**onProcess(callback)**](#onprocesscallback)

    Method to handle the event before start processing results on some processes

  - [**onStartErrors(callback)**](#onstarterrorscallback)

    Method to handle the event before start process errors on metadata type

  - [**onEndErrors(callback)**](#onenderrorscallback)

    hod to handle the event after process errors on metadata type

  - [**onFileError(callback)**](#onfileerrorcallback)

    Method to handle the event before start processing the errors encuntered on file

  - [**onCompressFile(callback)**](#oncompressfilecallback)
   
    Method to handle the event before start compress XML affected files 

  - [**setIgnoreFile(ignoreFile)**](#setignorefileignorefile)

    Method to set the ignore file to ignore the metadata types on repair

  - [**setTypesToRepair(typesToRepair)**](#settypestorepairtypestorepair)

    Method to set the Metadata JSON Object or Metadata JSON file path to process

  - [**setCompress(compress)**](#setcompresscompress)

    Method to set if compress the affected XML Files when repair dependencies

  - [**setSortOrder(sortOrder)**](#setsortordersortorder)

    Method to set the sort order for the XML Elements when compress the files

  - [**sortSimpleFirst()**](#sortsimplefirst)

    Method to set Simple XML Elements first as sort order (simpleFirst)

  - [**sortComplexFirst()**](#sortcomplexfirst)

    Method to set Complex XML Elements first as sort order (complexFirst)

  - [**sortAlphabetAsc()**](#sortalphabetasc)

    Method to set Alphabet Asc as sort order (alphabetAsc)

  - [**sortAlphabetDesc()**](#sortalphabetdesc)

    Method to set Alphabet Desc as sort order (alphabetDesc)

  - [**getSupportedTypes()**](#getsupportedtypes)

    Method to get a list with all supported types to repair or check dependencies

  - [**repairDependencies()**](#repairdependencies)

    Method to repair any Salesforce project dependencies to fix possible deploy errors.

  - [**checkErrors()**](#checkerrors)

    Method to check errors on any Salesforce project dependencies to fix possible deploy errors.

---

## [**onPrepare(callback)**](#onpreparecallback)
Method to handle the event when preparing execution of repair or check dependencies

### **Parameters:**
  - **callback**: Callback function to call when manager is on prepare
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on prepare stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onPrepare((status) => {
      console.log('Handling progress on prepare');
    }));
```
---

## [**onStartType(callback)**](#onstarttypecallback)
Method to handle the event before start process Metadata Type

### **Parameters:**
  - **callback**: Callback function to handle progress before start process Metadata Type
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on start type stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onStartType((status) => {
      console.log('Handling progress on start type');
      console.log('MetadataType => ' + status.entityType);
    }));
```
---

## [**onStartObject(callback)**](#onstartobjectcallback)
Method to handle the event before start process Metadata Object

### **Parameters:**
  - **callback**: Callback function to handle progress before start process Metadata Object
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on start object stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onStartObject((status) => {
      console.log('Handling progress on start object');
      console.log('MetadataType => ' + status.entityType);
      console.log('MetadataObject => ' + status.entityObject);
    }));
```
---

## [**onStartItem(callback)**](#onstartitemcallback)
Method to handle the event before start process Metadata Item

### **Parameters:**
  - **callback**: Callback function to handle progress before start process Metadata Item
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on start item stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onStartItem((status) => {
      console.log('Handling progress on start item');
      console.log('MetadataType => ' + status.entityType);
      console.log('MetadataObject => ' + status.entityObject);
      console.log('MetadataItem => ' + status.entityItem);
    }));
```
---

## [**onEndType(callback)**](#onendtypecallback)
Method to handle the event before after process Metadata Type

### **Parameters:**
  - **callback**: Callback function to handle progress after process Metadata Type
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on end type stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onEndType((status) => {
      console.log('Handling progress on end type');
      console.log('MetadataType => ' + status.entityType);
    }));
```
---

## [**onEndObject(callback)**](#onendobjectcallback)
Method to handle the event before after process Metadata Object

### **Parameters:**
  - **callback**: Callback function to handle progress after process Metadata Object
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on end object stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onEndObject((status) => {
      console.log('Handling progress on end object');
      console.log('MetadataType => ' + status.entityType);
      console.log('MetadataObject => ' + status.entityObject);
    }));
```
---

## [**onEndItem(callback)**](#onenditemcallback)
Method to handle the event before after process Metadata Item

### **Parameters:**
  - **callback**: Callback function to handle progress after process Metadata Item
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on end item stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onEndObject((status) => {
      console.log('Handling progress on end item');
      console.log('MetadataType => ' + status.entityType);
      console.log('MetadataObject => ' + status.entityObject);
      console.log('MetadataItem => ' + status.entityItem);
    }));
```
---

## [**onProcess(callback)**](#onprocesscallback)
Method to handle the event before start processing results on some processes

### **Parameters:**
  - **callback**: Callback function to handle progress when manager is processing results
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on process stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onProcess((status) => {
      console.log('Handling progress on process');
    }));
```
---

## [**onStartErrors(callback)**](#onstarterrorscallback)
Method to handle the event before start process errors on metadata type

### **Parameters:**
  - **callback**: Callback function to handle progress before start process errors
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on start errors on Metadata Type stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onStartErrors((status) => {
      console.log('Handling progress on start errors');
      console.log('MetadataType => ' + status.entityType);
    }));
```
---

## [**onEndErrors(callback)**](#onenderrorscallback)
Method to handle the event after process errors on metadata type

### **Parameters:**
  - **callback**: Callback function to handle progress after process errors
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on end errors on Metadata Type stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onEndErrors((status) => {
      console.log('Handling progress on end errors');
      console.log('MetadataType => ' + status.entityType);
    }));
```
---

## [**onFileError(callback)**](#onfilerrorcallback)
Method to handle the event before start processing the errors encuntered on file

### **Parameters:**
  - **callback**: Callback function to handle progress before start processing the errors encuntered on file
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on start file error stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onEndErrors((status) => {
      console.log('Handling progress on end errors');
      console.log('MetadataType => ' + status.entityType);
      console.log('MetadataObject => ' + status.entityObject);
      console.log('MetadataItem => ' + status.entityItem);
      console.log('File => ' + status.data);
    }));
```
---

## [**onCompressFile(callback)**](#oncompressfilecallback)
Method to handle the event before start compress XML File on some processes

### **Parameters:**
  - **callback**: Callback function to handle progress when start compress
    - `Function`

### **Return:**
Returns the DependenciesManager object
- `DependenciesManager`

### **Examples:**
**Handling progress on compress file stage**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const dependenciesManager = new DependenciesManager();

    dependenciesManager.onCompressFile((status) => {
      console.log('Handling progress on end errors');
      console.log('MetadataType => ' + status.entityType);
      console.log('MetadataObject => ' + status.entityObject);
      console.log('MetadataItem => ' + status.entityItem);
      console.log('File => ' + status.data);
    }));
```
---

## [**setIgnoreFile(ignoreFile)**](#setignorefileignorefile)
Method to set the ignore file to ignore the metadata types  

### **Parameters:**
  - **ignorefile**: Path to the ignore file
    - `string`

### **Return:**
Return the DependenciesManager object instance
- `DependenciesManager`

### **Examples:**
**Set the ignore file**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    const dependenciesManager = new DependenciesManager();
    dependenciesManager.setIgnoreFile('path/to/the/ignore/file.json');
```
---

## [**setTypesToRepair(typesToRepair)**](#settypestorepairtypestorepair)
Method to set the Metadata Name or Names to ignore

### **Parameters:**
  - **typesToIgnore**: List with the Metadata Type API Names to ignore. This parameter is used to ignore only the specified metadata (also must be in ignore file) and avoid ignore all metadata types specified on the file.
    - `string` | `{ [key: string]: MetadataType }`

### **Return:**
Return the DependenciesManager object instance
- `DependenciesManager`

### **Examples:**
**Set the types to repair**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    const dependenciesManager = new DependenciesManager();
    dependenciesManager.setTypesToRepair({
        CustomObject: {
            checked: true,
            childs: {},
            name: 'CustomObject'
        }
    });
```
---

## [**setCompress(compress)**](#setcompresscompress)
True to compress the XML Files, false in otherwise. If undefined or not pass parameter, also set to true.

### **Parameters:**
  - **compress**: True to compress the XML Files, false in otherwise
    - `boolean`

### **Return:**
Return the DependenciesManager object instance
- `DependenciesManager`

### **Examples:**
**Set compress affected XML Files**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    const dependenciesManager = new DependenciesManager();
    dependenciesManager.setCompress(true);
```
---

## [**setSortOrder(sortOrder)**](#setsortordersortorder)
Method to set the sort order value to sort the XML Elements when compress

### **Parameters:**
  - **sortOrder**: Sort order to order the XML elements. Values: simpleFirst, complexFirst, alphabetAsc or alphabetDesc. (alphabetDesc by default).
    - `string`

### **Return:**
Return the DependenciesManager object instance
- `DependenciesManager`

### **Examples:**
**Set Sort order to order XML Elements**

```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    import { SORT_ORDER } from '@aurahelper/xml-compressor';

    const dependenciesManager = new DependenciesManager();
    dependenciesManager.setSortOrder(SORT_ORDER.SIMPLE_FIRST);
```
---

## [**sortSimpleFirst()**](#sortsimplefirst)
Method to set Simple XML Elements first as sort order (simpleFirst)

### **Return:**
Return the DependenciesManager object instance
- `DependenciesManager`


### **Examples:**
**Set Simple first sort order to order XML Elements**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    
    const dependenciesManager = new DependenciesManager();
    dependenciesManager.setIgnoreFile('path/to/the/ignore/file.json').sortSimpleFirst();
```
---

## [**sortComplexFirst()**](#sortcomplexfirst)
Method to set Complex XML Elements first as sort order (complexFirst)

### **Return:**
Return the DependenciesManager object instance
- `DependenciesManager`


### **Examples:**
**Set Complex first sort order to order XML Elements**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    
    const dependenciesManager = new DependenciesManager();
    dependenciesManager.setIgnoreFile('path/to/the/ignore/file.json').sortComplexFirst();
```
---

## [**sortAlphabetAsc()**](#sortalphabetasc)
Method to set Alphabet Asc as sort order (alphabetAsc)

### **Return:**
Return the DependenciesManager object instance
- `DependenciesManager`


### **Examples:**
**Set Alphabet asc sort order to order XML Elements**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    
    const dependenciesManager = new DependenciesManager();
    dependenciesManager.setIgnoreFile('path/to/the/ignore/file.json').sortAlphabetAsc();
```
---

## [**sortAlphabetDesc()**](#sortalphabetdesc)
Method to set Alphabet Desc as sort order (alphabetDesc)

### **Return:**
Return the DependenciesManager object instance
- `DependenciesManager`


### **Examples:**
**Set Alphabet desc sort order to order XML Elements**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    
    const dependenciesManager = new DependenciesManager();  
    dependenciesManager.setIgnoreFile('path/to/the/ignore/file.json').sortAlphabetDesc();
```
---

## [**getSupportedTypes()**](#getsupportedtypes)
Method to get a list with all supported types to repair or check dependencies

### **Return:**
Return a list with the supported Metadata Type API Names 
- `string[]`

### **Examples:**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';

    const supportedTypes = DependenciesManager.getSupportedTypes();
    console.log(supportedTypes);
    // ['CustomApplication', 'PermissionSet'...]
```
---

## [**repairDependencies()**](#repairdependencies)
Method to repair any Salesforce project dependencies to fix possible deploy errors.

### **Return:**
Return an object with the repaired errors data. See [Repair Response](#repair-response) section to understand the response.
- `{ [key: string]: DependenciesRepairResponse }` | `undefined`

### **Throws:**
This method can throw the next exceptions:

- **`WrongDirectoryPathException`**: If the project path is not a String or can't convert to absolute path
- **`DirectoryNotFoundException`**: If the project path not exists or not have access to it
- **`InvalidDirectoryPathException`**: If the project path is not a directory
- **`WrongFilePathException`**: If the ignore file or types file is not a String or can't convert to absolute path
- **`FileNotFoundException`**: If the ignore file or types file not exists or not have access to it
- **`InvalidFilePathException`**: If the ignore file or types file is not a file
- **`WrongFormatException`**: If types is not a Metadata JSON file or Metadata JSON Object or ignore file is not a JSON file

### **Examples:**
**Repair all Dependencies**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    import { Connection } from '@aurahelper/connector';

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        const projectRoot = 'path/to/your/project';
        const manager = new DependenciesManager(projectRoot, metadataDetails);
        const errors = manager.repairDependencies();
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // Handle errors
    });
```
**Repair all Dependencies and compress**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    import { Connection } from '@aurahelper/connector';
    import { SORT_ORDER } from '@aurahelper/xml-compressor';

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        const projectRoot = 'path/to/your/project';

        const manager = new DependenciesManager(projectRoot, metadataDetails);
        manager.setCompress();
        manager.sortSimpleFirst();
        const errors = manager.repairDependencies();
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // Handle errors
    });
```
**Repair specified types**
You can choose specified Metadata Types (and childs) to repair. See [Metadata JSON Format](#metadata-json-format) section to understand the JSON Metadata Format

```javascript
    import { MetadataTypes, MetadataType, MetadataObject, MetadataItem } = from '@aurahelper/core';
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    import { Connection } from '@aurahelper/connector';


    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {

        const projectRoot = 'path/to/your/project';
        const types: {};
        types[MetadataTypes.CUSTOM_APPLICATION] = new MetadataType(MetadataTypes.CUSTOM_APPLICATION, true); // set to true Metadata Type to ignore all custom application
        types[MetadataTypes.PERMISSION_SET] = new MetadataType(MetadataTypes.PERMISSION_SET, false);    // set to false Metadata Type to ignore some permission sets 
        types[MetadataTypes.PERMISSION_SET].addChild(new MetadataObject('PermissionSet1', true));   // Set to true to repair PermissionSet1
        types[MetadataTypes.PERMISSION_SET].addChild(new MetadataObject('PermissionSet2', true));  // Set to true to repair PermissionSet2
        types[MetadataTypes.PERMISSION_SET].addChild(new MetadataObject('PermissionSet3', false));  // Set to false to not repair PermissionSet3

        const manager = new DependenciesManager(projectRoot, metadataDetails);
        manager.setTypesToRepair(types);
        const errors = manager.repairDependencies();
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // handle errors
    });
```
**Monitorize Progress**

You can monitorize the progress for every file and metadata type with the progress calback. The progress callback return a ProgressStatus object with the progress data and some util methods to handle the progress

```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    import { Connection } from '@aurahelper/connector';
    import { SORT_ORDER } from '@aurahelper/xml-compressor';

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
        const manager = new DependenciesManager(projectRoot, metadataDetails);
        manager.setIgnoreFile('path/to/the/ignore/file').setCompress().sortSimpleFirst();

        manager.onPrepare(() => {
            console.log('Handle progress on prepare');
        });

        manager.onStartType(() => {
            console.log('Handle progress on start type');
        });

        manager.onStartObject(() => {
            console.log('Handle progress on start object');
        });

        ...
        // Set any of event handlers that you need

        const errors = manager.repairDependencies();
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // handle errors
    });
```
---

## [**checkErrors()**](#checkerrors)
Method to check errors on any Salesforce project dependencies to fix possible deploy errors.

### **Return:**
Return an object with the errors data. See [Only Check Response](#only-check-response) section to understand the response.
- `{ [key: string]: DependenciesCheckResponse[] }` | `undefined`

### **Throws:**
This method can throw the next exceptions:

- **`WrongDirectoryPathException`**: If the project path is not a String or can't convert to absolute path
- **`DirectoryNotFoundException`**: If the project path not exists or not have access to it
- **`InvalidDirectoryPathException`**: If the project path is not a directory
- **`WrongFilePathException`**: If the ignore file or types file is not a String or can't convert to absolute path
- **`FileNotFoundException`**: If the ignore file or types file not exists or not have access to it
- **`InvalidFilePathException`**: If the ignore file or types file is not a file
- **`WrongFormatException`**: If types is not a Metadata JSON file or Metadata JSON Object or ignore file is not a JSON file

### **Examples:**
**Check errors only**
```javascript
    import { DependenciesManager } from '@aurahelper/xml-definitions';
    import { Connection } from '@aurahelper/connector';

    // Get Metadata Details from your org using @ah/connector
    const connection = new Connection('MyOrg', '50');
    connection.setUsernameOrAlias('MyOrg');
    connection.setSingleThread();
    connection.listMetadataTypes().then((metadataDetails) => {
        
        // Now, you can repair project dependencies
        const projectRoot = 'path/to/your/project';

        const manager = new DependenciesManager(projectRoot, metadataDetails);

        manager.onPrepare(() => {
            console.log('Handle progress on prepare');
        });

        manager.onStartType(() => {
            console.log('Handle progress on start type');
        });

        manager.onStartObject(() => {
            console.log('Handle progress on start object');
        });

        ...
        // Set any of event handlers that you need

        const errors = manager.checkErrors();
        if(errors != undefinded){
            // errors have the affected elements with errors on dependencies
        }
    }).catch((error) => {
        // handle errors
    });
```
# [**Repair Response**](#repair-response)
When you repair dependencies with any option (compress or not, repair specified types...) the response error has the next structure:
```json
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
```
### **Example**:

```json
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
```

# [**Only Check Response**](#only-check-response)
When you only check dependencies errors the response error has the next structure:

```json
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
```

### **Example**:

```json
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
```

# [**Metadata JSON Format**](#metadata-json-format)

The Metadata JSON Format used by Aura Helper Framework and modules have the next structure. Some fields are required and the datatypes checked to ensure the correct file structure. 

```json
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

```

### **Example**:

```json
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
```

# [**Ignore File**](#ignore-file)

The ignore file is a JSON file used on ignore, create package or dependencies manager modules. On this file you can specify metadata types, objects and elements for ignore or delete from your local project, package files or ignore when check dependencies.

The ignore file have the next structure

```javascript
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
```

### **Example**:

```json
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

```

#### IMPORTANT

Some Metadata Types have singular and plural name like CustomLabels, MatchingRules, EscalationRules... For ignore or remove this types you must use the plural name, if use the singular name the ignore process not take effect with this types.