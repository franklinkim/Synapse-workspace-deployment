"use strict";
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
exports.SKipManagedPE = exports.getDependentsFromArtifactFromWorkspace = exports.getArtifactsToDeleteFromWorkspaceInOrder = exports.DatalakeSubArtifactsToDelete = exports.getArtifactsToDeleteFromWorkspace = exports.getArtifactsFromWorkspace = exports.getArtifactsFromWorkspaceOfType = void 0;
var artifacts_client_1 = require("../clients/artifacts_client");
var deployUtils = __importStar(require("./deploy_utils"));
var httpClient = __importStar(require("typed-rest-client/HttpClient"));
var arm_template_utils_1 = require("./arm_template_utils");
var artifacts_enum_1 = require("./artifacts_enum");
var logger_1 = require("./logger");
var common_utils_1 = require("./common_utils");
var userAgent = 'synapse-github-cicd-deploy-task';
var requestOptions = {};
var client = new httpClient.HttpClient(userAgent, undefined, requestOptions);
var artifactTypesToQuery = [
    artifacts_enum_1.Artifact.credential,
    artifacts_enum_1.Artifact.dataflow,
    artifacts_enum_1.Artifact.dataset,
    artifacts_enum_1.Artifact.integrationruntime,
    artifacts_enum_1.Artifact.linkedservice,
    artifacts_enum_1.Artifact.notebook,
    artifacts_enum_1.Artifact.pipeline,
    artifacts_enum_1.Artifact.sparkjobdefinition,
    artifacts_enum_1.Artifact.sqlscript,
    artifacts_enum_1.Artifact.trigger,
    artifacts_enum_1.Artifact.managedprivateendpoints,
    artifacts_enum_1.Artifact.database,
    artifacts_enum_1.Artifact.kqlScript,
    artifacts_enum_1.Artifact.sparkconfiguration
];
function getArtifactsFromWorkspaceOfType(artifactTypeToQuery, targetWorkspaceName, environment) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var params, token, headers, artifacts, resourceUrl, moreResult, resp, resourcesString, resourcesJson, list, _i, list_1, artifactJson, artifactJsonContent, artifactName, type, resource;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, deployUtils.getParams(true, environment)];
                case 1:
                    params = _d.sent();
                    token = params.bearer;
                    headers = {
                        'Authorization': "Bearer ".concat(token),
                        'Content-Type': 'application/json',
                        'User-Agent': userAgent
                    };
                    artifacts = new Array();
                    resourceUrl = getResourceFromWorkspaceUrl(targetWorkspaceName, environment, artifactTypeToQuery.toString());
                    moreResult = true;
                    _d.label = 2;
                case 2:
                    if (!moreResult) return [3 /*break*/, 4];
                    resp = new Promise(function (resolve, reject) {
                        client.get(resourceUrl, headers).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var resStatus, body;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        resStatus = res.message.statusCode;
                                        if (resStatus != 200 && resStatus != 201 && resStatus != 202) {
                                            logger_1.SystemLogger.info("Failed to fetch workspace info, status: ".concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                                            return [2 /*return*/, reject("Failed to fetch workspace info " + res.message.statusMessage)];
                                        }
                                        return [4 /*yield*/, res.readBody()];
                                    case 1:
                                        body = _a.sent();
                                        if (!body) {
                                            logger_1.SystemLogger.info("No response body for url: " + resourceUrl);
                                            return [2 /*return*/, reject("Failed to fetch workspace info response")];
                                        }
                                        return [2 /*return*/, resolve(body)];
                                }
                            });
                        }); }, function (reason) {
                            logger_1.SystemLogger.info('Failed to fetch artifacts from workspace: ' + reason);
                            return reject(deployUtils.DeployStatus.failed);
                        });
                    });
                    return [4 /*yield*/, resp];
                case 3:
                    resourcesString = _d.sent();
                    resourcesJson = JSON.parse(resourcesString);
                    list = (_a = resourcesJson.value) !== null && _a !== void 0 ? _a : resourcesJson === null || resourcesJson === void 0 ? void 0 : resourcesJson.items;
                    moreResult = false;
                    for (_i = 0, list_1 = list; _i < list_1.length; _i++) {
                        artifactJson = list_1[_i];
                        artifactJsonContent = JSON.stringify(artifactJson);
                        artifactName = (_b = artifactJson.name) !== null && _b !== void 0 ? _b : artifactJson.Name;
                        type = (_c = artifactJson.type) !== null && _c !== void 0 ? _c : ((artifactJson.EntityType === 'DATABASE') ? artifacts_enum_1.DataFactoryType.database : artifactJson.EntityType);
                        if (type == artifacts_enum_1.DataFactoryType.database && SkipDatabase(artifactJsonContent))
                            continue;
                        resource = {
                            type: type,
                            isDefault: false,
                            content: artifactJsonContent,
                            name: artifactName,
                            dependson: getDependentsFromArtifactFromWorkspace(artifactJsonContent)
                        };
                        if (type !== artifacts_enum_1.DataFactoryType.database && (0, common_utils_1.isDefaultArtifact)(artifactJsonContent)) {
                            resource.isDefault = true;
                        }
                        artifacts.push(resource);
                        if (resourcesJson.hasOwnProperty("nextLink")) {
                            resourceUrl = resourcesJson.nextLink;
                            moreResult = true;
                        }
                        if (type == artifacts_enum_1.DataFactoryType.database && resourcesJson.hasOwnProperty("continuationToken")) {
                            resourceUrl = resourcesJson.ContinuationToken;
                            moreResult = true;
                        }
                    }
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/, artifacts];
            }
        });
    });
}
exports.getArtifactsFromWorkspaceOfType = getArtifactsFromWorkspaceOfType;
function getArtifactsFromWorkspace(targetWorkspaceName, environment) {
    return __awaiter(this, void 0, void 0, function () {
        var artifacts, x, _a, artifactsOfType;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.SystemLogger.info("Getting Artifacts from workspace: ".concat(targetWorkspaceName, "."));
                    artifacts = new Array();
                    x = 0;
                    _b.label = 1;
                case 1:
                    if (!(x < artifactTypesToQuery.length)) return [3 /*break*/, 6];
                    _a = artifactTypesToQuery[x] == artifacts_enum_1.Artifact.managedprivateendpoints;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, SKipManagedPE(targetWorkspaceName, environment)];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    if (_a)
                        return [3 /*break*/, 5];
                    return [4 /*yield*/, getArtifactsFromWorkspaceOfType(artifactTypesToQuery[x], targetWorkspaceName, environment)];
                case 4:
                    artifactsOfType = _b.sent();
                    artifactsOfType.forEach(function (value) {
                        artifacts.push(value);
                    });
                    _b.label = 5;
                case 5:
                    x++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, artifacts];
            }
        });
    });
}
exports.getArtifactsFromWorkspace = getArtifactsFromWorkspace;
function getArtifactsToDeleteFromWorkspace(artifactsInWorkspace, artifactsToDeploy, typeMap) {
    logger_1.SystemLogger.info("Getting Artifacts which should be deleted from workspace.");
    var artifactsToDelete = new Array();
    var resourceFound = true;
    artifactsInWorkspace.forEach(function (checkResource) {
        resourceFound = false;
        var checkResourceType = checkResource.type;
        checkResourceType = checkResourceType.replace(" ", "");
        checkResourceType = checkResourceType.toLowerCase();
        var artifactTypeToDeploy = typeMap.get(checkResourceType);
        if (artifactTypeToDeploy != artifacts_enum_1.Artifact.sqlpool &&
            artifactTypeToDeploy != artifacts_enum_1.Artifact.bigdatapools &&
            artifactTypeToDeploy != artifacts_enum_1.Artifact.managedvirtualnetworks &&
            artifactTypeToDeploy != artifacts_enum_1.Artifact.integrationruntime &&
            checkResource.isDefault != true) {
            for (var i = 0; i < artifactsToDeploy.length; i++) {
                for (var j = 0; j < artifactsToDeploy[i].length; j++) {
                    var resouce = artifactsToDeploy[i][j];
                    if (resouce.name.toLowerCase() == checkResource.name.toLowerCase() &&
                        resouce.type.toLowerCase() == checkResource.type.toLowerCase()) {
                        resourceFound = true;
                        break;
                    }
                }
                if (resourceFound) {
                    break;
                }
            }
            if (!resourceFound) {
                logger_1.SystemLogger.info("Artifact not found in template. deleting ".concat(checkResource.name, " of type ").concat(checkResource.type));
                artifactsToDelete.push(checkResource);
            }
        }
    });
    return artifactsToDelete;
}
exports.getArtifactsToDeleteFromWorkspace = getArtifactsToDeleteFromWorkspace;
function DatalakeSubArtifactsToDelete(artifactsInWorkspace, artifactsToDeploy, targetWorkspaceName, environment) {
    return __awaiter(this, void 0, void 0, function () {
        var artifactsToDelete, databases, databaseWithChildren, tables, relation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    artifactsToDelete = new Array();
                    return [4 /*yield*/, getArtifactsFromWorkspaceOfType(artifacts_enum_1.Artifact.database, targetWorkspaceName, environment)];
                case 1:
                    databases = _a.sent();
                    return [4 /*yield*/, GetDatabasesWithChildren(databases, targetWorkspaceName, environment)];
                case 2:
                    databaseWithChildren = _a.sent();
                    tables = new Array();
                    relation = new Array();
                    databaseWithChildren.forEach(function (wsArtifact) {
                        var dbFound = false;
                        outer: for (var i = 0; i < artifactsToDeploy.length; i++) {
                            for (var j = 0; j < artifactsToDeploy[i].length; j++) {
                                var resource = artifactsToDeploy[i][j];
                                var templateResourceObj = JSON.parse(resource.content);
                                // Same Database both in template and workspace.
                                // Now check if there are any missing tables/relationships.
                                if (resource.name.toLowerCase() == wsArtifact.name.toLowerCase() &&
                                    resource.type.toLowerCase() == artifacts_enum_1.DataFactoryType.database.toLowerCase()) {
                                    dbFound = true;
                                    for (var _i = 0, _a = wsArtifact.children; _i < _a.length; _i++) {
                                        var wsDdl = _a[_i];
                                        var dbSubResourceFound = false;
                                        for (var _b = 0, _c = templateResourceObj['properties']['Ddls']; _b < _c.length; _b++) {
                                            var templateDdl = _c[_b];
                                            if (wsDdl.name == templateDdl["NewEntity"]["Name"]) {
                                                dbSubResourceFound = true;
                                                break;
                                            }
                                        }
                                        if (!dbSubResourceFound) {
                                            if (wsDdl.type.toLowerCase() == 'table') {
                                                var path = "databases/".concat(wsArtifact.name, "/tables/").concat(wsDdl.name);
                                                tables.push(path);
                                            }
                                            if (wsDdl.type.toLowerCase() == 'relationship') {
                                                var path = "databases/".concat(wsArtifact.name, "/relationships/").concat(wsDdl.name);
                                                relation.push(path);
                                            }
                                        }
                                    }
                                }
                                if (dbFound) {
                                    break outer;
                                }
                            }
                        }
                    });
                    artifactsToDelete = artifactsToDelete.concat(relation);
                    artifactsToDelete = artifactsToDelete.concat(tables);
                    console.log("Found ".concat(artifactsToDelete.length, " lake database tables/relationships to delete."));
                    return [2 /*return*/, artifactsToDelete];
            }
        });
    });
}
exports.DatalakeSubArtifactsToDelete = DatalakeSubArtifactsToDelete;
function countOfArtifactDependancy(checkArtifact, selectedListOfResources) {
    var result = 0;
    for (var res = 0; res < selectedListOfResources.length; res++) {
        var resource = selectedListOfResources[res];
        var resName = checkArtifact.name;
        var restype = checkArtifact.type;
        if (restype.indexOf("Microsoft.Synapse/workspaces/") > -1) {
            restype = restype.substr("Microsoft.Synapse/workspaces/".length);
        }
        var nameToCheck = "".concat(restype.substring(0, restype.length - 1), "Reference/").concat(resName);
        nameToCheck = nameToCheck.toLowerCase();
        for (var i = 0; i < resource.dependson.length; i++) {
            if (resource.dependson[i].toLowerCase() == nameToCheck) {
                result++;
                break;
            }
        }
    }
    return result;
}
function getArtifactsToDeleteFromWorkspaceInOrder(artifactsToDelete) {
    logger_1.SystemLogger.info("Computing dependancies for Artifacts which should be deleted from workspace.");
    var artifactsBatches = new Array();
    var artifactBatch = new Array();
    var artifactsOrdered = new Array();
    // This will be a diff logic than the deploy one. We only need to check dependancy within the list.
    // If A is a dependency for B, C when B is in this list and C is not. We will delete A and then B.
    // This is the max times, we will go through the artifacts to look for dependancies. So this is the max level of dependancies supported.
    var MAX_ITERATIONS = 500;
    var MAX_PARALLEL_ARTIFACTS = 20;
    var count = 0;
    var iteration = 0;
    while (count < artifactsToDelete.length && iteration < MAX_ITERATIONS) {
        iteration++;
        if (artifactBatch.length > 0) {
            artifactsBatches.push(artifactBatch);
            artifactBatch = new Array();
        }
        for (var res = 0; res < artifactsToDelete.length; res++) {
            if ((0, arm_template_utils_1.checkIfArtifactExists)(artifactsToDelete[res], artifactsOrdered)) {
                // So this artifact is already added to the ordered list. Skip.
                continue;
            }
            var allDependencyMet = false;
            // check if, in all other artifacts being deleted, something depends on this artifact
            //its ok if not at all or if it is in artifactsOrdered, but not in artifactBatch
            var dependencyInArtifactsToDelete = countOfArtifactDependancy(artifactsToDelete[res], artifactsToDelete);
            var dependencyInArtifactsOrdered = countOfArtifactDependancy(artifactsToDelete[res], artifactsOrdered);
            var dependancyInCurrentBatch = countOfArtifactDependancy(artifactsToDelete[res], artifactBatch);
            if (dependencyInArtifactsToDelete == 0) {
                //nothing in the delete list depends on it
                allDependencyMet = true;
            }
            else if (dependancyInCurrentBatch == 0 && dependencyInArtifactsOrdered == dependencyInArtifactsToDelete) {
                allDependencyMet = true;
            }
            if (allDependencyMet) {
                // Adding to the ordered list as all dependancies are already in the list
                artifactsOrdered.push(artifactsToDelete[res]);
                if (artifactBatch.length >= MAX_PARALLEL_ARTIFACTS) {
                    artifactsBatches.push(artifactBatch);
                    artifactBatch = new Array();
                }
                artifactBatch.push(artifactsToDelete[res]);
            }
        }
        logger_1.SystemLogger.info("Iteration ".concat(iteration, " Figured out deletion order for ").concat(artifactsOrdered.length, " / ").concat(artifactsToDelete.length, " Artifacts for Dependancies."));
        count = artifactsOrdered.length;
    }
    if (artifactBatch.length > 0) {
        artifactsBatches.push(artifactBatch);
    }
    if (iteration == MAX_ITERATIONS) {
        logger_1.SystemLogger.info("Could not figure out full dependancy model for these artifact for delete. Check template and target workspace for correctness.");
        logger_1.SystemLogger.info("-----------------------------------------------------------------------------------------------");
        for (var res = 0; res < artifactsToDelete.length; res++) {
            if (!(0, arm_template_utils_1.checkIfArtifactExists)(artifactsToDelete[res], artifactsOrdered)) {
                // So this artifact's dependancy could not be verified.
                logger_1.SystemLogger.info("Name: ".concat(artifactsToDelete[res].name, ", Type: ").concat(artifactsToDelete[res].type));
            }
        }
        throw new Error("Could not figure out full dependancy model for deleting artifacts not in template. For the list above, check the template to see which artifacts depends on them.");
    }
    return artifactsBatches;
}
exports.getArtifactsToDeleteFromWorkspaceInOrder = getArtifactsToDeleteFromWorkspaceInOrder;
function getResourceFromWorkspaceUrl(targetWorkspaceName, environment, resourceType) {
    var url = artifacts_client_1.ArtifactClient.getUrlByEnvironment(targetWorkspaceName, environment);
    if (resourceType == artifacts_enum_1.Artifact.managedprivateendpoints) {
        url = url + '/' + artifacts_enum_1.Artifact.managedvirtualnetworks + '/default';
        url = "".concat(url, "/").concat(resourceType, "?api-version=2019-06-01-preview");
    }
    else
        url = "".concat(url, "/").concat(resourceType, "s?api-version=2019-06-01-preview");
    return url;
}
// Gets the list of artifacts this artifact depends on.
function getDependentsFromArtifactFromWorkspace(artifactContent) {
    var dependants = new Array();
    crawlArtifacts(JSON.parse(artifactContent), dependants, "referenceName");
    return dependants;
}
exports.getDependentsFromArtifactFromWorkspace = getDependentsFromArtifactFromWorkspace;
function crawlArtifacts(artifactContent, dependants, key) {
    if (!artifactContent || typeof artifactContent !== "object") {
        return false;
    }
    var keys = Object.keys(artifactContent);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] === key) {
            // @ts-ignore
            var depType = artifactContent["type"];
            // @ts-ignore
            var depName = artifactContent["referenceName"];
            dependants.push("".concat(depType, "/").concat(depName));
        }
        // @ts-ignore
        var path = crawlArtifacts(artifactContent[keys[i]], dependants, key);
        if (path) {
            return true;
        }
    }
    return false;
}
function SKipManagedPE(targetWorkspaceName, environment) {
    return __awaiter(this, void 0, void 0, function () {
        var params, token, headers, resourceUrl, resp;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deployUtils.getParams(true, environment)];
                case 1:
                    params = _a.sent();
                    token = params.bearer;
                    headers = {
                        'Authorization': "Bearer ".concat(token),
                        'Content-Type': 'application/json',
                        'User-Agent': userAgent
                    };
                    resourceUrl = getResourceFromWorkspaceUrl(targetWorkspaceName, environment, artifacts_enum_1.Artifact.managedprivateendpoints);
                    resp = new Promise(function (resolve, reject) {
                        client.get(resourceUrl, headers).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var resStatus, body;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        resStatus = res.message.statusCode;
                                        if (!(resStatus != 200 && resStatus != 201 && resStatus != 202)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, res.readBody()];
                                    case 1:
                                        body = _a.sent();
                                        if (body.includes("does not have a managed virtual network associated"))
                                            return [2 /*return*/, resolve(true)];
                                        _a.label = 2;
                                    case 2: return [2 /*return*/, resolve(false)];
                                }
                            });
                        }); });
                    });
                    return [2 /*return*/, resp];
            }
        });
    });
}
exports.SKipManagedPE = SKipManagedPE;
function SkipDatabase(artifactJsonContent) {
    var artifactJson = JSON.parse(artifactJsonContent);
    if (artifactJson != null &&
        artifactJson["Origin"] != null &&
        artifactJson["Origin"]["Type"].toLowerCase() == "SPARK".toLowerCase() &&
        artifactJson["Properties"] != null &&
        artifactJson["Properties"]["IsSyMSCDMDatabase"] != null &&
        artifactJson["Properties"]["IsSyMSCDMDatabase"].toString().toLowerCase() == "true") {
        return false;
    }
    return true;
}
function GetDatabasesWithChildren(databases, targetWorkspaceName, environment) {
    return __awaiter(this, void 0, void 0, function () {
        var databasesWithChildren, _loop_1, _i, databases_1, db, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    databasesWithChildren = new Array();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    _loop_1 = function (db) {
                        var children, _loop_2, _b, _c, action, dbWithChildren;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    console.log("Fetching details of database: ".concat(db.name));
                                    children = new Array();
                                    _loop_2 = function (action) {
                                        var requestURI, fetchMore, params, token, headers;
                                        return __generator(this, function (_e) {
                                            switch (_e.label) {
                                                case 0:
                                                    requestURI = getResourceFromWorkspaceUrl(targetWorkspaceName, environment, "databases/".concat(db.name, "/").concat(action));
                                                    fetchMore = true;
                                                    _e.label = 1;
                                                case 1:
                                                    if (!fetchMore) return [3 /*break*/, 4];
                                                    fetchMore = false;
                                                    return [4 /*yield*/, deployUtils.getParams(true, environment)];
                                                case 2:
                                                    params = _e.sent();
                                                    token = params.bearer;
                                                    headers = {
                                                        'Authorization': "Bearer ".concat(token),
                                                        'Content-Type': 'application/json',
                                                        'User-Agent': userAgent
                                                    };
                                                    return [4 /*yield*/, client.get(requestURI, headers).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                            var resStatus, body_1, body, childrenObj, _i, childrenObj_1, child, childObj, bodyObj;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        resStatus = res.message.statusCode;
                                                                        if (!(resStatus != 200 && resStatus != 201 && resStatus != 202)) return [3 /*break*/, 2];
                                                                        console.info("Failed to fetch database ".concat(db.name, " info, status: ").concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                                                                        return [4 /*yield*/, res.readBody()];
                                                                    case 1:
                                                                        body_1 = _a.sent();
                                                                        throw new Error("Failed to fetch database info :" + body_1);
                                                                    case 2: return [4 /*yield*/, res.readBody()];
                                                                    case 3:
                                                                        body = _a.sent();
                                                                        childrenObj = JSON.parse(body)["items"];
                                                                        for (_i = 0, childrenObj_1 = childrenObj; _i < childrenObj_1.length; _i++) {
                                                                            child = childrenObj_1[_i];
                                                                            childObj = {
                                                                                name: child["Name"],
                                                                                type: action
                                                                            };
                                                                            children.push(childObj);
                                                                        }
                                                                        bodyObj = JSON.parse(body);
                                                                        if (bodyObj.hasOwnProperty('continuationToken')) {
                                                                            requestURI = bodyObj['continuationToken'];
                                                                            fetchMore = true;
                                                                        }
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); })];
                                                case 3:
                                                    _e.sent();
                                                    return [3 /*break*/, 1];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _b = 0, _c = ['relationship', 'table'];
                                    _d.label = 1;
                                case 1:
                                    if (!(_b < _c.length)) return [3 /*break*/, 4];
                                    action = _c[_b];
                                    return [5 /*yield**/, _loop_2(action)];
                                case 2:
                                    _d.sent();
                                    _d.label = 3;
                                case 3:
                                    _b++;
                                    return [3 /*break*/, 1];
                                case 4:
                                    dbWithChildren = {
                                        name: db.name,
                                        children: children
                                    };
                                    databasesWithChildren.push(dbWithChildren);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, databases_1 = databases;
                    _a.label = 2;
                case 2:
                    if (!(_i < databases_1.length)) return [3 /*break*/, 5];
                    db = databases_1[_i];
                    return [5 /*yield**/, _loop_1(db)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, databasesWithChildren];
                case 6:
                    err_1 = _a.sent();
                    throw new Error(err_1);
                case 7: return [2 /*return*/];
            }
        });
    });
}
