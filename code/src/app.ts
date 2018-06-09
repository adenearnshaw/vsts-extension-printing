import Retrievers = require('./services/services');

export class App {
    private _workItemRetriever: Retrievers.TicketItemRetrieverService;
    private _actionContext;

    constructor() {
        this._workItemRetriever = new Retrievers.TicketItemRetrieverService();
    }

    public execute(actionContext) {
        console.log('Print clicked');
        this._actionContext = actionContext;

        this.showDialog();
    }

    private showDialog() {
        const workItemProjectId = Object.keys(this._actionContext.workItemProjects)[0];
        const workItemProject = this._actionContext.workItemProjects[workItemProjectId];
        const workItemIds = this._actionContext.workItemIds;
        const workItemsPromise = this._workItemRetriever.retrieveTicketItems(workItemProject, workItemIds);

        workItemsPromise.then(ticketItems => {
            console.table(ticketItems);

            let msg = '';
            ticketItems.forEach(wi => {
                msg += wi.title;
                msg += '\r\n';
            });
            window.alert(msg);
        });
    }
}

VSS.register('AdenEarnshaw.vsts-ticket-printing.printTicketsAction', (context) => {
    return new App();
});
VSS.notifyLoadSucceeded();
