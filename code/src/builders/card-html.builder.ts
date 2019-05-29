import Tickets = require('../tickets/tickets.module');
import { CardLayout } from './card.layout';

declare var handlebarTemplates: any;

export class CardHtmlBuilder {
    private _doc: Document;
    private _cardContainer: Element;
    private _cardCount: number = 0;

    constructor() {
        const doc = document.implementation.createHTMLDocument();

        const styleNode = doc.createElement('style');
        styleNode.innerHTML = CardLayout.cardCss;
        doc.head.appendChild(styleNode);
        this._doc = doc;

        this.createNewRow();
    }

    public addCard(ticketItem: Tickets.TicketItem) {
        const templateHtml = handlebarTemplates.template_card_simple(ticketItem);
        // const templateHtml = handlebarTemplates.template_card_detailed(ticketItem);

        const cardNode = this._doc.createElement('div');
        cardNode.classList.add('col');
        cardNode.classList.add('card-holder');
        cardNode.innerHTML = templateHtml;

        this._cardContainer.appendChild(cardNode);
        this._cardCount++;

        if (this._cardCount % 4 == 0) {
            this.createNewRow();
        }

        return this;
    }

    public build(): string {
        const pageBreaks = this._doc.getElementsByClassName('pagebreak');
        this._doc.body.removeChild(pageBreaks[pageBreaks.length - 1]);
        return this._doc.documentElement.outerHTML;
    }

    private createNewRow(): void {
        const cardContainer = this._doc.createElement('div');
        cardContainer.classList.add('row');

        const pageBreakNode = this._doc.createElement('div');
        pageBreakNode.classList.add('pagebreak');

        this._doc.body.appendChild(cardContainer);
        this._doc.body.appendChild(pageBreakNode);

        this._cardContainer = cardContainer;
    }
}
