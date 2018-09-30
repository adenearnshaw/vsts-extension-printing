// Values for additional fields can be found here: https://docs.microsoft.com/en-us/azure/devops/boards/work-items/guidance/work-item-field?view=vsts
export class WorkItemFieldKeyConstants {
    public static readonly id = 'System.Id';
    public static readonly areaPath = 'System.AreaPath';
    public static readonly acceptanceCriteria = 'Microsoft.VSTS.Common.AcceptanceCriteria';
    public static readonly description = 'System.Description';
    public static readonly dueDate = 'Microsoft.VSTS.Scheduling.DueDate';
    public static readonly effort = 'Microsoft.VSTS.Scheduling.Effort';
    public static readonly isBlocked = 'Microsoft.VSTS.CMMI.Blocked';
    public static readonly itemType = 'System.WorkItemType';
    public static readonly iterationPath = 'System.IterationPath';
    public static readonly priority = 'Microsoft.VSTS.Common.Priority';
    public static readonly reproSteps = 'Microsoft.VSTS.TCM.ReproSteps';
    public static readonly tags = 'System.Tags';
    public static readonly teamProject = 'System.TeamProject';
    public static readonly title = 'System.Title';
}