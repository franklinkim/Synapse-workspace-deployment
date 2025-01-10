"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetExportParams = exports.GetValidateParams = exports.GetDeployParams = void 0;
var core = __importStar(require("@actions/core"));
var common_utils_1 = require("../utils/common_utils");
var artifacts_enum_1 = require("../utils/artifacts_enum");
function GetDeployParams(templateFile, parameterFile) {
    if (templateFile === void 0) { templateFile = ""; }
    if (parameterFile === void 0) { parameterFile = ""; }
    templateFile = templateFile == "" ? core.getInput("TemplateFile") : templateFile;
    parameterFile = parameterFile == "" ? core.getInput("ParametersFile") : parameterFile;
    var overrides = core.getInput("OverrideArmParameters");
    var workspaceName = core.getInput("TargetWorkspaceName");
    var environment = core.getInput("Environment");
    if ((0, common_utils_1.isStrNullOrEmpty)(environment)) {
        environment = 'prod';
    }
    var deleteArtifacts = core.getInput("DeleteArtifactsNotInTemplate").toLowerCase() == "true";
    var deployMPE = core.getInput("deployManagedPrivateEndpoint").toLowerCase() == "true";
    var failOnMissingOverrides = core.getInput("FailOnMissingOverrides").toLowerCase() == "true";
    return {
        templateFile: templateFile,
        parameterFile: parameterFile,
        overrides: overrides,
        environment: environment,
        deleteArtifacts: deleteArtifacts,
        deployMPE: deployMPE,
        failOnMissingOverrides: failOnMissingOverrides,
        workspaceName: workspaceName
    };
}
exports.GetDeployParams = GetDeployParams;
function GetValidateParams() {
    var artifactsFolder = core.getInput("ArtifactsFolder");
    var workspaceName = core.getInput("TargetWorkspaceName");
    return {
        artifactsFolder: artifactsFolder,
        workspaceName: workspaceName
    };
}
exports.GetValidateParams = GetValidateParams;
function GetExportParams(publishArtifact) {
    var destinationFolder = artifacts_enum_1.ExportConstants.destinationFolder;
    var artifactsFolder = core.getInput("ArtifactsFolder");
    var workspaceName = core.getInput("TargetWorkspaceName");
    return {
        artifactsFolder: artifactsFolder,
        workspaceName: workspaceName,
        destinationFolder: destinationFolder,
        publishArtifact: publishArtifact
    };
}
exports.GetExportParams = GetExportParams;
