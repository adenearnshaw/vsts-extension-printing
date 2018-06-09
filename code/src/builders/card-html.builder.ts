import Tickets = require('../tickets/tickets.module');

import { CardLayout } from './card.layout';

export class CardHtmlBuilder {
    private _doc: Document;
    private _cardContainer: Element;
    private _cardCount: number = 0;

    constructor() {
        var doc = document.implementation.createHTMLDocument();

        const styleNode = doc.createElement('style');
        styleNode.innerHTML = CardLayout.cardCss;
        doc.head.appendChild(styleNode);
        this._doc = doc;

        this.createNewRow();
    }

    public addCard(ticketItem: Tickets.TicketItem) {
        const domParser = new DOMParser();
        const cardDoc = domParser.parseFromString(CardLayout.cardHtml, 'text/html');

        cardDoc.getElementById('work-item-id').innerText = `#${ticketItem.id}`;
        cardDoc.getElementById('work-item-title').innerText = ticketItem.title;
        cardDoc.getElementById('work-item-effort').innerText = ticketItem.effort;
        cardDoc.getElementById('work-item-accent').style.backgroundColor = ticketItem.accent;

        var tagsContainer = cardDoc.getElementById('work-item-tags');
        ticketItem.tags.forEach(tag => {
            var tagHtml = CardLayout.getTagHtml(tag);
            tagsContainer.insertAdjacentHTML('beforeend', tagHtml);
        });

        const cardNode = this._doc.createElement('div');
        cardNode.classList.add('col');
        cardNode.classList.add('card-holder');
        cardNode.innerHTML = cardDoc.body.innerHTML;

        this._cardContainer.appendChild(cardNode);
        this._cardCount++;

        if (this._cardCount % 4 == 0) {
            this.createNewRow();
        }

        return this;
    }

    public build(): string {
        const pageBreaks = this._doc.getElementsByClassName('pagebreak');
        this._doc.body.removeChild(pageBreaks[pageBreaks.length-1]);
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
