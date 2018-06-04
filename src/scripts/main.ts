/// <reference path='../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts' />

class PrintTicketHandler{
    private _actionContext: any;

    public execute(actionContext: any) {
        this._actionContext = actionContext;
        this.showDialog();
    }

    private showDialog(): void{
        console.log(this._actionContext.workItemIds);
                    window.alert(`Selected work item count: ${this._actionContext.workItemIds.length}`);
    }
}

VSS.register("AdenEarnshaw.vsts-ticket-printing.printTicketsAction", function (context: any) {
    console.log("File Owner - register");
    return new PrintTicketHandler();
});
