export class App {
    private _actionContext;

    public execute(actionContext) {
        this._actionContext = actionContext;
        console.log('Print clicked');
    }
}

VSS.register('AdenEarnshaw.vsts-ticket-printing.printTicketsAction', (context) => {
    return new App();
});
VSS.notifyLoadSucceeded();
