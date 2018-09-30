export interface TicketItem {
    id: number;
    itemType: string;
    title: string;
    
    accentColor?: string;
    acceptanceCriteria?: string;
    areaPath?: string; 
    description?: string;
    dueDate?: string;
    effort?: number;
    iconUrl?: string;
    isBlocked?: boolean;
    iterationPath?: string;
    priority?: number;
    reproSteps?: string;
    tags?: string[];
    teamProject?: string;
}
