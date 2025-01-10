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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationManager = void 0;
var OperationParams_1 = require("./OperationParams");
var Operations_1 = require("./Operations");
var path_1 = __importDefault(require("path"));
var artifacts_enum_1 = require("../utils/artifacts_enum");
var OperationManager = /** @class */ (function () {
    function OperationManager() {
    }
    // Deploy operation
    OperationManager.DeployArtifacts = function (templateFile, parameterFile) {
        if (templateFile === void 0) { templateFile = ""; }
        if (parameterFile === void 0) { parameterFile = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var params, deployer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = (0, OperationParams_1.GetDeployParams)(templateFile, parameterFile);
                        deployer = new Operations_1.DeployOperation(params);
                        return [4 /*yield*/, deployer.PerformOperation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Validate operation
    OperationManager.ValidateArtifacts = function (publishArtifacts) {
        if (publishArtifacts === void 0) { publishArtifacts = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Export function also internally validates
                    return [4 /*yield*/, OperationManager.ExportArtifacts(publishArtifacts)];
                    case 1:
                        // Export function also internally validates
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Export operation
    OperationManager.ExportArtifacts = function (publishArtifacts) {
        return __awaiter(this, void 0, void 0, function () {
            var params, exporter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = (0, OperationParams_1.GetExportParams)(publishArtifacts);
                        exporter = new Operations_1.ExportOperation(params);
                        return [4 /*yield*/, exporter.PerformOperation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Validate and deploy
    OperationManager.ValidateAndDeploy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var folder, templateFile, parameterFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        folder = artifacts_enum_1.ExportConstants.destinationFolder;
                        templateFile = path_1.default.join(folder, artifacts_enum_1.ExportConstants.templateFile);
                        parameterFile = path_1.default.join(folder, artifacts_enum_1.ExportConstants.parameterFile);
                        // Validate and then export the templates.
                        return [4 /*yield*/, OperationManager.ValidateArtifacts(false)];
                    case 1:
                        // Validate and then export the templates.
                        _a.sent();
                        // Deploy the exported templates.
                        return [4 /*yield*/, OperationManager.DeployArtifacts(templateFile, parameterFile)];
                    case 2:
                        // Deploy the exported templates.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return OperationManager;
}());
exports.OperationManager = OperationManager;
