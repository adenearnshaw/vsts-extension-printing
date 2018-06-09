import RestClient = require('TFS/WorkItemTracking/RestClient');
import Contracts = require('TFS/WorkItemTracking/Contracts');
import Tickets = require('../tickets/tickets.module');

export class TicketItemRetrieverService {
    private _workItemTypes: Contracts.WorkItemType[];

    private _workItemFieldKeys: any = {
        'id': 'System.Id',
        'title': 'System.Title',
        'itemType': 'System.WorkItemType',
        'effort': 'Microsoft.VSTS.Scheduling.Effort',
        'tags': 'System.Tags'
    };

    constructor() { }

    public async retrieveTicketItems(projectName: string, workItemIds: number[]) {
        const client = RestClient.getClient();

        const workItemFields: string[] = Object.keys(this._workItemFieldKeys).map(k => this._workItemFieldKeys[k]);

        this._workItemTypes = await client.getWorkItemTypes(projectName);
        const workItems = await client.getWorkItems(workItemIds, workItemFields);
        const ticketItems: Tickets.TicketItem[] = workItems.map(wi => this.buildTicketItem(wi));

        return ticketItems;
    }

    private buildTicketItem(workItem: Contracts.WorkItem): Tickets.TicketItem {
        const ticketItem: Tickets.TicketItem = {
            id: <number>workItem.fields[this._workItemFieldKeys['id']],
            title: <string>workItem.fields[this._workItemFieldKeys['title']],
            effort: this.extractEffort(workItem.fields[this._workItemFieldKeys['effort']]),
            tags: this.extractTags(workItem.fields[this._workItemFieldKeys['tags']]),
            accent: this.extractAccent(workItem.fields[this._workItemFieldKeys['itemType']])
        };
        return ticketItem;
    }

    private extractEffort(effortRaw:string): string{
        if (!effortRaw){
            return "-";
        }
        return effortRaw;
    }

    private extractTags(tagsRaw:string):string[] {
        if (!tagsRaw){
            return [];
        }
        return tagsRaw.split(';').map(s => s.trim());
    }

    private extractAccent(itemType:string): string {
        const workItemType = this._workItemTypes.filter(wi => wi.name == itemType)[0];
        
        if (!workItemType){
            return '#FFFFFF';
        }

        const accent = `#${workItemType.color}`;
        return accent;
    }
}
