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
exports.ExportOperation = exports.ValidateOperation = exports.DeployOperation = void 0;
var BundleManager_1 = require("./BundleManager");
var artifacts_enum_1 = require("../utils/artifacts_enum");
var common_utils_1 = require("../utils/common_utils");
var package_file_1 = require("../package_file");
var deploy_utils_1 = require("../utils/deploy_utils");
var orchestrator_1 = require("../orchestrator");
var artifacts_client_1 = require("../clients/artifacts_client");
var logger_1 = require("../utils/logger");
var DeployOperation = /** @class */ (function () {
    function DeployOperation(operationParams) {
        this.operationType = artifacts_enum_1.OPERATIONS.deploy;
        this.operationParams = operationParams;
    }
    DeployOperation.prototype.PerformOperation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var packageFiles, params, artifactClient, orchestrator, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.SystemLogger.info("Starting ".concat(this.operationType, " operation"));
                        if ((0, common_utils_1.isStrNullOrEmpty)(this.operationParams.overrides) && this.operationParams.failOnMissingOverrides) {
                            throw new Error("Overrides not provided.");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        packageFiles = new package_file_1.PackageFile(this.operationParams.templateFile, this.operationParams.parameterFile, this.operationParams.overrides);
                        return [4 /*yield*/, (0, deploy_utils_1.getParams)()];
                    case 2:
                        params = _a.sent();
                        artifactClient = new artifacts_client_1.ArtifactClient(params);
                        orchestrator = new orchestrator_1.Orchestrator(packageFiles, artifactClient, this.operationParams.workspaceName, this.operationParams.environment, this.operationParams.deleteArtifacts, this.operationParams.deployMPE);
                        return [4 /*yield*/, orchestrator.orchestrateFromPublishBranch()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        logger_1.SystemLogger.info("".concat(this.operationType, " operation failed"));
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DeployOperation;
}());
exports.DeployOperation = DeployOperation;
var ValidateOperation = /** @class */ (function () {
    function ValidateOperation(operationParams) {
        this.operationType = artifacts_enum_1.OPERATIONS.validate;
        this.operationParams = operationParams;
    }
    ValidateOperation.prototype.PerformOperation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cmd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.SystemLogger.info("Starting ".concat(this.operationType, " operation"));
                        cmd = [
                            'node',
                            BundleManager_1.BundleManager.defaultBundleFilePath,
                            this.operationType,
                            "\"".concat(this.operationParams.artifactsFolder, "\""),
                            this.operationParams.workspaceName
                        ].join(' ');
                        return [4 /*yield*/, BundleManager_1.BundleManager.ExecuteShellCommand(cmd)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ValidateOperation;
}());
exports.ValidateOperation = ValidateOperation;
var ExportOperation = /** @class */ (function () {
    function ExportOperation(operationParams) {
        this.operationType = artifacts_enum_1.OPERATIONS.export;
        this.operationParams = operationParams;
    }
    ExportOperation.prototype.PerformOperation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cmd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.SystemLogger.info("Starting ".concat(this.operationType, " operation"));
                        cmd = [
                            'node',
                            BundleManager_1.BundleManager.defaultBundleFilePath,
                            this.operationType,
                            "\"".concat(this.operationParams.artifactsFolder, "\""),
                            this.operationParams.workspaceName,
                            this.operationParams.destinationFolder
                        ].join(' ');
                        return [4 /*yield*/, BundleManager_1.BundleManager.ExecuteShellCommand(cmd)];
                    case 1:
                        _a.sent();
                        if (this.operationParams.publishArtifact) {
                            logger_1.SystemLogger.info("Generating artifacts in " + this.operationParams.destinationFolder);
                            // Do not remove the below log. It is used to upload the artifact.
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ExportOperation;
}());
exports.ExportOperation = ExportOperation;
