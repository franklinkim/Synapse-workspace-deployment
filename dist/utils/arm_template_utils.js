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
exports.getDependentsFromArtifact = exports.checkIfArtifactExists = exports.checkIfNameExists = exports.getArtifactsFromArmTemplate = exports.replaceStrByRegex = exports.findDefaultArtifacts = exports.replaceDoubleQuoteCode = exports.replaceBackSlashCode = exports.createArmTemplate = exports.getArtifacts = void 0;
var yaml = __importStar(require("js-yaml"));
var uuid_1 = require("uuid");
var logger_1 = require("./logger");
var common_utils_1 = require("./common_utils");
var artifacts_enum_1 = require("./artifacts_enum");
// Just 2 random Guids to replace backslash in parameters file.
var backslash = "7FD5C49AB6444AC1ACCD56B689067FBBAD85B74B0D8943CA887371839DFECF85";
var quote = "48C16896271D483C916DE1C4EC6F24DBC945F900F9AB464B828EC8005364D322";
var doublequote = "4467B65E39AA40998907771187C9B539847A7E801C5E4F0E9513C1D6154BC816";
function getArtifacts(armParams, armTemplate, overrideArmParameters, targetWorkspaceName, targetLocation) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultArtifacts;
        return __generator(this, function (_a) {
            armTemplate = createArmTemplate(armParams, armTemplate, overrideArmParameters, targetWorkspaceName);
            defaultArtifacts = findDefaultArtifacts(armTemplate, targetWorkspaceName);
            armTemplate = JSON.stringify(JSON.parse(armTemplate));
            return [2 /*return*/, getArtifactsFromArmTemplate(armTemplate, targetLocation, defaultArtifacts)];
        });
    });
}
exports.getArtifacts = getArtifacts;
function createArmTemplate(armParams, armTemplate, overrideArmParameters, targetWorkspaceName) {
    armParams = replaceBackSlash(armParams);
    overrideArmParameters = replaceBackSlash(overrideArmParameters);
    armTemplate = replaceParameters(armParams, armTemplate, overrideArmParameters, targetWorkspaceName);
    armTemplate = replaceVariables(armTemplate);
    armTemplate = replaceStrByRegex(armTemplate);
    return armTemplate;
}
exports.createArmTemplate = createArmTemplate;
function replaceBackSlashCode(inputString) {
    if (inputString == null) {
        return "";
    }
    var outputString = inputString;
    while (outputString.indexOf(quote) >= 0) {
        outputString = outputString.substr(0, outputString.indexOf(quote))
            + "\\\""
            + outputString.substr(outputString.indexOf(quote) + quote.length);
    }
    while (outputString.indexOf(backslash) >= 0) {
        outputString = outputString.substr(0, outputString.indexOf(backslash))
            + "\\"
            + outputString.substr(outputString.indexOf(backslash) + backslash.length);
    }
    return outputString;
}
exports.replaceBackSlashCode = replaceBackSlashCode;
function replaceBackSlash(inputString) {
    if (inputString == null || inputString == "") {
        return "";
    }
    var outputString = inputString;
    while (outputString.indexOf("\\\\\\\\") >= 0) {
        outputString = outputString.substr(0, outputString.indexOf("\\\\\\\\")) + backslash + backslash + backslash + backslash + outputString.substr(outputString.indexOf("\\\\\\\\") + 4);
    }
    while (outputString.indexOf("\\\\") >= 0) {
        outputString = outputString.substr(0, outputString.indexOf("\\\\")) + backslash + backslash + outputString.substr(outputString.indexOf("\\\\") + 2);
    }
    while (outputString.indexOf("\\\"") >= 0) {
        outputString = outputString.substr(0, outputString.indexOf("\\\"")) + quote + outputString.substr(outputString.indexOf("\\\"") + 2);
    }
    while (outputString.indexOf("\\") >= 0) {
        outputString = outputString.substr(0, outputString.indexOf("\\")) + backslash + outputString.substr(outputString.indexOf("\\") + 1);
    }
    return outputString;
}
function replaceDoubleQuoteCode(inputString) {
    if (inputString == null) {
        return "";
    }
    var outputString = inputString;
    while (outputString.indexOf(doublequote) >= 0) {
        outputString = outputString.substr(0, outputString.indexOf(doublequote))
            + "\""
            + outputString.substr(outputString.indexOf(doublequote) + doublequote.length);
    }
    return outputString;
}
exports.replaceDoubleQuoteCode = replaceDoubleQuoteCode;
function replaceDoubleQuote(inputString) {
    if (inputString == null || inputString == "") {
        return "";
    }
    var outputString = inputString;
    while (outputString.indexOf("\"") >= 0) {
        outputString = outputString.substr(0, outputString.indexOf("\"")) +
            doublequote +
            outputString.substr(outputString.indexOf("\"") + 1);
    }
    return outputString;
}
function findDefaultArtifacts(armTemplate, targetworkspace) {
    var defaultArtifacts = new Map();
    var jsonArmTemplateParams = JSON.parse(armTemplate);
    for (var value in jsonArmTemplateParams.resources) {
        var artifactJson = jsonArmTemplateParams.resources[value];
        var artifactName = artifactJson.name;
        if ((0, common_utils_1.isDefaultArtifact)(JSON.stringify(artifactJson))) {
            if (artifactName.indexOf("/") > 0) {
                //example `${targetworkspace}/sourceworkspace-WorkspaceDefaultStorage`;
                var lastIndexOfslash = artifactName.lastIndexOf("/");
                var nametoreplace = artifactName.substr(lastIndexOfslash + 1);
                // Extract source workspace name
                var defaultArtifactName = '';
                for (var i = 0; i < common_utils_1.DefaultArtifact.DefaultArtifacts.length; i++) {
                    var name_1 = common_utils_1.DefaultArtifact.DefaultArtifacts[i];
                    if (nametoreplace.toLowerCase().includes(name_1.name.toLowerCase())) {
                        defaultArtifactName = nametoreplace.substring(nametoreplace.toLowerCase().indexOf(name_1.name.toLowerCase()));
                        break;
                    }
                }
                var replacedName = defaultArtifactName == "WorkspaceSystemIdentity" ? defaultArtifactName : "".concat(targetworkspace, "-").concat(defaultArtifactName);
                if (nametoreplace == replacedName) {
                    // source and target workspace are same.
                    continue;
                }
                defaultArtifacts.set(nametoreplace, replacedName);
            }
        }
    }
    return defaultArtifacts;
}
exports.findDefaultArtifacts = findDefaultArtifacts;
function replaceParameters(armParams, armTemplate, overrideArmParameters, targetWorkspaceName) {
    logger_1.SystemLogger.info("Begin replacement of parameters in the template");
    // Build parameters
    var armParamValues = getParameterValuesFromArmTemplate(armParams, armTemplate, overrideArmParameters, targetWorkspaceName);
    armParamValues.forEach(function (value, key) {
        value = value.toString();
        if (value.indexOf("parameters") > -1) {
            armParamValues.forEach(function (valueInside, keyInside) {
                if (value.indexOf(keyInside) > -1) {
                    armParamValues.set(key, value.split('[' + keyInside + ']').join("'".concat(valueInside, "'")));
                }
                if (value.indexOf(keyInside) > -1) {
                    armParamValues.set(key, value.split(keyInside).join("'".concat(valueInside, "'")));
                }
            });
        }
    });
    armParamValues.forEach(function (value, key) {
        value = value.toString();
        if (value.indexOf("concat") > -1) {
            armParamValues.set(key, replaceStrByRegex(value));
        }
    });
    // Replace parameterValues
    armParamValues.forEach(function (value, key) {
        if (isJsonValue(replaceDoubleQuoteCode(value))) {
            armTemplate = armTemplate.split("\"[" + key + "]\"").join("".concat(replaceDoubleQuoteCode(value)));
        }
        else {
            armTemplate = armTemplate.split("\"[" + key + "]\"").join("\"".concat(replaceDoubleQuoteCode(value), "\""));
        }
        armTemplate = armTemplate.split(key).join("'".concat(replaceDoubleQuoteCode(value), "'"));
    });
    logger_1.SystemLogger.info("Complete replacement of parameters in the template");
    return armTemplate;
}
function isJsonValue(testString) {
    try {
        JSON.parse(testString);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function replaceVariables(armTemplate) {
    // Build variables
    logger_1.SystemLogger.info("Begin replacement of variables in the template");
    var jsonArmTemplateParams = JSON.parse(armTemplate);
    var armVariableValues = new Map();
    for (var value in jsonArmTemplateParams.variables) {
        var variableValue = jsonArmTemplateParams.variables[value];
        variableValue = replaceStrByRegex(variableValue);
        armVariableValues.set("variables('".concat(value, "')"), variableValue);
    }
    // Replace variables
    armVariableValues.forEach(function (value, key) {
        armTemplate = armTemplate.split(key).join("".concat(value));
    });
    logger_1.SystemLogger.info("Complete replacement of variables in the template");
    return armTemplate;
}
/*
    This function will replace variables like [concat('Microsoft.Synapse/workspaces/', 'workspaceName')]
    and convert it into [Microsoft.Synapse/workspaces/workspaceName]
 */
function replaceStrByRegex(str) {
    var regexOutside = /\[concat\((.*?)\)\]/g;
    var resultOutside = str.replace(regexOutside, function (matchedStr, strOutside) {
        var result = "";
        var resultArgs = strOutside.split(",");
        resultArgs.forEach(function (arg) {
            var fragment = arg.trim();
            if (fragment.endsWith("'")) {
                fragment = fragment.substring(1, fragment.length - 1);
            }
            result += fragment;
        });
        return result;
    });
    return resultOutside;
}
exports.replaceStrByRegex = replaceStrByRegex;
function getParameterValuesFromArmTemplate(armParams, armTemplate, overrideArmParameters, targetWorkspaceName) {
    // Parse the parameters and keep a map of these values
    var jsonArmParams = JSON.parse(armParams);
    var armParamValues = new Map();
    for (var value in jsonArmParams.parameters) {
        armParamValues.set("parameters('".concat(value, "')"), replaceDoubleQuote(sanitize(JSON.stringify(jsonArmParams.parameters[value].value))));
    }
    // Convert arm template to json, look at the default parameters if any and add missing ones to the map we have
    var jsonArmTemplateParams = JSON.parse(armTemplate);
    var armTemplateParamValues = new Map();
    for (var value in jsonArmTemplateParams.parameters) {
        armTemplateParamValues.set("parameters('".concat(value, "')"), replaceDoubleQuote(JSON.stringify(jsonArmTemplateParams.parameters[value].defaultValue)));
    }
    armTemplateParamValues.forEach(function (value, key) {
        if (!armParamValues.has(key)) {
            armParamValues.set("parameters('".concat(key, "')"), value);
        }
    });
    // add the target workspace name
    armParamValues.set("parameters('workspaceName')", targetWorkspaceName);
    // Add any overrides.-key1 value1 -key2 value2 -key3 value3
    // Checking length to be > 2 for someone to specify name value, space in between etc. just to be on safe side.
    if (overrideArmParameters != null && overrideArmParameters.length > 2) {
        var cnt = 1;
        if (overrideArmParameters.startsWith('-')) {
            while (overrideArmParameters.length > 0 && overrideArmParameters.indexOf('-') > -1 && overrideArmParameters.indexOf(' ') > -1 && cnt < 1000) {
                cnt = cnt + 1;
                var startIndex = overrideArmParameters.indexOf('-') + '-'.length;
                var endIndex = overrideArmParameters.indexOf(' ');
                var paramName = overrideArmParameters.substring(startIndex, endIndex).trim();
                overrideArmParameters = overrideArmParameters.substring(endIndex);
                startIndex = overrideArmParameters.indexOf(' ') + ' '.length;
                endIndex = overrideArmParameters.indexOf(' -', startIndex);
                if (endIndex == -1) {
                    endIndex = overrideArmParameters.length;
                }
                var paramValue = sanitize(overrideArmParameters.substring(startIndex, endIndex).trim());
                armParamValues.set("parameters('".concat(paramName, "')"), paramValue);
                overrideArmParameters = overrideArmParameters.substring(endIndex).trim();
            }
        }
        // Means user has give a yaml as input
        else {
            var overrides = yaml.load(overrideArmParameters);
            var overridesObj = JSON.parse(JSON.stringify(overrides));
            for (var key in overridesObj) {
                var paramValue = JSON.stringify(overridesObj[key]);
                armParamValues.set("parameters('".concat(key, "')"), sanitize(paramValue));
            }
        }
    }
    return armParamValues;
}
function sanitize(paramValue) {
    if ((paramValue.startsWith("\"") && paramValue.endsWith("\"")) ||
        (paramValue.startsWith("'") && paramValue.endsWith("'"))) {
        paramValue = paramValue.substr(1, paramValue.length - 2);
    }
    return paramValue;
}
function removeWorkspaceNameFromResourceName(resourceName) {
    while (resourceName.indexOf("/") >= 0) {
        resourceName = resourceName.substring(resourceName.indexOf("/") + 1);
    }
    return resourceName;
}
function skipArtifactDeployment(artifactType) {
    if (artifacts_enum_1.DataFactoryType.sqlpool == artifactType || artifacts_enum_1.DataFactoryType.bigdatapools == artifactType || artifacts_enum_1.DataFactoryType.managedVirtualNetworks == artifactType) {
        return true;
    }
    return false;
}
function getArtifactsFromArmTemplate(armTemplate, targetLocation, defaultArtifacts) {
    logger_1.SystemLogger.info("Begin getting Artifacts From Template");
    //now get the resources out:
    var jsonArmTemplateParams = JSON.parse(armTemplate);
    var artifacts = new Array();
    var _loop_1 = function (value) {
        var artifactJson = jsonArmTemplateParams.resources[value];
        var artifactType = artifactJson.type;
        if (skipArtifactDeployment(artifactType)) {
            return "continue";
        }
        if (artifactType.toLowerCase().indexOf("sparkjobdefinition") > -1) {
            var fileLocation = artifactJson['properties']['jobProperties']['file'];
            if (!fileLocation) {
                throw new Error("File is missing in spark job defination ");
            }
        }
        artifactJson.name = removeWorkspaceNameFromResourceName(artifactJson.name);
        var _loop_2 = function (i) {
            var dependancyName = artifactJson.dependsOn[i];
            defaultArtifacts.forEach(function (value, key) {
                if (dependancyName.indexOf(key) > -1 &&
                    dependancyName.indexOf("linkedServices") > -1) {
                    artifactJson.dependsOn[i] = artifactJson.dependsOn[i].replace(key, value);
                }
            });
        };
        for (var i = 0; i < artifactJson.dependsOn.length; i++) {
            _loop_2(i);
        }
        var artifactProperties = artifactJson.properties;
        if (artifactProperties != null) {
            var linkedServiceName = artifactProperties.linkedServiceName;
            if (linkedServiceName != null) {
                var referenceName_1 = linkedServiceName.referenceName;
                if (referenceName_1 != null) {
                    defaultArtifacts.forEach(function (value, key) {
                        if (referenceName_1.indexOf(key) > -1) {
                            artifactJson.properties.linkedServiceName.referenceName = artifactJson.properties.linkedServiceName.referenceName.replace(key, value);
                        }
                    });
                }
            }
        }
        for (var artifactJsonValue in artifactJson.properties) {
            if (artifactJsonValue != "typeProperties" ||
                JSON.stringify(artifactJson.properties.typeProperties).indexOf("LinkedServiceReference") == -1) {
                continue;
            }
            for (var artifactJsonTypeProperties in artifactJson.properties.typeProperties) {
                if (JSON.stringify(artifactJson.properties.typeProperties["".concat(artifactJsonTypeProperties)]).indexOf("LinkedServiceReference") == -1) {
                    continue;
                }
                var artifactJsonTypePropertiesJson = artifactJson.properties.typeProperties["".concat(artifactJsonTypeProperties)];
                for (var artifactJsonTypePropertiesValues in artifactJsonTypePropertiesJson) {
                    var artifactJsonTypePropertiesValueslinkedService = artifactJson.properties.typeProperties["".concat(artifactJsonTypeProperties)][artifactJsonTypePropertiesValues].linkedService;
                    if (artifactJsonTypePropertiesValueslinkedService == null) {
                        continue;
                    }
                    var artifactJsonTypePropertiesValueslinkedServiceType = artifactJson.properties.typeProperties["".concat(artifactJsonTypeProperties)][artifactJsonTypePropertiesValues].linkedService.type;
                    if (artifactJsonTypePropertiesValueslinkedServiceType == null) {
                        continue;
                    }
                    if (artifactJson.properties.typeProperties["".concat(artifactJsonTypeProperties)][artifactJsonTypePropertiesValues].linkedService.type
                        == "LinkedServiceReference") {
                        defaultArtifacts.forEach(function (value, key) {
                            if (artifactJson.properties.typeProperties["".concat(artifactJsonTypeProperties)][artifactJsonTypePropertiesValues].linkedService.referenceName.indexOf(key) > -1) {
                                artifactJson.properties.typeProperties["".concat(artifactJsonTypeProperties)][artifactJsonTypePropertiesValues].linkedService.referenceName
                                    = artifactJson.properties.typeProperties["".concat(artifactJsonTypeProperties)][artifactJsonTypePropertiesValues].linkedService.referenceName.replace(key, value);
                            }
                        });
                    }
                }
            }
        }
        var artifactJsonContent = JSON.stringify(artifactJson);
        defaultArtifacts.forEach(function (value, key) {
            var refName = "\"referenceName\":\"".concat(key, "\"");
            var refNameReplacement = "\"referenceName\":\"".concat(value, "\"");
            while (artifactJsonContent.indexOf(refName) > -1) {
                artifactJsonContent = artifactJsonContent.replace(refName, refNameReplacement);
            }
        });
        var resource = {
            type: artifactType,
            isDefault: false,
            content: artifactJsonContent,
            name: artifactJson.name,
            dependson: getDependentsFromArtifact(artifactJsonContent)
        };
        if (artifactType.toLowerCase().indexOf("notebook") > -1) {
            if (!artifactJson.name) {
                resource.content = convertIpynb2Payload(artifactJson);
            }
        }
        logger_1.SystemLogger.info("Found Artifact of type ".concat(artifactType));
        if ((0, common_utils_1.isDefaultArtifact)(JSON.stringify(artifactJson))) {
            resource.isDefault = true;
            defaultArtifacts.forEach(function (value, key) {
                resource.name = resource.name.replace(key, value);
            });
            logger_1.SystemLogger.info("\tWill be skipped as its a default resource.");
        }
        if (!checkIfArtifactExists(resource, artifacts)) {
            artifacts.push(resource);
        }
    };
    for (var value in jsonArmTemplateParams.resources) {
        _loop_1(value);
    }
    return createDependancyTree(artifacts);
}
exports.getArtifactsFromArmTemplate = getArtifactsFromArmTemplate;
function createDependancyTree(artifacts) {
    var artifactsOrdered = new Array();
    var artifactsBatches = new Array();
    var artifactBatch = new Array();
    var iteration = 0;
    for (var i = 0; i < artifacts.length; i++) {
        //Replace backslash with \
        artifacts[i].content = replaceDoubleQuoteCode(replaceBackSlashCode(artifacts[i].content));
        artifacts[i].name = replaceDoubleQuoteCode(replaceBackSlashCode(artifacts[i].name));
        for (var j = 0; j < artifacts[i].dependson.length; j++) {
            artifacts[i].dependson[j] = replaceDoubleQuoteCode(replaceBackSlashCode(artifacts[i].dependson[j]));
        }
    }
    // This is the max times, we will go through the artifacts to look for dependancies. So this is the max level of dependancies supported.
    var MAX_ITERATIONS = 500;
    var MAX_PARALLEL_ARTIFACTS = 20;
    while (artifactsOrdered.length < artifacts.length && iteration < MAX_ITERATIONS) {
        iteration++;
        if (artifactBatch.length > 0) {
            artifactsBatches.push(artifactBatch);
            artifactBatch = new Array();
        }
        var _loop_3 = function () {
            if (checkIfArtifactExists(artifacts[res], artifactsOrdered)) {
                return "continue";
            }
            var dependancies = artifacts[res].dependson;
            if (dependancies.length == 0) {
                // Adding to the ordered list as this artifact has no dependancies.
                artifactsOrdered.push(artifacts[res]);
                if (artifactBatch.length >= MAX_PARALLEL_ARTIFACTS) {
                    artifactsBatches.push(artifactBatch);
                    artifactBatch = new Array();
                }
                artifactBatch.push(artifacts[res]);
                return "continue";
            }
            var allDependencyMet = true;
            dependancies.forEach(function (dep) {
                if (!checkIfNameExists(dep, artifactsOrdered)) {
                    allDependencyMet = false;
                }
            });
            if (allDependencyMet) {
                // Adding to the ordered list as all dependencies are already in the list
                artifactsOrdered.push(artifacts[res]);
                if (artifactBatch.length >= MAX_PARALLEL_ARTIFACTS) {
                    artifactsBatches.push(artifactBatch);
                    artifactBatch = new Array();
                }
                artifactBatch.push(artifacts[res]);
            }
        };
        for (var res = 0; res < artifacts.length; res++) {
            _loop_3();
        }
        logger_1.SystemLogger.info("Iteration ".concat(iteration, " Figured out deployment order for ").concat(artifactsOrdered.length, " / ").concat(artifacts.length, " Artifacts for Dependencies."));
    }
    if (artifactBatch.length > 0) {
        artifactsBatches.push(artifactBatch);
    }
    if (iteration == MAX_ITERATIONS) {
        logger_1.SystemLogger.info("Could not figure out full dependancy model for these artifacts. Check template for correctness.");
        logger_1.SystemLogger.info("-----------------------------------------------------------------------------------------------");
        for (var res = 0; res < artifacts.length; res++) {
            if (!checkIfArtifactExists(artifacts[res], artifactsOrdered)) {
                // So this artifact's dependancy could not be verified.
                logger_1.SystemLogger.info("Name: ".concat(artifacts[res].name, ", Type: ").concat(artifacts[res].type));
                var dependancies = artifacts[res].dependson;
                dependancies.forEach(function (dep) {
                    if (!checkIfNameExists(dep, artifactsOrdered)) {
                        logger_1.SystemLogger.info("    Dependency Not found: ".concat(dep));
                    }
                });
            }
        }
        logger_1.SystemLogger.info("-----------------------------------------------------------------------------------------------");
        throw new Error("Could not figure out full dependancy model. Some dependancies may not exist in template.");
    }
    logger_1.SystemLogger.info("Complete getting Artifacts From Template");
    return artifactsBatches;
}
function convertIpynb2Payload(payloadObj) {
    logger_1.SystemLogger.info('Converting payload');
    var payload = {
        "name": (0, uuid_1.v4)(),
        "properties": {
            "nbformat": 4,
            "nbformat_minor": 2,
            "bigDataPool": {
                "referenceName": "testProd5",
                "type": "BigDataPoolReference"
            },
            "sessionProperties": {
                "driverMemory": "28g",
                "driverCores": 4,
                "executorMemory": "28g",
                "executorCores": 4,
                "numExecutors": 2
            },
            "metadata": payloadObj['metadata'],
            "cells": payloadObj['cells']
        }
    };
    return JSON.stringify(payload);
}
// Checks if the name provided is part of the artifacts list already in some form.
function checkIfNameExists(nameToCheck, selectedListOfResources) {
    if (nameToCheck.indexOf("/") != 0) {
        nameToCheck = "/" + nameToCheck;
    }
    if (nameToCheck.toLowerCase().indexOf("/managedvirtualnetworks/") > -1 ||
        nameToCheck.toLowerCase().indexOf("/sqlpools/") > -1 ||
        nameToCheck.toLowerCase().indexOf("/bigdatapools/") > -1 ||
        nameToCheck.toLowerCase().indexOf("/managedprivateendpoints/") > -1) {
        return true;
    }
    for (var res = 0; res < selectedListOfResources.length; res++) {
        var resource = selectedListOfResources[res];
        var resName = resource.name;
        var restype = resource.type;
        if (restype.indexOf("Microsoft.Synapse/workspaces/") > -1) {
            restype = restype.substr("Microsoft.Synapse/workspaces/".length);
        }
        // Check if name is same / the last part of the name including workspace etc.
        if (resName.toLowerCase() == nameToCheck.toLowerCase() ||
            (nameToCheck.toLowerCase().indexOf('/' + restype.toLowerCase() + '/' + resName.toLowerCase()) != -1 &&
                nameToCheck.toLowerCase().indexOf('/' + restype.toLowerCase() + '/' + resName.toLowerCase()) + restype.length + resName.length == nameToCheck.length - 2)) {
            return true;
        }
    }
    return false;
}
exports.checkIfNameExists = checkIfNameExists;
function checkIfArtifactExists(resourceToCheck, selectedListOfResources) {
    for (var res = 0; res < selectedListOfResources.length; res++) {
        var resource = selectedListOfResources[res];
        if (resource.name == resourceToCheck.name && resource.type == resourceToCheck.type) {
            return true;
        }
    }
    return false;
}
exports.checkIfArtifactExists = checkIfArtifactExists;
// Gets the list of artifacts this artifact depends on.
function getDependentsFromArtifact(artifactContent) {
    var dependants = new Array();
    var artifact = JSON.parse(artifactContent);
    if (artifactContent.indexOf("dependsOn") > -1 && artifact["dependsOn"] != null) {
        artifact["dependsOn"].forEach(function (x) {
            dependants.push(x);
        });
    }
    return dependants;
}
exports.getDependentsFromArtifact = getDependentsFromArtifact;
