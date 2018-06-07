// import RestClient = require("TFS/WorkItemTracking/RestClient");
// import Contracts = require("TFS/WorkItemTracking/Contracts");

// export class WorkItemRetriever {
//     public retrieveWorkItems(workItemIds: number[]): Contracts.WorkItem[] {
//         var client = RestClient.getClient();

//         let workItems: Contracts.WorkItem[] = [];
//         client.getWorkItems(workItemIds).then(
//             (items: Contracts.WorkItem[]) => {
//                 workItems = items;
//             }
//         );

//         return workItems;
//     }
// }
