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
exports.getRmEndpointUrl = exports.getAdEndpointUrl = exports.getRMUrl = exports.getParams = exports.Env = exports.DeployStatus = void 0;
var core = __importStar(require("@actions/core"));
var identity_1 = require("@azure/identity");
var DeployStatus;
(function (DeployStatus) {
    DeployStatus["success"] = "Success";
    DeployStatus["failed"] = "Failed";
    DeployStatus["skipped"] = "Skipped";
})(DeployStatus = exports.DeployStatus || (exports.DeployStatus = {}));
var Env;
(function (Env) {
    Env["prod"] = "Azure Public";
    Env["mooncake"] = "Azure China";
    Env["usnat"] = "Azure US Government";
})(Env = exports.Env || (exports.Env = {}));
function getParams(dataplane, env) {
    if (dataplane === void 0) { dataplane = false; }
    if (env === void 0) { env = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var env_1, resourceGroup, clientId, clientSecret, subscriptionId, tenantId, managedIdentity, activeDirectoryEndpointUrl, resourceManagerEndpointUrl, credential, scope, getAccessToken, token, params, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        env_1 = core.getInput('Environment');
                        resourceGroup = core.getInput("resourceGroup");
                        clientId = core.getInput("clientId");
                        clientSecret = core.getInput("clientSecret");
                        subscriptionId = core.getInput("subscriptionId");
                        tenantId = core.getInput("tenantId");
                        managedIdentity = core.getInput("managedIdentity");
                        activeDirectoryEndpointUrl = getAdEndpointUrl(env_1);
                        resourceManagerEndpointUrl = getRmEndpointUrl(env_1);
                    }
                    catch (err) {
                        throw new Error("Unable to parse the secret: " + err);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!dataplane) return [3 /*break*/, 3];
                    return [4 /*yield*/, getRMUrl(env)];
                case 2:
                    resourceManagerEndpointUrl = _a.sent();
                    _a.label = 3;
                case 3:
                    credential = new identity_1.DefaultAzureCredential();
                    scope = "".concat(resourceManagerEndpointUrl, "/.default");
                    getAccessToken = (0, identity_1.getBearerTokenProvider)(credential, scope);
                    return [4 /*yield*/, getAccessToken()];
                case 4:
                    token = _a.sent();
                    params = {
                        'clientId': clientId,
                        'clientSecret': clientSecret,
                        'subscriptionId': subscriptionId,
                        'tenantId': tenantId,
                        'managedIdentity': managedIdentity,
                        'activeDirectoryEndpointUrl': activeDirectoryEndpointUrl,
                        'resourceManagerEndpointUrl': resourceManagerEndpointUrl,
                        'bearer': token,
                        'resourceGroup': resourceGroup
                    };
                    return [2 /*return*/, params];
                case 5:
                    err_1 = _a.sent();
                    throw new Error("Failed to fetch Bearer: " + err_1);
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getParams = getParams;
function getRMUrl(env) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (env) {
                case Env.prod.toString():
                    return [2 /*return*/, "https://dev.azuresynapse.net"];
                case Env.mooncake.toString():
                    return [2 /*return*/, "https://dev.azuresynapse.azure.cn"];
                case Env.usnat.toString():
                    return [2 /*return*/, "https://dev.azuresynapse.usgovcloudapi.net"];
                default:
                    throw new Error('Environment validation failed');
            }
            return [2 /*return*/];
        });
    });
}
exports.getRMUrl = getRMUrl;
function getAdEndpointUrl(env) {
    switch (env) {
        case Env.prod.toString():
            return "https://login.microsoftonline.com/";
        case Env.mooncake.toString():
            return "https://login.chinacloudapi.cn/";
        case Env.usnat.toString():
            return "https://login.microsoftonline.us/";
        default:
            throw new Error('Environment validation failed');
    }
}
exports.getAdEndpointUrl = getAdEndpointUrl;
function getRmEndpointUrl(env) {
    switch (env) {
        case Env.prod.toString():
            return "https://management.azure.com/";
        case Env.mooncake.toString():
            return "https://management.chinacloudapi.cn/";
        case Env.usnat.toString():
            return "https://management.usgovcloudapi.net/";
        default:
            throw new Error('Environment validation failed');
    }
}
exports.getRmEndpointUrl = getRmEndpointUrl;
