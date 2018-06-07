// import WorkItemRetriever = require('./work-item-retriever/work-item-retriever');
// class PrintTicketHandler {
//     private _actionContext: any;
//     private readonly _workItemRetriever: WorkItemRetriever;
//     constructor() {
//         this._workItemRetriever = new WorkItemRetriever();
//     }
//     public execute(actionContext: any) {
//         this._actionContext = actionContext;
//         this.showDialog();
//     }
//     private showDialog(): void {
//         console.log(this._actionContext.workItemIds);
//         var workItems = this._workItemRetriever.retrieveWorkItems(this._actionContext.workItemIds);
//         let msg = '';
//         workItems.forEach(wi => {
//             msg += wi.id;
//             msg += "\r\n";
//         });
//         window.alert(msg);
//     }
// }
// VSS.register("AdenEarnshaw.vsts-ticket-printing.printTicketsAction", function (context: any) {
//     console.log("File Owner - register");
//     return; // new PrintTicketHandler();
// });
