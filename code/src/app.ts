import Services = require('./services/services.module');
import { HtmlTicketsDocumentBuilder } from './builders/builders.module';

export class App {
    private _workItemRetriever: Services.TicketItemRetrieverService;
    private _actionContext;

    constructor() {
        this._workItemRetriever = new Services.TicketItemRetrieverService();
    }

    public execute(actionContext) {
        console.log('Print clicked');
        this._actionContext = actionContext;

        this.showDialog();
    }

    private showDialog() {
        const workItemProject = this.getWorkItemProjectNameFromContext();
        const workItemIds = this.getWorkItemIdsFromContext();
        const workItemsPromise = this._workItemRetriever.retrieveTicketItems(workItemProject, workItemIds);

        workItemsPromise.then(ticketItems => {
            const cardHtml = new HtmlTicketsDocumentBuilder().generateDocumentHtml(ticketItems);
            this.showPrintDialog(cardHtml, 1400, 800);
        });
    }

    private showPrintDialog(html: string, w: number, h: number) {

        // // Fixes dual-screen position                         Most browsers      Firefox
        // const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        // const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        // const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        // const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        // const left = ((width / 2) - (w / 2)) + dualScreenLeft;
        // const top = ((height / 2) - (h / 2)) + dualScreenTop;
        // const printWindow = window.open('', 'PRINT', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        const printWindow = this.openPrintWindow(w,h);

        if (!printWindow) {
            console.log('Please enable popups');
            return;
        }

        printWindow.document.write(html);

        printWindow.document.close();
        printWindow.focus();

        printWindow.print();
        printWindow.close();
    }

    private openPrintWindow(windowWidth: number, windowHeight: number): Window {
        const centerLeft = (window.screen.availWidth - windowWidth) / 2;
        const centerTop = ((window.screen.availHeight - windowHeight) / 2);

        const misc_features = ', status=no, location=no, scrollbars=no, resizable=no';

        const windowFeatures = 'width=' + windowWidth + ',height=' + windowHeight + ',left=' + centerLeft + ',top=' + centerTop + misc_features;
        const win = window.open('', 'PRINT', windowFeatures);

        return win;
    }

    private getWorkItemProjectNameFromContext(): string {
        if (this._actionContext.workItemProjects) {
            const workItemProjectId = Object.keys(this._actionContext.workItemProjects)[0];
            const workItemProject = this._actionContext.workItemProjects[workItemProjectId];
            return workItemProject;
        }

        if (this._actionContext.currentProjectName) {
            return this._actionContext.currentProjectName;
        }

        return '';
    }

    private getWorkItemIdsFromContext(): number[] {
        if (this._actionContext.workItemIds) {
            return this._actionContext.workItemIds;
        }

        if (this._actionContext.workItemId) {
            return [this._actionContext.workItemId];
        }

        return [];
    }
}

VSS.register('AdenEarnshaw.vsts-ticket-printing.printTicketsAction', (context) => {
    return new App();
});
VSS.notifyLoadSucceeded();
