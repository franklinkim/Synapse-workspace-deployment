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
exports.ArtifactClient = exports.typeMap = void 0;
var core = __importStar(require("@actions/core"));
var httpClient = __importStar(require("typed-rest-client/HttpClient"));
var artifacts_enum_1 = require("../utils/artifacts_enum");
var deploy_utils_1 = require("../utils/deploy_utils");
var logger_1 = require("../utils/logger");
var q_1 = require("q");
exports.typeMap = new Map([
    [artifacts_enum_1.DataFactoryType.dataset.toLowerCase(), artifacts_enum_1.Artifact.dataset],
    [artifacts_enum_1.DataFactoryType.dataflow.toLowerCase(), artifacts_enum_1.Artifact.dataflow],
    [artifacts_enum_1.DataFactoryType.linkedservice.toLowerCase(), artifacts_enum_1.Artifact.linkedservice],
    [artifacts_enum_1.DataFactoryType.credential.toLowerCase(), artifacts_enum_1.Artifact.credential],
    [artifacts_enum_1.DataFactoryType.integrationruntime.toLowerCase(), artifacts_enum_1.Artifact.integrationruntime],
    [artifacts_enum_1.DataFactoryType.notebook.toLowerCase(), artifacts_enum_1.Artifact.notebook],
    [artifacts_enum_1.DataFactoryType.pipeline.toLowerCase(), artifacts_enum_1.Artifact.pipeline],
    [artifacts_enum_1.DataFactoryType.sparkjobdefinition.toLowerCase(), artifacts_enum_1.Artifact.sparkjobdefinition],
    [artifacts_enum_1.DataFactoryType.bigdatapools.toLowerCase(), artifacts_enum_1.Artifact.bigdatapools],
    [artifacts_enum_1.DataFactoryType.sqlpool.toLowerCase(), artifacts_enum_1.Artifact.sqlpool],
    [artifacts_enum_1.DataFactoryType.sqlscript.toLowerCase(), artifacts_enum_1.Artifact.sqlscript],
    [artifacts_enum_1.DataFactoryType.trigger.toLowerCase(), artifacts_enum_1.Artifact.trigger],
    [artifacts_enum_1.DataFactoryType.managedVirtualNetworks.toLowerCase(), artifacts_enum_1.Artifact.managedvirtualnetworks],
    [artifacts_enum_1.DataFactoryType.managedPrivateEndpoints.toLowerCase(), artifacts_enum_1.Artifact.managedprivateendpoints],
    [artifacts_enum_1.DataFactoryType.kqlScript.toLowerCase(), artifacts_enum_1.Artifact.kqlScript],
    [artifacts_enum_1.DataFactoryType.database.toLowerCase(), artifacts_enum_1.Artifact.database],
    [artifacts_enum_1.DataFactoryType.sparkconfiguration.toLowerCase(), artifacts_enum_1.Artifact.sparkconfiguration],
]);
var ArtifactClient = /** @class */ (function () {
    function ArtifactClient(params) {
        this.requestOptions = {};
        this.apiVersion = 'api-version=2019-06-01-preview';
        this.symsApiVersion = 'api-version=2021-04-01';
        this.idwValidation = 'validationtype=IDWValidation';
        this.nameTag = 'name';
        this.params = params;
        this.requestOptions.ignoreSslError = true;
        this.client = new httpClient.HttpClient('synapse-git-cicd-deploy-task', undefined, this.requestOptions);
        this.deploymentTrackingRequests = new Array();
    }
    ArtifactClient.prototype.getParams = function () {
        return this.params;
    };
    ArtifactClient.prototype.deployArtifact = function (resourceType, payload, workspace, environment) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, param, token, base_url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = this.getBaseurl(workspace, environment, resourceType);
                        return [4 /*yield*/, (0, deploy_utils_1.getParams)(true, environment)];
                    case 1:
                        param = _a.sent();
                        token = param.bearer;
                        base_url = param.activeDirectoryEndpointUrl;
                        base_url = base_url.substr(0, base_url.length - 2);
                        switch (resourceType) {
                            case artifacts_enum_1.Artifact.notebook:
                                return [2 /*return*/, this.deployNotebook(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.sparkjobdefinition:
                                return [2 /*return*/, this.deploySparkJobDefinition(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.sqlscript:
                                return [2 /*return*/, this.deploySqlScript(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.dataset:
                                return [2 /*return*/, this.deployDataset(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.pipeline:
                                return [2 /*return*/, this.deployPipeline(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.dataflow:
                                return [2 /*return*/, this.deployDataflow(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.trigger:
                                return [2 /*return*/, this.deployTrigger(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.linkedservice:
                                return [2 /*return*/, this.deployLinkedservice(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.integrationruntime:
                                return [2 /*return*/, this.deployIntegrationruntime(base_url, payload, token)];
                            case artifacts_enum_1.Artifact.credential:
                                return [2 /*return*/, this.deployCredential(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.kqlScript:
                                return [2 /*return*/, this.deployKqlScript(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.managedprivateendpoints:
                                return [2 /*return*/, this.deployManagedPrivateEndpoint(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.database:
                                return [2 /*return*/, this.deployDatabase(baseUrl, payload, token)];
                            case artifacts_enum_1.Artifact.sparkconfiguration:
                                return [2 /*return*/, this.deploySparkConfiguration(baseUrl, payload, token)];
                            default:
                                return [2 /*return*/, deploy_utils_1.DeployStatus.skipped];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deleteArtifact = function (resourceType, payload, workspace, environment) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, param, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = this.getBaseurl(workspace, environment, resourceType);
                        return [4 /*yield*/, (0, deploy_utils_1.getParams)(true, environment)];
                    case 1:
                        param = _a.sent();
                        token = param.bearer;
                        return [4 /*yield*/, this.artifactDeletionTask(baseUrl, resourceType, payload, token)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArtifactClient.prototype.deleteDatalakeChildren = function (resource, workspace, location) {
        return __awaiter(this, void 0, void 0, function () {
            var url, param, token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = ArtifactClient.getUrlByEnvironment(workspace, location);
                        return [4 /*yield*/, (0, deploy_utils_1.getParams)(true, location)];
                    case 1:
                        param = _a.sent();
                        token = param.bearer;
                        url = "".concat(url, "/").concat(resource, "?").concat(this.symsApiVersion);
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.client.del(url, this.getHeaders(token)).then(function (res) {
                                        var resStatus = res.message.statusCode;
                                        console.log("For Artifact: ".concat(resource, ": ArtifactDeletionTask status: ").concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                                        if (resStatus != 200 && resStatus != 201 && resStatus != 202) {
                                            return reject(deploy_utils_1.DeployStatus.failed);
                                        }
                                        return resolve(deploy_utils_1.DeployStatus.success);
                                    });
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    ArtifactClient.prototype.WaitForAllDeployments = function (isDelete) {
        return __awaiter(this, void 0, void 0, function () {
            var i, deploymentTrackingRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.deploymentTrackingRequests.length)) return [3 /*break*/, 6];
                        deploymentTrackingRequest = this.deploymentTrackingRequests[i];
                        if (!isDelete) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.checkStatusForDelete(deploymentTrackingRequest.url, deploymentTrackingRequest.name, deploymentTrackingRequest.token)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.checkStatus(deploymentTrackingRequest.url, deploymentTrackingRequest.name, deploymentTrackingRequest.token)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        while (this.deploymentTrackingRequests.length > 0) {
                            this.deploymentTrackingRequests.pop();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.getStatusUrl = function (baseUrl, artifactype, operationId) {
        var url = this.getCommonPath(baseUrl, artifactype);
        return url + "/operationResults/".concat(operationId, "?").concat(this.apiVersion);
    };
    ArtifactClient.prototype.buildArtifactUrl = function (baseUrl, artifactype, artifactNameValue) {
        var url = this.getCommonPath(baseUrl, artifactype);
        while (artifactNameValue.indexOf(' ') > -1)
            artifactNameValue = artifactNameValue.replace(' ', '%20');
        if (artifactype == "".concat(artifacts_enum_1.Artifact.managedprivateendpoints, "s")) {
            return url + "/".concat(artifacts_enum_1.Artifact.managedprivateendpoints, "/").concat(artifactNameValue, "?").concat(this.apiVersion);
        }
        var version = (artifactype === "".concat(artifacts_enum_1.Artifact.database, "s")) ? this.symsApiVersion : this.apiVersion;
        return url + "/".concat(artifactype, "/").concat(artifactNameValue, "?").concat(version);
    };
    ArtifactClient.prototype.getCommonPath = function (baseUrl, artifactype) {
        var url;
        if (artifactype === "".concat(artifacts_enum_1.Artifact.integrationruntime, "s")) {
            url = "".concat(baseUrl, "/subscriptions/").concat(this.params.subscriptionId, "/resourceGroups/").concat(this.params.resourceGroup);
            url = url + "/providers/Microsoft.Synapse/workspaces/".concat(core.getInput('TargetWorkspaceName'));
        }
        else if (artifactype === artifacts_enum_1.Artifact.managedprivateendpoints || artifactype == "".concat(artifacts_enum_1.Artifact.managedprivateendpoints, "s")) {
            url = baseUrl + "/" + artifacts_enum_1.Artifact.managedvirtualnetworks + "/default";
        }
        else {
            url = "".concat(baseUrl);
        }
        return url;
    };
    ArtifactClient.prototype.deployCredential = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.credential.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("Credential deployment failed " + JSON.stringify(err_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployIntegrationruntime = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var params, base_url, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, deploy_utils_1.getParams)()];
                    case 1:
                        params = _a.sent();
                        token = params.bearer;
                        base_url = params.resourceManagerEndpointUrl;
                        base_url = base_url.substr(0, base_url.length - 1);
                        return [4 /*yield*/, this.artifactDeploymentTask(base_url, "".concat(artifacts_enum_1.Artifact.integrationruntime.toString(), "s"), payload, token)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Integration runtime deployment failed " + JSON.stringify(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployKqlScript = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.kqlScript.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_3 = _a.sent();
                        logger_1.SystemLogger.info(JSON.stringify(err_3));
                        throw new Error("KqlScript deployment failed " + JSON.stringify(err_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployLinkedservice = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.linkedservice.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_4 = _a.sent();
                        throw new Error("Linked service deployment failed " + JSON.stringify(err_4));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployTrigger = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.trigger.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_5 = _a.sent();
                        throw new Error("Trigger deployment failed " + JSON.stringify(err_5));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployDataflow = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.dataflow.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_6 = _a.sent();
                        throw new Error("Data flow deployment failed " + JSON.stringify(err_6));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployPipeline = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.pipeline.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_7 = _a.sent();
                        throw new Error("Data set deployment failed " + JSON.stringify(err_7));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployDataset = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.dataset.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_8 = _a.sent();
                        throw new Error("Data set deployment failed " + JSON.stringify(err_8));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deploySqlScript = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.sqlscript.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_9 = _a.sent();
                        throw new Error("SQL script deployment status " + JSON.stringify(err_9));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployNotebook = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.notebook.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_10 = _a.sent();
                        throw new Error("Notebook deployment status " + JSON.stringify(err_10));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deploySparkJobDefinition = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.sparkjobdefinition.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_11 = _a.sent();
                        throw new Error("SparkJobDefination deployment status " + JSON.stringify(err_11));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployManagedPrivateEndpoint = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var payLoadJson, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payLoadJson = JSON.parse(payload.content);
                        if (payLoadJson["properties"].hasOwnProperty("fqdns")) {
                            delete payLoadJson["properties"]["fqdns"];
                        }
                        payload.content = JSON.stringify(payLoadJson);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.managedprivateendpoints.toString()), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_12 = _a.sent();
                        throw new Error("ManagedPrivateEndpoint deployment status " + JSON.stringify(err_12));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deployDatabase = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactsGroupDeploymentTask(baseUrl, payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_13 = _a.sent();
                        console.log(err_13);
                        throw new Error("Database deployment failed " + JSON.stringify(err_13));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.deploySparkConfiguration = function (baseUrl, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.artifactDeploymentTask(baseUrl, "".concat(artifacts_enum_1.Artifact.sparkconfiguration.toString(), "s"), payload, token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_14 = _a.sent();
                        console.log(err_14);
                        throw new Error("Spark Configuration deployment failed " + JSON.stringify(err_14));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.artifactsGroupDeploymentTask = function (baseUrl, payloadObj, token) {
        return __awaiter(this, void 0, void 0, function () {
            var jsonContent, _loop_1, this_1, _i, _a, ddl, err_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        jsonContent = JSON.parse(payloadObj.content);
                        _loop_1 = function (ddl) {
                            var artifact, url, type, dbName;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        artifact = { 'properties': ddl['NewEntity'] };
                                        artifact['name'] = ddl['NewEntity']['Name'];
                                        artifact['type'] = ddl['NewEntity']['EntityType'];
                                        delete ddl['NewEntity']['Name'];
                                        delete ddl['NewEntity']['EntityType'];
                                        url = "";
                                        if (artifact['type'].toLowerCase() == 'database') {
                                            url = "".concat(baseUrl, "/databases/").concat(artifact['name']);
                                        }
                                        else {
                                            type = artifact['type'].toLowerCase() + 's';
                                            dbName = artifact['properties']['Namespace']['DatabaseName'];
                                            url = "".concat(baseUrl, "/databases/").concat(dbName, "/").concat(type, "/").concat(artifact['name']);
                                        }
                                        if (artifact['type'].toLowerCase() == 'relationship') {
                                            if (!artifact['properties'].hasOwnProperty('RelationshipType')) {
                                                artifact['properties']['RelationshipType'] = 0;
                                            }
                                        }
                                        url = encodeURI(url) + "?".concat(this_1.symsApiVersion);
                                        return [4 /*yield*/, this_1.client.put(url, JSON.stringify(artifact), this_1.getHeaders(token)).then(function (res) {
                                                var resStatus = res.message.statusCode;
                                                console.log("For Artifact: ".concat(artifact['name'], " of type ").concat(artifact['type'], ": ArtifactDeploymentTask status: ").concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                                                try {
                                                    if (resStatus != 200 && resStatus != 201 && resStatus != 202) {
                                                        res.readBody().then(function (body) {
                                                            if (!!body) {
                                                                console.log("For Artifact: ".concat(artifact['name'], " of type ").concat(artifact['type'], " deployment failed : ").concat(body));
                                                            }
                                                        });
                                                        throw new Error(deploy_utils_1.DeployStatus.failed);
                                                    }
                                                    console.log("For Artifact: ".concat(artifact['name'], " of type ").concat(artifact['type'], " deployment successful."));
                                                }
                                                catch (err) {
                                                    throw err;
                                                }
                                            })];
                                    case 1:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = jsonContent['properties']['Ddls'];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        ddl = _a[_i];
                        return [5 /*yield**/, _loop_1(ddl)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        ;
                        return [2 /*return*/, (0, q_1.resolve)(deploy_utils_1.DeployStatus.success)];
                    case 5:
                        err_15 = _b.sent();
                        throw err_15;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.artifactDeploymentTask = function (baseUrl, resourceType, payloadObj, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var url, payload;
                        var _this = this;
                        return __generator(this, function (_a) {
                            url = this.buildArtifactUrl(baseUrl, resourceType, payloadObj.name);
                            payload = payloadObj.content;
                            this.client.put(url, payload, this.getHeaders(token)).then(function (res) {
                                var resStatus = res.message.statusCode;
                                logger_1.SystemLogger.info("For Artifact: ".concat(payloadObj.name, ": ArtifactDeploymentTask status: ").concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                                if (resStatus != 200 && resStatus != 201 && resStatus != 202) {
                                    res.readBody().then(function (body) {
                                        if (!!body) {
                                            var responseJson = JSON.parse(body);
                                            logger_1.SystemLogger.info("Deploy artifact failed: " + JSON.stringify(responseJson));
                                        }
                                    });
                                    return reject(deploy_utils_1.DeployStatus.failed);
                                }
                                var location = res.message.headers.location;
                                res.readBody().then(function (body) { return __awaiter(_this, void 0, void 0, function () {
                                    var responseJson, operationId, deploymentTrackingRequest, status_1, deploymentTrackingRequest;
                                    return __generator(this, function (_a) {
                                        responseJson = JSON.parse(body);
                                        operationId = responseJson['operationId'];
                                        if (!!operationId) {
                                            try {
                                                if (!location) {
                                                    location = this.getStatusUrl(baseUrl, resourceType, operationId);
                                                }
                                                deploymentTrackingRequest = {
                                                    url: location,
                                                    name: payloadObj.name,
                                                    token: token
                                                };
                                                this.deploymentTrackingRequests.push(deploymentTrackingRequest);
                                            }
                                            catch (err) {
                                                logger_1.SystemLogger.info("For Artifact: ".concat(payloadObj.name, ": Deployment failed with error: ").concat(JSON.stringify(err)));
                                                return [2 /*return*/, reject(deploy_utils_1.DeployStatus.failed)];
                                            }
                                            return [2 /*return*/, resolve(deploy_utils_1.DeployStatus.success)];
                                        }
                                        else {
                                            if (resourceType == artifacts_enum_1.Artifact.managedprivateendpoints) {
                                                status_1 = responseJson['properties']['provisioningState'];
                                                if (status_1 == "Succeeded") {
                                                    return [2 /*return*/, resolve(deploy_utils_1.DeployStatus.success)];
                                                }
                                                if (status_1 == "Provisioning") {
                                                    deploymentTrackingRequest = {
                                                        url: url,
                                                        name: payloadObj.name,
                                                        token: token
                                                    };
                                                    this.deploymentTrackingRequests.push(deploymentTrackingRequest);
                                                    return [2 /*return*/, resolve(deploy_utils_1.DeployStatus.success)];
                                                }
                                            }
                                            return [2 /*return*/, reject(deploy_utils_1.DeployStatus.failed)];
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            }, function (reason) {
                                logger_1.SystemLogger.info("For Artifact: ".concat(payloadObj.name, ": Artifact Deployment failed: ").concat(reason));
                                return reject(deploy_utils_1.DeployStatus.failed);
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ArtifactClient.prototype.artifactDeletionTask = function (baseUrl, resourceType, payloadObj, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var url;
                        var _this = this;
                        return __generator(this, function (_a) {
                            url = this.buildArtifactUrl(baseUrl, "".concat(resourceType, "s"), payloadObj.name);
                            this.client.del(url, this.getHeaders(token)).then(function (res) {
                                var resStatus = res.message.statusCode;
                                logger_1.SystemLogger.info("For Artifact: ".concat(payloadObj.name, ": ArtifactDeletionTask status: ").concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                                if (resStatus != 200 && resStatus != 201 && resStatus != 202) {
                                    return reject(deploy_utils_1.DeployStatus.failed);
                                }
                                if (resourceType != artifacts_enum_1.Artifact.managedprivateendpoints) {
                                    var location = res.message.headers.location;
                                    if (!!location) {
                                        var deploymentTrackingRequest = {
                                            url: location,
                                            name: payloadObj.name,
                                            token: token
                                        };
                                        _this.deploymentTrackingRequests.push(deploymentTrackingRequest);
                                    }
                                }
                                return resolve(deploy_utils_1.DeployStatus.success);
                            }, function (reason) {
                                logger_1.SystemLogger.info("Artifact Delete failed: " + reason);
                                return reject(deploy_utils_1.DeployStatus.failed);
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ArtifactClient.prototype.checkStatus = function (url, name, token) {
        return __awaiter(this, void 0, void 0, function () {
            var timeout, delayMilliSecs, currentTime, artifactName, res, resStatus, body, msg, response, responseJson, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timeout = new Date().getTime() + (60000 * 20);
                        delayMilliSecs = 30000;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 9];
                        currentTime = new Date().getTime();
                        if (timeout < currentTime) {
                            logger_1.SystemLogger.info('Current time: ' + currentTime);
                            throw new Error("Timeout error in checkStatus");
                        }
                        artifactName = '';
                        return [4 /*yield*/, this.client.get(url, this.getHeaders(token))];
                    case 2:
                        res = _a.sent();
                        resStatus = res.message.statusCode;
                        return [4 /*yield*/, res.readBody()];
                    case 3:
                        body = _a.sent();
                        logger_1.SystemLogger.info("For artifact: ".concat(name, ": Checkstatus: ").concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                        if (resStatus != 200 && resStatus != 201 && resStatus != 202) {
                            msg = res.message.statusMessage;
                            response = JSON.parse(body);
                            if (body != null && response.error != null && response.error.message != null) {
                                msg = response.error.message;
                            }
                            throw new Error("Checkstatus => status: ".concat(resStatus, "; status message: ").concat(msg));
                        }
                        if (!!body) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.delay(delayMilliSecs)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 5:
                        responseJson = JSON.parse(body);
                        status = responseJson['status'];
                        if (!(!!status && status == 'Failed')) return [3 /*break*/, 6];
                        logger_1.SystemLogger.info("For artifact: ".concat(name, ": Artifact Deployment status: ").concat(status));
                        throw new Error("Failed to fetch the deployment status ".concat(JSON.stringify(responseJson['error'])));
                    case 6:
                        if (!(!!status && (status == 'InProgress' || status == 'Accepted'))) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.delay(delayMilliSecs)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 8:
                        artifactName = responseJson['name'];
                        if (artifactName === name || status === "Succeeded") {
                            logger_1.SystemLogger.info("Artifact ".concat(name, " deployed successfully."));
                            return [3 /*break*/, 9];
                        }
                        else {
                            throw new Error("Artifact deployment validation failed : ".concat(body));
                        }
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.checkStatusForDelete = function (url, name, token) {
        return __awaiter(this, void 0, void 0, function () {
            var timeout, delayMilliSecs, currentTime, nbName, res, resStatus, body, bodyObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timeout = new Date().getTime() + (60000 * 20);
                        delayMilliSecs = 30000;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 6];
                        currentTime = new Date().getTime();
                        if (timeout < currentTime) {
                            logger_1.SystemLogger.info("Current time: ' ".concat(currentTime));
                            throw new Error("Timeout error in checkStatus");
                        }
                        nbName = '';
                        return [4 /*yield*/, this.client.get(url, this.getHeaders(token))];
                    case 2:
                        res = _a.sent();
                        resStatus = res.message.statusCode;
                        return [4 /*yield*/, res.readBody()];
                    case 3:
                        body = _a.sent();
                        if (body.trim() != "") {
                            bodyObj = JSON.parse(body);
                            if (bodyObj["status"].toLowerCase() == "failed") {
                                logger_1.SystemLogger.info(bodyObj["error"]["message"]);
                                throw new Error("For Artifact: ".concat(name, " deletion failed. ").concat(JSON.stringify(bodyObj)));
                            }
                        }
                        logger_1.SystemLogger.info("For Artifact: ".concat(name, ": Checkstatus: ").concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                        if (!(resStatus != 200 && resStatus < 203)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.delay(delayMilliSecs)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ArtifactClient.prototype.delay = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    ArtifactClient.prototype.getHeaders = function (token) {
        var _a;
        var headers = {
            'Authorization': "Bearer ".concat(token),
            'Content-Type': 'application/json',
            'User-Agent': (_a = this.client.userAgent) === null || _a === void 0 ? void 0 : _a.toString()
        };
        return headers;
    };
    ArtifactClient.prototype.getAudienceUrl = function (env) {
        switch (env) {
            case deploy_utils_1.Env.prod.toString():
                return "https://dev.azuresynapse.net";
            case deploy_utils_1.Env.mooncake.toString():
                return "https://dev.azuresynapse.azure.cn";
            case deploy_utils_1.Env.usnat.toString():
                return "https://dev.azuresynapse.usgovcloudapi.net";
            default:
                throw new Error('Environment validation failed. Valid choice are Azure Public, Azure China and Azure US Government');
        }
    };
    ArtifactClient.prototype.getBaseurl = function (workspace, environment, resourceType) {
        return ArtifactClient.getUrlByEnvironment(workspace, environment);
    };
    ArtifactClient.getUrlByEnvironment = function (workspace, environment) {
        switch (environment) {
            case deploy_utils_1.Env.prod.toString():
                return "https://".concat(workspace, ".dev.azuresynapse.net");
            case deploy_utils_1.Env.mooncake.toString():
                return "https://".concat(workspace, ".dev.azuresynapse.azure.cn");
            case deploy_utils_1.Env.usnat.toString():
                return "https://".concat(workspace, ".dev.azuresynapse.usgovcloudapi.net");
            default:
                throw new Error('Environment validation failed. Valid choice are Azure Public, Azure China and Azure US Government');
        }
    };
    return ArtifactClient;
}());
exports.ArtifactClient = ArtifactClient;
