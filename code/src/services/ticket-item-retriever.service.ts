import RestClient = require('TFS/WorkItemTracking/RestClient');
import Contracts = require('TFS/WorkItemTracking/Contracts');

import Tickets = require('../tickets/tickets.module');
import { WorkItemFieldKeyConstants } from './work-item-field-keys.constants';

export class TicketItemRetrieverService {
    private _workItemTypes: Contracts.WorkItemType[];

    constructor() {}

    public async retrieveTicketItems(projectName: string, workItemIds: number[]) {
        const client = RestClient.getClient();

        const workItemFields: string[] = Object.keys(WorkItemFieldKeyConstants).map(k => WorkItemFieldKeyConstants[k]);

        this._workItemTypes = await client.getWorkItemTypes(projectName);
        const workItems = await client.getWorkItems(workItemIds, workItemFields);
        const ticketItems: Tickets.TicketItem[] = workItems.map(wi => this.buildTicketItem(wi));

        return ticketItems;
    }

    private buildTicketItem(workItem: Contracts.WorkItem): Tickets.TicketItem {
        const workItemType = this._workItemTypes.filter(wi => wi.name == workItem.fields[WorkItemFieldKeyConstants.itemType])[0];

        const ticketItem: Tickets.TicketItem = {
            id: <number>workItem.fields[WorkItemFieldKeyConstants.id],
            itemType: workItemType.name,
            title: <string>workItem.fields[WorkItemFieldKeyConstants.title],

            accentColor: this.extractAccent(workItemType),
            acceptanceCriteria: workItem.fields[WorkItemFieldKeyConstants.acceptanceCriteria],
            areaPath: workItem.fields[WorkItemFieldKeyConstants.areaPath],
            description: workItem.fields[WorkItemFieldKeyConstants.description],
            dueDate: workItem.fields[WorkItemFieldKeyConstants.dueDate],
            effort: workItem.fields[WorkItemFieldKeyConstants.effort] as number,
            iconUrl: workItemType.icon.url,
            isBlocked: this.extractIsBlocked(workItem.fields[WorkItemFieldKeyConstants.isBlocked]),
            iterationPath: workItem.fields[WorkItemFieldKeyConstants.iterationPath],
            priority: workItem.fields[WorkItemFieldKeyConstants.priority] as number,
            reproSteps: workItem.fields[WorkItemFieldKeyConstants.reproSteps],
            tags: this.extractTags(workItem.fields[WorkItemFieldKeyConstants.tags]),
            teamProject: workItem.fields[WorkItemFieldKeyConstants.teamProject]
        };

        console.log(ticketItem);
        return ticketItem;
    }

    private extractAccent(workItemType: Contracts.WorkItemType): string {
        if (!workItemType) {
            return '#FFFFFF';
        }

        const accent = `#${workItemType.color}`;
        return accent;
    }

    public extractIsBlocked(blocked: string): boolean {
        return blocked === 'Yes';
    }

    private extractTags(tagsRaw: string): string[] {
        if (!tagsRaw) {
            return [];
        }
        return tagsRaw.split(';').map(s => s.trim());
    }
}
