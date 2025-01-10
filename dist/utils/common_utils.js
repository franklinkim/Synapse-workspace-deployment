"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultArtifact = exports.isDefaultArtifact = exports.isStrNullOrEmpty = void 0;
var artifacts_enum_1 = require("./artifacts_enum");
function isStrNullOrEmpty(val) {
    if (val === undefined || val === null || val.trim() === '') {
        return true;
    }
    return false;
}
exports.isStrNullOrEmpty = isStrNullOrEmpty;
function isDefaultArtifact(artifact) {
    var artifactJson = JSON.parse(artifact);
    if (artifactJson.type == artifacts_enum_1.DataFactoryType.managedPrivateEndpoints)
        return DefaultArtifact.DefaultArtifacts.some(function (e) { return e.matches(artifactJson.name, artifactJson.properties.groupId, artifactJson.type); });
    return DefaultArtifact.DefaultArtifacts.some(function (e) { return e.matches(artifactJson.name, artifactJson.properties.type, artifactJson.type); });
}
exports.isDefaultArtifact = isDefaultArtifact;
var DefaultArtifact = /** @class */ (function () {
    function DefaultArtifact(name, type, dataFactoryType) {
        this.name = name;
        this.type = type;
        this.dataFactoryType = dataFactoryType;
    }
    DefaultArtifact.prototype.matches = function (name, type, dataFactoryType) {
        return name.toLowerCase().includes(this.name.toLowerCase())
            && type.toLowerCase() === this.type.toLowerCase()
            && dataFactoryType.toLowerCase() === this.dataFactoryType.toLowerCase();
    };
    DefaultArtifact.DefaultArtifacts = [
        new DefaultArtifact("workspacedefaultsqlserver", "azuresqldw", artifacts_enum_1.DataFactoryType.linkedservice),
        new DefaultArtifact("workspacedefaultstorage", "azureblobfs", artifacts_enum_1.DataFactoryType.linkedservice),
        new DefaultArtifact("workspacesystemidentity", "managedidentity", artifacts_enum_1.DataFactoryType.credential),
        new DefaultArtifact("synapse-ws-sql", "sql", artifacts_enum_1.DataFactoryType.managedPrivateEndpoints),
        new DefaultArtifact("synapse-ws-sqlOnDemand", "sqlOnDemand", artifacts_enum_1.DataFactoryType.managedPrivateEndpoints),
        new DefaultArtifact("synapse-ws-kusto", "Kusto", artifacts_enum_1.DataFactoryType.managedPrivateEndpoints),
    ];
    return DefaultArtifact;
}());
exports.DefaultArtifact = DefaultArtifact;
