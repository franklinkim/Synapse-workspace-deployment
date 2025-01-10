"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var common_utils_1 = require("../utils/common_utils");
var test_fixtures_1 = require("./helpers/test_fixtures");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();
describe('CommonUtils', function () {
    it('Should return a boolean false', function () {
        var isEmptyString = (0, common_utils_1.isStrNullOrEmpty)('prod');
        chai.assert.isFalse(isEmptyString);
    });
    it('Should return a boolean true', function () {
        var isEmptyString = (0, common_utils_1.isStrNullOrEmpty)('');
        chai.assert.isTrue(isEmptyString);
    });
    it('Should consider it as default artifact - SQL', function () {
        chai.assert.isTrue((0, common_utils_1.isDefaultArtifact)(JSON.stringify(test_fixtures_1.DEFAULTARTIFACTSQL)));
    });
    it('Should consider it as default artifact - Storage', function () {
        chai.assert.isTrue((0, common_utils_1.isDefaultArtifact)(JSON.stringify(test_fixtures_1.DEFAULTARTIFACTSTORAGE)));
    });
    it('Should consider it as default artifact - Credentials', function () {
        chai.assert.isTrue((0, common_utils_1.isDefaultArtifact)(JSON.stringify(test_fixtures_1.DEFAULTARTIFACTCREDENTAILS)));
    });
    it('Should not consider it as default artifact - Storage', function () {
        chai.assert.isFalse((0, common_utils_1.isDefaultArtifact)(JSON.stringify(test_fixtures_1.DEFAULTARTIFACTFAIl1)));
    });
    it('Should not consider it as default artifact - Storage', function () {
        chai.assert.isFalse((0, common_utils_1.isDefaultArtifact)(JSON.stringify(test_fixtures_1.DEFAULTARTIFACTFAIl2)));
    });
    it('Should not consider it as default artifact - SQL', function () {
        chai.assert.isFalse((0, common_utils_1.isDefaultArtifact)(JSON.stringify(test_fixtures_1.DEFAULTARTIFACTFAIl3)));
    });
    it('Should not consider it as default artifact - Credentials', function () {
        chai.assert.isFalse((0, common_utils_1.isDefaultArtifact)(JSON.stringify(test_fixtures_1.DEFAULTARTIFACT4)));
    });
});
