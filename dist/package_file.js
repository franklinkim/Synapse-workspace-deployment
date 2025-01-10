"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageFile = void 0;
var PackageFile = /** @class */ (function () {
    function PackageFile(templateFile, parametersFile, armOverrides) {
        this.fs = require("fs");
        this.packageFiles = {
            templateFile: templateFile,
            parametersFile: parametersFile,
            armOverrides: armOverrides
        };
    }
    PackageFile.prototype.getPackageFiles = function () {
        var parametersFileContent = this.getPackageFileContent(this.packageFiles.parametersFile);
        var templateFileContent = this.getPackageFileContent(this.packageFiles.templateFile);
        var armOverridesContent = this.getPackageFileContent(this.packageFiles.armOverrides, true);
        return {
            templateFileContent: templateFileContent,
            parametersFileContent: parametersFileContent,
            armOverridesContent: armOverridesContent
        };
    };
    PackageFile.prototype.getPackageFileContent = function (filePath, returnBlank) {
        if (returnBlank === void 0) { returnBlank = false; }
        if (!this.fs.existsSync(filePath)) {
            if (returnBlank) {
                return "";
            }
        }
        var fileContent = "";
        if (!this.fs.lstatSync(filePath).isDirectory()) {
            try {
                fileContent = this.fs.readFileSync(filePath, 'utf8');
            }
            catch (error) {
                throw new Error("Failed to read file" + filePath);
            }
        }
        else {
            throw new Error("Input file path instead of directory");
        }
        return fileContent;
    };
    return PackageFile;
}());
exports.PackageFile = PackageFile;
