"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orchestrator = void 0;
var artifacts_client_1 = require("./clients/artifacts_client");
var arm_template_utils_1 = require("./utils/arm_template_utils");
var artifacts_enum_1 = require("./utils/artifacts_enum");
var deploy_utils_1 = require("./utils/deploy_utils");
var logger_1 = require("./utils/logger");
var service_principal_client_utils_1 = require("./utils/service_principal_client_utils");
var workspace_artifacts_getter_1 = require("./utils/workspace_artifacts_getter");
var Orchestrator = /** @class */ (function () {
    function Orchestrator(packageFiles, artifactClient, targetWorkspace, environment, deleteArtifactsNotInTemplate, deployMPE) {
        this.packageFiles = packageFiles;
        this.artifactClient = artifactClient;
        this.targetWorkspace = targetWorkspace;
        this.environment = environment;
        this.deleteArtifactsNotInTemplate = deleteArtifactsNotInTemplate;
        this.deployMPE = deployMPE;
    }
    Orchestrator.prototype.orchestrateFromPublishBranch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var packageFilesContent, armTemplateContent, armParameterContent, overrideArmParameters, targetLocation, canDeployMPE, artifactsToDeploy, artifactsInWorkspace, artifactsToDeleteInWorkspace, artifactsToDeleteInWorkspaceInOrder, datalakeSubArtifactsToDelete, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, this.packageFiles.getPackageFiles()];
                    case 1:
                        packageFilesContent = _a.sent();
                        armTemplateContent = packageFilesContent.templateFileContent;
                        armParameterContent = packageFilesContent.parametersFileContent;
                        overrideArmParameters = packageFilesContent.armOverridesContent;
                        if (!(armTemplateContent && armParameterContent)) {
                            throw new Error('Empty template or parameters file');
                        }
                        return [4 /*yield*/, (0, service_principal_client_utils_1.getWorkspaceLocation)(this.artifactClient.getParams(), this.targetWorkspace)];
                    case 2:
                        targetLocation = _a.sent();
                        return [4 /*yield*/, (0, workspace_artifacts_getter_1.SKipManagedPE)(this.targetWorkspace, this.environment)];
                    case 3:
                        canDeployMPE = _a.sent();
                        canDeployMPE = !canDeployMPE && this.deployMPE;
                        return [4 /*yield*/, (0, arm_template_utils_1.getArtifacts)(armParameterContent, armTemplateContent, overrideArmParameters, this.targetWorkspace, targetLocation)];
                    case 4:
                        artifactsToDeploy = _a.sent();
                        logger_1.SystemLogger.info("Start deploying artifacts from the template.");
                        return [4 /*yield*/, this.deployResourcesInOrder(this.artifactClient, artifactsToDeploy, this.targetWorkspace, this.environment, canDeployMPE)];
                    case 5:
                        _a.sent();
                        logger_1.SystemLogger.info("Completed deploying artifacts from the template.");
                        if (!this.deleteArtifactsNotInTemplate) return [3 /*break*/, 10];
                        // Delete extra artifacts in the workspace
                        logger_1.SystemLogger.info("Attempting to delete artifacts from workspace, that were not in the template.");
                        return [4 /*yield*/, (0, workspace_artifacts_getter_1.getArtifactsFromWorkspace)(this.targetWorkspace, this.environment)];
                    case 6:
                        artifactsInWorkspace = _a.sent();
                        logger_1.SystemLogger.info("Found ".concat(artifactsInWorkspace.length, " artifacts in the workspace."));
                        artifactsToDeleteInWorkspace = (0, workspace_artifacts_getter_1.getArtifactsToDeleteFromWorkspace)(artifactsInWorkspace, artifactsToDeploy, artifacts_client_1.typeMap);
                        logger_1.SystemLogger.info("Found ".concat(artifactsToDeleteInWorkspace.length, " artifacts in the workspace that many need to be deleted."));
                        artifactsToDeleteInWorkspaceInOrder = (0, workspace_artifacts_getter_1.getArtifactsToDeleteFromWorkspaceInOrder)(artifactsToDeleteInWorkspace);
                        return [4 /*yield*/, this.deleteResourcesInOrder(this.artifactClient, artifactsToDeleteInWorkspaceInOrder, this.targetWorkspace, this.environment, armParameterContent)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, (0, workspace_artifacts_getter_1.DatalakeSubArtifactsToDelete)(artifactsInWorkspace, artifactsToDeploy, this.targetWorkspace, this.environment)];
                    case 8:
                        datalakeSubArtifactsToDelete = _a.sent();
                        return [4 /*yield*/, this.deleteDatalakeArtifacts(this.artifactClient, datalakeSubArtifactsToDelete, this.targetWorkspace, this.environment)];
                    case 9:
                        _a.sent();
                        logger_1.SystemLogger.info("Completed deleting artifacts from workspace, that were not in the template.");
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_1 = _a.sent();
                        throw new Error("Orchestrate failed - ".concat(err_1));
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Orchestrator.prototype.deployResourcesInOrder = function (artifactClient, artifactsToDeploy, targetWorkspace, environment, canDeployMPE) {
        return __awaiter(this, void 0, void 0, function () {
            var i, batchOfArtifacts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < artifactsToDeploy.length)) return [3 /*break*/, 5];
                        batchOfArtifacts = artifactsToDeploy[i];
                        return [4 /*yield*/, this.deployBatch(artifactClient, batchOfArtifacts, targetWorkspace, environment, canDeployMPE)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, artifactClient.WaitForAllDeployments(false)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Orchestrator.prototype.deleteResourcesInOrder = function (artifactClient, artifactsToDelete, targetWorkspace, environment, armParameterContent) {
        return __awaiter(this, void 0, void 0, function () {
            var i, batchOfArtifacts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < artifactsToDelete.length)) return [3 /*break*/, 5];
                        batchOfArtifacts = artifactsToDelete[i];
                        return [4 /*yield*/, this.deleteBatch(artifactClient, batchOfArtifacts, targetWorkspace, environment, armParameterContent)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, artifactClient.WaitForAllDeployments(true)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Orchestrator.prototype.skipDeployment = function (artifactTypeToDeploy) {
        if (artifactTypeToDeploy == artifacts_enum_1.Artifact.sqlpool ||
            artifactTypeToDeploy == artifacts_enum_1.Artifact.bigdatapools ||
            artifactTypeToDeploy == artifacts_enum_1.Artifact.managedvirtualnetworks) {
            return true;
        }
        return false;
    };
    Orchestrator.prototype.deployBatch = function (artifactClient, artifactsToDeploy, targetWorkspace, environment, DeployMPE) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, artifactsToDeploy_1, resource, artifactTypeToDeploy, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, artifactsToDeploy_1 = artifactsToDeploy;
                        _a.label = 1;
                    case 1:
                        if (!(_i < artifactsToDeploy_1.length)) return [3 /*break*/, 6];
                        resource = artifactsToDeploy_1[_i];
                        if (resource.isDefault) {
                            logger_1.SystemLogger.info("Skipping deployment of ".concat(resource.name, " as its a default workspace resource."));
                            return [3 /*break*/, 5];
                        }
                        artifactTypeToDeploy = artifacts_client_1.typeMap.get(resource.type.toLowerCase());
                        if (!resource.content) {
                            logger_1.SystemLogger.info("Empty artifactMap of type : ".concat(resource.type, " skipping deployment"));
                            return [3 /*break*/, 5];
                        }
                        logger_1.SystemLogger.info("Deploy ".concat(artifactTypeToDeploy, " ").concat(resource.type));
                        result = void 0;
                        if (!(this.skipDeployment(artifactTypeToDeploy) || (!DeployMPE && artifactTypeToDeploy == artifacts_enum_1.Artifact.managedprivateendpoints))) return [3 /*break*/, 2];
                        // Currently not supporting Sql and spark pools. Skipping
                        //result = await armclient.deploy(resource.content);
                        logger_1.SystemLogger.info("Deployment of type ".concat(artifactTypeToDeploy, " is not currently supported."));
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, artifactClient.deployArtifact(artifactTypeToDeploy, resource, targetWorkspace, environment)];
                    case 3:
                        // Do the artifact deployment
                        result = _a.sent();
                        _a.label = 4;
                    case 4:
                        logger_1.SystemLogger.info("Deployment status : ".concat(result));
                        if (result != deploy_utils_1.DeployStatus.success) {
                            throw new Error("For Artifact ".concat(resource.name, ": Failure in deployment: ").concat(result));
                        }
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Orchestrator.prototype.deleteBatch = function (artifactClient, artifactsToDelete, targetWorkspace, environment, armParameterContent) {
        return __awaiter(this, void 0, void 0, function () {
            var error, _i, artifactsToDelete_1, resource, artifactTypeToDelete, result, deletionStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = "";
                        _i = 0, artifactsToDelete_1 = artifactsToDelete;
                        _a.label = 1;
                    case 1:
                        if (!(_i < artifactsToDelete_1.length)) return [3 /*break*/, 4];
                        resource = artifactsToDelete_1[_i];
                        if (resource.isDefault) {
                            logger_1.SystemLogger.info("Skipping deletion of ".concat(resource.name, " as its a default workspace resource."));
                            return [3 /*break*/, 3];
                        }
                        artifactTypeToDelete = artifacts_client_1.typeMap.get(resource.type.toLowerCase());
                        logger_1.SystemLogger.info("Deleting ".concat(resource.name, " of type ").concat(artifactTypeToDelete));
                        if (artifactTypeToDelete == artifacts_enum_1.Artifact.sqlpool ||
                            artifactTypeToDelete == artifacts_enum_1.Artifact.bigdatapools ||
                            artifactTypeToDelete == artifacts_enum_1.Artifact.managedvirtualnetworks) {
                            // Skip this.
                            return [3 /*break*/, 3];
                        }
                        return [4 /*yield*/, artifactClient.deleteArtifact(artifactTypeToDelete, resource, targetWorkspace, environment)];
                    case 2:
                        // Do the artifact deletion
                        result = _a.sent();
                        logger_1.SystemLogger.info("Deletion status : ".concat(result));
                        deletionStatus = {
                            key: resource.type.toLowerCase(),
                            value: "Deployment status : ".concat(result)
                        };
                        if (result != deploy_utils_1.DeployStatus.success) {
                            // If deletion is not a success, its ok. we move forward.
                            logger_1.SystemLogger.info("Failure in deployment: " + result);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Orchestrator.prototype.deleteDatalakeArtifacts = function (artifactClient, resources, workspace, environment) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, resources_1, resource, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _i = 0, resources_1 = resources;
                        _a.label = 1;
                    case 1:
                        if (!(_i < resources_1.length)) return [3 /*break*/, 4];
                        resource = resources_1[_i];
                        return [4 /*yield*/, artifactClient.deleteDatalakeChildren(resource, workspace, environment)];
                    case 2:
                        response = _a.sent();
                        if (response != deploy_utils_1.DeployStatus.success) {
                            throw new Error("Artifact deletion failed : ".concat(resource));
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("Deletion successful of tables and relationships in database.");
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        throw new Error("Database deletion failed : ".concat(err_2));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Orchestrator;
}());
exports.Orchestrator = Orchestrator;
