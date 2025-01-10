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
var core = __importStar(require("@actions/core"));
var arm_template_utils_1 = require("../utils/arm_template_utils");
var deploy_utils_1 = require("../utils/deploy_utils");
var logger_1 = require("../utils/logger");
var utils_test_helpers_1 = require("./helpers/utils_test_helpers");
var pcu = require("../utils/service_principal_client_utils");
var chai_object = require('chai');
var sinon = require("sinon");
var expect = chai_object.expect;
var assert = chai_object.assert;
describe("Test deploy utils", function () {
    it('should fetch params', function () { return __awaiter(void 0, void 0, void 0, function () {
        var stubbedGetBearer, stubbedSPAttributes, params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stubbedGetBearer = sinon.stub(pcu, "getBearer").callsFake(function () { return "bearer"; });
                    stubbedSPAttributes = sinon.stub(core, "getInput").callsFake(function (x) { return x === "Environment" ? "Azure Public" : x; });
                    return [4 /*yield*/, (0, deploy_utils_1.getParams)()];
                case 1:
                    params = _a.sent();
                    expect(params.clientId).to.be.equal('clientId');
                    expect(params.clientSecret).to.be.equal('clientSecret');
                    expect(params.subscriptionId).to.be.equal('subscriptionId');
                    expect(params.tenantId).to.be.equal('tenantId');
                    expect(params.activeDirectoryEndpointUrl).to.be.equal('https://login.microsoftonline.com/');
                    expect(params.resourceManagerEndpointUrl).to.be.equal('https://management.azure.com/');
                    expect(params.bearer).to.be.equal('bearer');
                    expect(params.resourceGroup).to.be.equal('resourceGroup');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return resource manager url for prod', function () { return __awaiter(void 0, void 0, void 0, function () {
        var RmURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, deploy_utils_1.getRMUrl)('Azure Public')];
                case 1:
                    RmURL = _a.sent();
                    expect(RmURL).to.be.equal('https://dev.azuresynapse.net');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Test Arm template utils", function () {
    it('should populate the arm template', function () {
        var targetWorkspaceName = "MochaTesting";
        var completeArmTemplate = (0, arm_template_utils_1.createArmTemplate)(utils_test_helpers_1.armParams, utils_test_helpers_1.armTemplate, "", targetWorkspaceName);
        expect(completeArmTemplate).to.be.equal(utils_test_helpers_1.expectedArmTemplate);
        var defaultArtifacts = (0, arm_template_utils_1.findDefaultArtifacts)(completeArmTemplate, targetWorkspaceName);
        expect(defaultArtifacts.get('github-cicd-1-WorkspaceDefaultSqlServer')).to.be.equal('MochaTesting-WorkspaceDefaultSqlServer');
    });
    it('should populate arm resources and dependency tree', function () { return __awaiter(void 0, void 0, void 0, function () {
        var targetWorkspaceName, completeArmTemplate, defaultArtifacts, resources;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetWorkspaceName = "MochaTesting";
                    completeArmTemplate = (0, arm_template_utils_1.createArmTemplate)(utils_test_helpers_1.armParams, utils_test_helpers_1.armTemplate_complete, "", targetWorkspaceName);
                    defaultArtifacts = (0, arm_template_utils_1.findDefaultArtifacts)(completeArmTemplate, targetWorkspaceName);
                    completeArmTemplate = JSON.stringify(JSON.parse(completeArmTemplate));
                    return [4 /*yield*/, (0, arm_template_utils_1.getArtifactsFromArmTemplate)(completeArmTemplate, 'useast', defaultArtifacts)];
                case 1:
                    resources = _a.sent();
                    expect(resources[0][0].type).to.be.equal('Microsoft.Synapse/workspaces/notebooks');
                    expect(resources[0][1].type).to.be.equal('Microsoft.Synapse/workspaces/integrationRuntimes');
                    expect(resources[1][0].type).to.be.equal('Microsoft.Synapse/workspaces/pipelines');
                    expect(resources[1][1].type).to.be.equal('Microsoft.Synapse/workspaces/linkedServices');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail while creating dependency tree', function () {
        var targetWorkspaceName = "MochaTesting";
        var completeArmTemplate = (0, arm_template_utils_1.createArmTemplate)(utils_test_helpers_1.armParams, utils_test_helpers_1.armTemplate, "", targetWorkspaceName);
        var defaultArtifacts = (0, arm_template_utils_1.findDefaultArtifacts)(completeArmTemplate, targetWorkspaceName);
        completeArmTemplate = JSON.stringify(JSON.parse(completeArmTemplate));
        assert.throws(function () {
            (0, arm_template_utils_1.getArtifactsFromArmTemplate)(completeArmTemplate, 'useast', defaultArtifacts), Error,
                "Could not figure out full dependency model. Some dependencies may not exist in template.";
        });
    });
});
describe("Test SystemLogger utils", function () {
    it('undefined logger should not cause exception when calling log methods', function () {
        logger_1.SystemLogger.setLogger(undefined);
        logger_1.SystemLogger.info("Test");
        logger_1.SystemLogger.debug("Test");
        logger_1.SystemLogger.warn("Test");
        logger_1.SystemLogger.error("Test");
    });
    it('ensure private logger log methods are called by system logger', function () {
        var testLogger = {
            info: function (mesage) {
                return mesage;
            },
            debug: function (message) {
                return message;
            },
            error: function (message) {
                return message;
            },
            warn: function (message) {
                return message;
            }
        };
        logger_1.SystemLogger.setLogger(testLogger);
        expect(logger_1.SystemLogger.info("1")).to.be.equal("1");
        expect(logger_1.SystemLogger.debug("1")).to.be.equal("1");
        expect(logger_1.SystemLogger.error("1")).to.be.equal("1");
        expect(logger_1.SystemLogger.warn("1")).to.be.equal("1");
    });
});
