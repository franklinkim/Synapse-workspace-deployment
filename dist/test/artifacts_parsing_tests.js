"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_fixtures_1 = require("./helpers/test_fixtures");
var workspace_artifacts_getter_1 = require("../utils/workspace_artifacts_getter");
var chai_object = require('chai');
var expect = chai_object.expect;
var assert = chai_object.assert;
describe("Validate artifacts parsing", function () {
    it('should find the depedants', function () {
        var dependants = (0, workspace_artifacts_getter_1.getDependentsFromArtifactFromWorkspace)(JSON.stringify(test_fixtures_1.DATASETPAYLOAD));
        expect(dependants[0]).equal("LinkedServiceReference/bigdataqa0924ws-WorkspaceDefaultStorage");
        dependants = (0, workspace_artifacts_getter_1.getDependentsFromArtifactFromWorkspace)(JSON.stringify(test_fixtures_1.PIPELINEPAYLOAD));
        expect(dependants[0]).equal("DatasetReference/SourceDataset_pqd");
        expect(dependants[1]).equal("DatasetReference/DestinationDataset_pqd");
    });
});
