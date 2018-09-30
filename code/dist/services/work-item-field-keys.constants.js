define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Values for additional fields can be found here: https://docs.microsoft.com/en-us/azure/devops/boards/work-items/guidance/work-item-field?view=vsts
    var WorkItemFieldKeyConstants = /** @class */ (function () {
        function WorkItemFieldKeyConstants() {
        }
        WorkItemFieldKeyConstants.id = 'System.Id';
        WorkItemFieldKeyConstants.areaPath = 'System.AreaPath';
        WorkItemFieldKeyConstants.acceptanceCriteria = 'Microsoft.VSTS.Common.AcceptanceCriteria';
        WorkItemFieldKeyConstants.description = 'System.Description';
        WorkItemFieldKeyConstants.dueDate = 'Microsoft.VSTS.Scheduling.DueDate';
        WorkItemFieldKeyConstants.effort = 'Microsoft.VSTS.Scheduling.Effort';
        WorkItemFieldKeyConstants.isBlocked = 'Microsoft.VSTS.CMMI.Blocked';
        WorkItemFieldKeyConstants.itemType = 'System.WorkItemType';
        WorkItemFieldKeyConstants.iterationPath = 'System.IterationPath';
        WorkItemFieldKeyConstants.priority = 'Microsoft.VSTS.Common.Priority';
        WorkItemFieldKeyConstants.reproSteps = 'Microsoft.VSTS.TCM.ReproSteps';
        WorkItemFieldKeyConstants.tags = 'System.Tags';
        WorkItemFieldKeyConstants.teamProject = 'System.TeamProject';
        WorkItemFieldKeyConstants.title = 'System.Title';
        return WorkItemFieldKeyConstants;
    }());
    exports.WorkItemFieldKeyConstants = WorkItemFieldKeyConstants;
});
