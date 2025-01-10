"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var package_file_1 = require("../package_file");
var chai_object = require('chai');
var expect = chai_object.expect;
var assert = chai_object.assert;
describe("Validate package file modules", function () {
    it('should fetch content of files', function () {
        var templateFile = "./test/helpers/templates/template.txt";
        var parametersFile = "./test/helpers/templates/template.txt";
        var armOverrides = "./test/helpers/templates/template.txt";
        var packageFiles = new package_file_1.PackageFile(templateFile, parametersFile, armOverrides);
        var packageFilesContent = packageFiles.getPackageFiles();
        var armTemplateContent = packageFilesContent.templateFileContent;
        var armParameterContent = packageFilesContent.parametersFileContent;
        expect(armTemplateContent).to.be.equal('Testing this dummy file');
        expect(armParameterContent).to.be.equal('Testing this dummy file');
    });
    it('should fail while reading the files (file name incorrect)', function () {
        var templateFile = './test/helpers/templates/fail.txt';
        var parametersFile = './test/helpers/templates/fail.txt';
        var armOverrides = "./test/helpers/templates/fail.txt";
        var packageFiles = new package_file_1.PackageFile(templateFile, parametersFile, armOverrides);
        assert.throws(function () { packageFiles.getPackageFiles(); }, Error);
    });
    it('should fail while reading the files (is a directory)', function () {
        var templateFile = './helpers/templates';
        var parametersFile = './helpers/templates';
        var armOverrides = './helpers/templates';
        var packageFiles = new package_file_1.PackageFile(templateFile, parametersFile, armOverrides);
        assert.throws(function () { packageFiles.getPackageFiles(); }, Error);
    });
});
