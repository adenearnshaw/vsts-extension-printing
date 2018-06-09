import { TicketItem } from "../tickets/ticket-item";
import { CardHtmlBuilder } from "./card-html.builder";

export class HtmlTicketsDocumentBuilder {
    public generateDocumentHtml(ticketItems: TicketItem[]):string{
        const ticketHtmlBuilder = new CardHtmlBuilder();

        ticketItems.forEach((ticketItem, index) => {
            ticketHtmlBuilder.addCard(ticketItem);
        });

        const ticketsHtml = ticketHtmlBuilder.build();

        return ticketsHtml;
    }
}