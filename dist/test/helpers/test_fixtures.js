"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULTARTIFACT4 = exports.DEFAULTARTIFACTFAIl3 = exports.DEFAULTARTIFACTFAIl2 = exports.DEFAULTARTIFACTFAIl1 = exports.DEFAULTARTIFACTCREDENTAILS = exports.DEFAULTARTIFACTSTORAGE = exports.DEFAULTARTIFACTSQL = exports.PIPELINEPAYLOAD = exports.DATASETPAYLOAD = void 0;
exports.DATASETPAYLOAD = {
    id: "/subscriptions/051ddeca-1ed6-4d8b-ba6f-1ff561e5f3b3/resourceGroups/bigdataqa/providers/Microsoft.Synapse/workspaces/bigdataqa0924ws/datasets/OutParquet",
    name: "OutParquet",
    type: "Microsoft.Synapse/workspaces/datasets",
    etag: "f608dd2e-0000-0200-0000-5f6d79a40000",
    properties: {
        linkedServiceName: {
            referenceName: "bigdataqa0924ws-WorkspaceDefaultStorage",
            type: "LinkedServiceReference"
        },
        annotations: [],
        type: "Parquet",
        typeProperties: {
            location: {
                type: "AzureBlobFSLocation",
                folderPath: "TestPipeline",
                fileSystem: "hozhao"
            },
            compressionCodec: "snappy"
        },
        schema: []
    }
};
exports.PIPELINEPAYLOAD = {
    inputs: [
        {
            type: "DatasetReference",
            referenceName: "SourceDataset_pqd"
        }
    ],
    outputs: [
        {
            type: "DatasetReference",
            referenceName: "DestinationDataset_pqd"
        }
    ]
};
exports.DEFAULTARTIFACTSQL = {
    "name": "[concat(parameters('workspaceName'), '/test-WorkspaceDefaultSqlServer')]",
    "type": "Microsoft.Synapse/workspaces/linkedServices",
    "apiVersion": "2019-06-01-preview",
    "properties": {
        "parameters": {
            "DBName": {
                "type": "String"
            }
        },
        "annotations": [],
        "type": "AzureSqlDW",
        "typeProperties": {
            "connectionString": "[parameters('dancicdtest-WorkspaceDefaultSqlServer_connectionString')]"
        },
        "connectVia": {
            "referenceName": "AutoResolveIntegrationRuntime",
            "type": "IntegrationRuntimeReference"
        }
    },
    "dependsOn": [
        "[concat(variables('workspaceId'), '/integrationRuntimes/AutoResolveIntegrationRuntime')]"
    ]
};
exports.DEFAULTARTIFACTSTORAGE = {
    "name": "[concat(parameters('workspaceName'), '/test-WorkspaceDefaultStorage')]",
    "type": "Microsoft.Synapse/workspaces/linkedServices",
    "apiVersion": "2019-06-01-preview",
    "properties": {
        "annotations": [],
        "type": "AzureBlobFS",
        "typeProperties": {
            "url": "[parameters('dancicdtest-WorkspaceDefaultStorage_properties_typeProperties_url')]"
        },
        "connectVia": {
            "referenceName": "AutoResolveIntegrationRuntime",
            "type": "IntegrationRuntimeReference"
        }
    },
    "dependsOn": [
        "[concat(variables('workspaceId'), '/integrationRuntimes/AutoResolveIntegrationRuntime')]"
    ]
};
exports.DEFAULTARTIFACTCREDENTAILS = {
    "name": "[concat(parameters('workspaceName'), '/WorkspaceSystemIdentity')]",
    "type": "Microsoft.Synapse/workspaces/credentials",
    "apiVersion": "2019-06-01-preview",
    "properties": {
        "type": "ManagedIdentity",
        "typeProperties": {}
    },
    "dependsOn": []
};
exports.DEFAULTARTIFACTFAIl1 = {
    "name": "[concat(parameters('workspaceName'), '/test-WorkspaceStorage')]",
    "type": "Microsoft.Synapse/workspaces/linkedServices",
    "apiVersion": "2019-06-01-preview",
    "properties": {
        "annotations": [],
        "type": "AzureBlobFS",
        "typeProperties": {
            "url": "[parameters('dancicdtest-WorkspaceDefaultStorage_properties_typeProperties_url')]"
        },
        "connectVia": {
            "referenceName": "AutoResolveIntegrationRuntime",
            "type": "IntegrationRuntimeReference"
        }
    },
    "dependsOn": [
        "[concat(variables('workspaceId'), '/integrationRuntimes/AutoResolveIntegrationRuntime')]"
    ]
};
exports.DEFAULTARTIFACTFAIl2 = {
    "name": "[concat(parameters('workspaceName'), '/test-WorkspaceDefaultStorage')]",
    "type": "Microsoft.Synapse/workspaces/linked",
    "apiVersion": "2019-06-01-preview",
    "properties": {
        "annotations": [],
        "type": "AzureBlobFS",
        "typeProperties": {
            "url": "[parameters('dancicdtest-WorkspaceDefaultStorage_properties_typeProperties_url')]"
        },
        "connectVia": {
            "referenceName": "AutoResolveIntegrationRuntime",
            "type": "IntegrationRuntimeReference"
        }
    },
    "dependsOn": [
        "[concat(variables('workspaceId'), '/integrationRuntimes/AutoResolveIntegrationRuntime')]"
    ]
};
exports.DEFAULTARTIFACTFAIl3 = {
    "name": "[concat(parameters('workspaceName'), '/test-WorkspaceDefaultStorage')]",
    "type": "Microsoft.Synapse/workspaces/linkedServices",
    "apiVersion": "2019-06-01-preview",
    "properties": {
        "annotations": [],
        "type": "SparkPool",
        "typeProperties": {
            "url": "[parameters('dancicdtest-WorkspaceDefaultStorage_properties_typeProperties_url')]"
        },
        "connectVia": {
            "referenceName": "AutoResolveIntegrationRuntime",
            "type": "IntegrationRuntimeReference"
        }
    },
    "dependsOn": [
        "[concat(variables('workspaceId'), '/integrationRuntimes/AutoResolveIntegrationRuntime')]"
    ]
};
exports.DEFAULTARTIFACT4 = {
    "name": "[concat(parameters('workspaceName'), '/Credential2')]",
    "type": "Microsoft.Synapse/workspaces/credentials",
    "apiVersion": "2019-06-01-preview",
    "properties": {
        "type": "ServicePrincipal",
        "typeProperties": {
            "tenant": "[parameters('Credential2_properties_typeProperties_tenant')]",
            "servicePrincipalId": "[parameters('Credential2_properties_typeProperties_servicePrincipalId')]",
            "servicePrincipalKey": "[parameters('Credential2_properties_typeProperties_servicePrincipalKey')]"
        }
    },
    "dependsOn": [
        "[concat(variables('workspaceId'), '/linkedServices/AzureKeyVault1')]"
    ]
};
