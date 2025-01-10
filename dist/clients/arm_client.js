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
exports.deploy = void 0;
var httpClient = __importStar(require("typed-rest-client/HttpClient"));
var uuid = __importStar(require("uuid"));
var deployUtils = __importStar(require("../utils/deploy_utils"));
var logger_1 = require("../utils/logger");
var userAgent = 'synapse-github-cicd-deploy-task';
var requestOptions = {};
//requestOptions.ignoreSslError = ;
var client = new httpClient.HttpClient(userAgent, undefined, requestOptions);
function getDeploymentUrl(baseUrl, rgName, subId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, regex;
        return __generator(this, function (_a) {
            url = "".concat(baseUrl, "/subscriptions/").concat(subId, "/resourcegroups/").concat(rgName, "/providers/Microsoft.Resources/deployments/").concat(uuid.v4(), "?api-version=2019-10-01");
            regex = /([^:]\/)\/+/gi;
            return [2 /*return*/, url.replace(regex, '$1')];
        });
    });
}
function checkDeploymentStatus(url, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var timeout, delayMilliSecs, status, currentTime, res, resStatus, body, responseJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = new Date().getTime() + (60000 * 20);
                    delayMilliSecs = 30000;
                    status = "";
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 9];
                    currentTime = new Date().getTime();
                    if (timeout < currentTime) {
                        logger_1.SystemLogger.info('Current time: ' + currentTime);
                        throw new Error("Timeout error in checkDeploymentStatus");
                    }
                    return [4 /*yield*/, client.get(url, headers)];
                case 2:
                    res = _a.sent();
                    resStatus = res.message.statusCode;
                    logger_1.SystemLogger.info("CheckDeploymentStatus: ".concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                    if (resStatus != 200 && resStatus != 201 && resStatus != 202) {
                        throw new Error("=> status: ".concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                    }
                    return [4 /*yield*/, res.readBody()];
                case 3:
                    body = _a.sent();
                    if (!!body) return [3 /*break*/, 5];
                    logger_1.SystemLogger.info("No status response for url: " + url);
                    return [4 /*yield*/, delay(delayMilliSecs)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 5:
                    responseJson = JSON.parse(body);
                    logger_1.SystemLogger.info(JSON.stringify(responseJson));
                    status = responseJson['status'];
                    if (!(status == 'Succeeded' || status == 'Failed' || status == 'Canceled')) return [3 /*break*/, 6];
                    return [2 /*return*/, status];
                case 6:
                    logger_1.SystemLogger.info("Arm deployment status: " + status);
                    return [4 /*yield*/, delay(delayMilliSecs)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
function deploy(armTemplate) {
    return __awaiter(this, void 0, void 0, function () {
        var params, url_1, token_1, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, deployUtils.getParams()];
                case 1:
                    params = _a.sent();
                    return [4 /*yield*/, getDeploymentUrl(params.resourceManagerEndpointUrl, params.resourceGroup, params.subscriptionId)];
                case 2:
                    url_1 = _a.sent();
                    token_1 = params.bearer;
                    logger_1.SystemLogger.info('Arm resources deployment url: ' + url_1);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var headers = {
                                'Authorization': 'Bearer ' + token_1,
                                'Content-Type': 'application/json; charset=utf-8'
                            };
                            var requestBody = "{\n                \"properties\": {\n                    \"mode\": \"Incremental\",\n                    \"debugSetting\": {\n                        \"detailLevel\": \"requestContent, responseContent\"\n                    },\n                    \"template\": ".concat(JSON.stringify(armTemplate), "\n                }\n            }");
                            client.put(url_1, requestBody, headers).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var resStatus, statusUrl, rawHeaders, i, header, status;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            resStatus = res.message.statusCode;
                                            if (resStatus != 200 && resStatus != 201 && resStatus != 202) {
                                                logger_1.SystemLogger.info("Arm template deployment failed, status: ".concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                                                return [2 /*return*/, reject(deployUtils.DeployStatus.failed)];
                                            }
                                            logger_1.SystemLogger.info("Arm template deployment status: ".concat(resStatus, "; status message: ").concat(res.message.statusMessage));
                                            statusUrl = "";
                                            rawHeaders = res.message.rawHeaders;
                                            for (i = 0; i < rawHeaders.length; i++) {
                                                header = rawHeaders[i].toLowerCase();
                                                if (header.indexOf('microsoft.resources') > -1 &&
                                                    header.indexOf('deployments') > -1 &&
                                                    header.indexOf('operationstatuses') > -1) {
                                                    statusUrl = header;
                                                }
                                            }
                                            logger_1.SystemLogger.info("Deployment tracking end point: ".concat(statusUrl));
                                            if (!(statusUrl != "")) return [3 /*break*/, 2];
                                            return [4 /*yield*/, checkDeploymentStatus(statusUrl, headers)];
                                        case 1:
                                            status = _a.sent();
                                            logger_1.SystemLogger.info("Final arm deployment status: ".concat(status));
                                            if (status == 'Succeeded') {
                                                return [2 /*return*/, resolve(deployUtils.DeployStatus.success)];
                                            }
                                            return [2 /*return*/, reject(deployUtils.DeployStatus.failed)];
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }, function (reason) {
                                logger_1.SystemLogger.info('Arm Template Deployment Failed: ' + reason);
                                return reject(deployUtils.DeployStatus.failed);
                            });
                        })];
                case 3:
                    err_1 = _a.sent();
                    throw new Error("ARM template deployment failed: " + err_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deploy = deploy;
