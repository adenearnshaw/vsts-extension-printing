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
                var cardHtml = new builders_module_1.HtmlTicketsDocumentBuilder().generateDocumentHtml(ticketItems);
                _this.showPrintDialog(cardHtml, 1400, 800);
            });
        };
        App.prototype.showPrintDialog = function (html, w, h) {
            // // Fixes dual-screen position                         Most browsers      Firefox
            // const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
            // const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
            // const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            // const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
            // const left = ((width / 2) - (w / 2)) + dualScreenLeft;
            // const top = ((height / 2) - (h / 2)) + dualScreenTop;
            // const printWindow = window.open('', 'PRINT', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
            var printWindow = this.openPrintWindow(w, h);
            if (!printWindow) {
                console.log('Please enable popups');
                return;
            }
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
        App.prototype.openPrintWindow = function (windowWidth, windowHeight) {
            var centerLeft = (window.screen.availWidth - windowWidth) / 2;
            var centerTop = ((window.screen.availHeight - windowHeight) / 2);
            var misc_features = ', status=no, location=no, scrollbars=no, resizable=no';
            var windowFeatures = 'width=' + windowWidth + ',height=' + windowHeight + ',left=' + centerLeft + ',top=' + centerTop + misc_features;
            var win = window.open('', 'PRINT', windowFeatures);
            return win;
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
