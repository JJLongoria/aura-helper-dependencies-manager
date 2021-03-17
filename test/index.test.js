const DependenciesManager = require('../index');
const { TypesFactory } = require('@ah/core').Types;
const { FileWriter } = require('@ah/core').FileSystem;

describe('Testing ./index.js', () => {
    test('Testing repairDependencies()', () => {
        const metadataDetails = TypesFactory.createMetadataDetails('./test/assets/metadataTypes.json');
        FileWriter.copyFolderSync('./test/assets/SFDXProject', './test/assets/SFDXProjectCopy', true);
        FileWriter.delete('./test/assets/SFDXProjectCopy/force-app/main/default/flexipages/PA_lightRp_servicios.flexipage-meta.xml');
        FileWriter.delete('./test/assets/SFDXProjectCopy/force-app/main/default/profiles/Account Manager.profile-meta.xml');
        FileWriter.delete('./test/assets/SFDXProjectCopy/force-app/main/default/tabs/o_guias_precios__c.tab-meta.xml');
        FileWriter.delete('./test/assets/SFDXProjectCopy/force-app/main/default/tabs/o_domains__c.tab-meta.xml');
        FileWriter.delete('./test/assets/SFDXProjectCopy/force-app/main/default/tabs/o_bonificaciones__c.tab-meta.xml');
        DependenciesManager.getSupportedTypes();
        let errors = DependenciesManager.repairDependencies('./test/assets/SFDXProjectCopy', metadataDetails, {
            checkOnly: true,
            compress: true,
            ignoreFile: './test/assets/SFDXProjectCopy/.ahignore.json'
        }, function (status) {

        });
        //console.log(JSON.stringify(errors, null, 2));
        DependenciesManager.repairDependencies('./test/assets/SFDXProjectCopy', metadataDetails);
        errors = DependenciesManager.repairDependencies('./test/assets/SFDXProjectCopy', metadataDetails, {
            compress: true,
            ignoreFile: './test/assets/SFDXProjectCopy/.ahignore.json'
        }, function (status) {

        });
        DependenciesManager.repairDependencies('./test/assets/SFDXProjectCopy', metadataDetails, {
            compress: true,
            sortOrder: 'simpleFirst',
            ignoreFile: './test/assets/SFDXProjectCopy/.ahignore.json',
            typesToRepair: {
                PermissionSet: [
                    'permission'
                ],
                Profilesss: [
                    'permission'
                ],
                CustomFields: [

                ],
                Labels: [
                    
                ]
            }
        }, function (status) {

        });
        //console.log(JSON.stringify(errors, null, 2));
    });
});