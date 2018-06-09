define(["require", "exports", "./retrievers/retrievers"], function (require, exports, Retrievers) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
            this._workItemRetriever = new Retrievers.WorkItemRetriever();
        }
        App.prototype.execute = function (actionContext) {
            console.log('Print clicked');
            this._actionContext = actionContext;
            this.showDialog();
        };
        App.prototype.showDialog = function () {
            var workItemProjectId = Object.keys(this._actionContext.workItemProjects)[0];
            var workItemProject = this._actionContext.workItemProjects[workItemProjectId];
            var workItemIds = this._actionContext.workItemIds;
            var workItemsPromise = this._workItemRetriever.retrieveWorkItems(workItemProject, workItemIds);
            workItemsPromise.then(function (ticketItems) {
                console.log(ticketItems);
                console.table(ticketItems);
                var msg = '';
                ticketItems.forEach(function (wi) {
                    msg += wi.title;
                    msg += '\r\n';
                });
                window.alert(msg);
            });
        };
        return App;
    }());
    exports.App = App;
    VSS.register('AdenEarnshaw.vsts-ticket-printing.printTicketsAction', function (context) {
        return new App();
    });
    VSS.notifyLoadSucceeded();
});
