import { DependenciesManager } from '../index';
import { MetadataFactory } from '@aurahelper/metadata-factory';
import { FileWriter, MetadataObject, MetadataType, MetadataTypes } from '@aurahelper/core';
import { SORT_ORDER } from '@aurahelper/xml-compressor';

describe('Testing ./index.js', () => {
    test('Testing repairDependencies()', () => {
        const metadataDetails = MetadataFactory.createMetadataDetails('./src/test/assets/metadataTypes.json');
        FileWriter.copyFolderSync('./src/test/assets/SFDXProject', './src/test/assets/SFDXProjectCopy', true);
        FileWriter.delete('./src/test/assets/SFDXProjectCopy/force-app/main/default/flexipages/PA_lightRp_servicios.flexipage-meta.xml');
        FileWriter.delete('./src/test/assets/SFDXProjectCopy/force-app/main/default/profiles/Account Manager.profile-meta.xml');
        FileWriter.delete('./src/test/assets/SFDXProjectCopy/force-app/main/default/tabs/o_guias_precios__c.tab-meta.xml');
        FileWriter.delete('./src/test/assets/SFDXProjectCopy/force-app/main/default/tabs/o_domains__c.tab-meta.xml');
        FileWriter.delete('./src/test/assets/SFDXProjectCopy/force-app/main/default/tabs/o_bonificaciones__c.tab-meta.xml');
        DependenciesManager.getSupportedTypes();
        const manager = new DependenciesManager('./src/test/assets/SFDXProjectCopy', metadataDetails);
        manager.setProjectFolder('./src/test/assets/SFDXProjectCopy');
        manager.setMetadataDetails(metadataDetails);
        manager.setSortOrder(SORT_ORDER.ALPHABET_ASC);
        manager.sortComplexFirst();
        manager.sortSimpleFirst();
        manager.sortAlphabetAsc();
        manager.sortAlphabetDesc();
        manager.onPrepare((status) => {
            expect(status.entityType).toBeUndefined();
        });
        manager.onStartType((status) => {
            expect(status.entityType).toBeDefined();
        });
        manager.onStartObject((status) => {
            expect(status.entityType).toBeDefined();
            expect(status.entityObject).toBeDefined();
        });
        manager.onStartItem((status) => {
            expect(status.entityType).toBeDefined();
            expect(status.entityObject).toBeDefined();
            expect(status.entityType).toBeDefined();
        });
        manager.onEndType((status) => {
            expect(status.entityType).toBeDefined();
        });
        manager.onEndObject((status) => {
            expect(status.entityType).toBeDefined();
            expect(status.entityObject).toBeDefined();
        });
        manager.onEndItem((status) => {
            expect(status.entityType).toBeDefined();
            expect(status.entityObject).toBeDefined();
            expect(status.entityType).toBeDefined();
        });
        manager.onProcess((status) => {
            expect(status.entityType).toBeUndefined();
        });
        manager.onStartErrors((status) => {
            expect(status.entityType).toBeDefined();
        });
        manager.onEndErrors((status) => {
            expect(status.entityType).toBeDefined();
        });
        manager.onFileError((status) => {
            expect(status.data).toBeDefined();
        });
        manager.onCompressFile((status) => {
            expect(status.entityType).toBeDefined();
            expect(status.entityObject).toBeDefined();
            expect(status.data).toBeDefined();
        });
        manager.setCompress(true);
        manager.setIgnoreFile('./src/test/assets/SFDXProjectCopy/.ahignore.json');
        let checkErrors = manager.checkErrors();
        //console.log(JSON.stringify(errors, null, 2));
        manager.setCompress(false);
        manager.setIgnoreFile(undefined);
        manager.repairDependencies();
        manager.setCompress(true);
        manager.setIgnoreFile('./src/test/assets/SFDXProjectCopy/.ahignore.json');
        let errors = manager.repairDependencies();
        const types: { [key: string]: MetadataType } = {};
        types[MetadataTypes.PERMISSION_SET] = new MetadataType(MetadataTypes.PERMISSION_SET, false);
        types[MetadataTypes.PERMISSION_SET].addChild(new MetadataObject('permission', true));
        types['Profilesss'] = new MetadataType('Profilesss', false);
        types['Profilesss']!.addChild(new MetadataObject('permission', true));
        types['CustomFields'] = new MetadataType('CustomFields', true);
        types['Labels'] = new MetadataType('Labels', true);
        manager.setCompress(true);
        manager.setIgnoreFile('./src/test/assets/SFDXProjectCopy/.ahignore.json');
        manager.sortSimpleFirst();
        manager.setTypesToRepair(types);
        manager.checkErrors();
        manager.repairDependencies();
        //console.log(JSON.stringify(errors, null, 2));
    });
});