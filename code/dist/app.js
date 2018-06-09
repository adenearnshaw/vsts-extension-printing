define(["require", "exports", "./services/services.module", "./builders/builders.module"], function (require, exports, Services, builders_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
            this._workItemRetriever = new Services.TicketItemRetrieverService();
        }
        App.prototype.execute = function (actionContext) {
            console.log('Print clicked');
            this._actionContext = actionContext;
            this.showDialog();
        };
        App.prototype.showDialog = function () {
            var _this = this;
            var workItemProject = this.getWorkItemProjectNameFromContext();
            var workItemIds = this.getWorkItemIdsFromContext();
            var workItemsPromise = this._workItemRetriever.retrieveTicketItems(workItemProject, workItemIds);
            workItemsPromise.then(function (ticketItems) {
                console.table(ticketItems);
                var cardHtml = new builders_module_1.HtmlTicketsDocumentBuilder().generateDocumentHtml(ticketItems);
                _this.openPrintWindow(cardHtml, 1400, 800);
            });
        };
        App.prototype.openPrintWindow = function (html, w, h) {
            // Fixes dual-screen position                         Most browsers      Firefox
            var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
            var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;
            var printWindow = window.open('', 'PRINT', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
        App.prototype.getWorkItemProjectNameFromContext = function () {
            if (this._actionContext.workItemProjects) {
                var workItemProjectId = Object.keys(this._actionContext.workItemProjects)[0];
                var workItemProject = this._actionContext.workItemProjects[workItemProjectId];
                return workItemProject;
            }
            if (this._actionContext.currentProjectName) {
                return this._actionContext.currentProjectName;
            }
            return '';
        };
        App.prototype.getWorkItemIdsFromContext = function () {
            if (this._actionContext.workItemIds) {
                return this._actionContext.workItemIds;
            }
            if (this._actionContext.workItemId) {
                return [this._actionContext.workItemId];
            }
            return [];
        };
        return App;
    }());
    exports.App = App;
    VSS.register('AdenEarnshaw.vsts-ticket-printing.printTicketsAction', function (context) {
        return new App();
    });
    VSS.notifyLoadSucceeded();
});
