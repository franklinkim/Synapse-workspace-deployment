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
exports.BundleManager = void 0;
var fs = __importStar(require("fs"));
var https = __importStar(require("https"));
var path = __importStar(require("path"));
var child_process_1 = require("child_process");
var logger_1 = require("../utils/logger");
var BundleManager = /** @class */ (function () {
    function BundleManager(source) {
        if (source === void 0) { source = 'prod'; }
        this._bundleUrl = BundleManager.prodBundleUrl;
        this._source = "Prod";
        this._source = source;
        if (source.toLowerCase() == "ppe") {
            this._bundleUrl = BundleManager.ppeBundleUrl;
            logger_1.SystemLogger.info("Setting bundle source as PPE");
        }
        logger_1.SystemLogger.info("Bundle source : " + this._bundleUrl);
    }
    BundleManager.prototype.invokeBundle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file_1;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    if (!fs.existsSync(BundleManager.defaultBundleDir)) {
                        fs.mkdirSync(BundleManager.defaultBundleDir);
                    }
                    file_1 = fs.createWriteStream(BundleManager.defaultBundleFilePath);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            logger_1.SystemLogger.info("Downloading asset file");
                            https.get(_this._bundleUrl, function (response) {
                                response.pipe(file_1);
                                file_1.on('finish', function () {
                                    file_1.close();
                                    logger_1.SystemLogger.info("Asset file downloaded at : " + BundleManager.defaultBundleFilePath);
                                    return resolve();
                                });
                            });
                        })];
                }
                catch (ex) {
                    logger_1.SystemLogger.info("Bundle manager failed to download asset file.");
                    throw ex;
                }
                return [2 /*return*/];
            });
        });
    };
    BundleManager.ExecuteShellCommand = function (cmd) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.SystemLogger.info("Executing shell command");
                        logger_1.SystemLogger.info("Command : " + cmd);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var command = (0, child_process_1.spawn)(cmd, { shell: true });
                                command.stdout.on('data', function (data) {
                                    logger_1.SystemLogger.info("Stdout: " + data.toString());
                                });
                                command.stderr.on('data', function (data) {
                                    logger_1.SystemLogger.info("Stderr: " + data.toString());
                                });
                                command.on('error', function (err) {
                                    if (err) {
                                        logger_1.SystemLogger.info("Error: " + err.toString());
                                        return reject("Shell execution failed.");
                                    }
                                });
                                command.on('close', function (code) {
                                    if (code != 0) {
                                        return reject("Shell execution failed.");
                                    }
                                    else {
                                        return resolve("Shell command execution is successful.");
                                    }
                                });
                            })];
                    case 2:
                        result = _a.sent();
                        if (result == "Shell execution failed.") {
                            throw new Error("Shell execution failed.");
                        }
                        logger_1.SystemLogger.info("Shell command execution is successful.");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        logger_1.SystemLogger.info("Shell execution failed.");
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BundleManager.prodBundleUrl = 'https://web.azuresynapse.net/assets/cmd-api/main.js';
    BundleManager.ppeBundleUrl = 'https://web-ci.azuresynapse.net/assets/cmd-api/main.js';
    BundleManager.defaultBundleDir = 'downloads';
    BundleManager.defaultBundleName = 'main.js';
    BundleManager.defaultBundleFilePath = path.join(process.cwd(), BundleManager.defaultBundleDir, BundleManager.defaultBundleName);
    return BundleManager;
}());
exports.BundleManager = BundleManager;
