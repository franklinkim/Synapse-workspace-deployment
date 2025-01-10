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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemLogger = exports.ActionLogger = void 0;
var core = __importStar(require("@actions/core"));
var SystemLogger = /** @class */ (function () {
    function SystemLogger() {
    }
    SystemLogger.setLogger = function (logger) {
        SystemLogger.logger = logger;
    };
    SystemLogger.info = function (message) {
        var _a;
        (_a = SystemLogger.logger) === null || _a === void 0 ? void 0 : _a.info(message);
        return message;
    };
    SystemLogger.warn = function (message) {
        var _a;
        (_a = SystemLogger.logger) === null || _a === void 0 ? void 0 : _a.warn(message);
        return message;
    };
    SystemLogger.error = function (message) {
        var _a;
        (_a = SystemLogger.logger) === null || _a === void 0 ? void 0 : _a.error(message);
        return message;
    };
    SystemLogger.debug = function (message) {
        var _a;
        (_a = SystemLogger.logger) === null || _a === void 0 ? void 0 : _a.debug(message);
        return message;
    };
    SystemLogger.logger = undefined;
    return SystemLogger;
}());
exports.SystemLogger = SystemLogger;
var ActionLogger = /** @class */ (function () {
    function ActionLogger(debugEnabled) {
        this.debugEnabled = debugEnabled;
    }
    ActionLogger.prototype.info = function (message) {
        core.info(message);
        return message;
    };
    ActionLogger.prototype.warn = function (message) {
        core.warning(message);
        return message;
    };
    ActionLogger.prototype.error = function (message) {
        core.error(message);
        return message;
    };
    ActionLogger.prototype.debug = function (message) {
        if (this.debugEnabled) {
            core.debug(message);
        }
        return message;
    };
    return ActionLogger;
}());
exports.ActionLogger = ActionLogger;
;
