define(["require", "exports", "./card.layout"], function (require, exports, card_layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CardHtmlBuilder = /** @class */ (function () {
        function CardHtmlBuilder() {
            this._cardCount = 0;
            var doc = document.implementation.createHTMLDocument();
            var styleNode = doc.createElement('style');
            styleNode.innerHTML = card_layout_1.CardLayout.cardCss;
            doc.head.appendChild(styleNode);
            this._doc = doc;
            this.createNewRow();
        }
        CardHtmlBuilder.prototype.addCard = function (ticketItem) {
            var domParser = new DOMParser();
            var cardDoc = domParser.parseFromString(card_layout_1.CardLayout.cardHtml, 'text/html');
            cardDoc.getElementById('work-item-id').innerText = "#" + ticketItem.id;
            cardDoc.getElementById('work-item-title').innerText = ticketItem.title;
            cardDoc.getElementById('work-item-effort').innerText = ticketItem.effort;
            cardDoc.getElementById('work-item-accent').style.backgroundColor = ticketItem.accent;
            var tagsContainer = cardDoc.getElementById('work-item-tags');
            ticketItem.tags.forEach(function (tag) {
                var tagHtml = card_layout_1.CardLayout.getTagHtml(tag);
                tagsContainer.insertAdjacentHTML('beforeend', tagHtml);
            });
            var cardNode = this._doc.createElement('div');
            cardNode.classList.add('col');
            cardNode.classList.add('card-holder');
            cardNode.innerHTML = cardDoc.body.innerHTML;
            this._cardContainer.appendChild(cardNode);
            this._cardCount++;
            if (this._cardCount % 4 == 0) {
                this.createNewRow();
            }
            return this;
        };
        CardHtmlBuilder.prototype.build = function () {
            var pageBreaks = this._doc.getElementsByClassName('pagebreak');
            this._doc.body.removeChild(pageBreaks[pageBreaks.length - 1]);
            return this._doc.documentElement.outerHTML;
        };
        CardHtmlBuilder.prototype.createNewRow = function () {
            var cardContainer = this._doc.createElement('div');
            cardContainer.classList.add('row');
            var pageBreakNode = this._doc.createElement('div');
            pageBreakNode.classList.add('pagebreak');
            this._doc.body.appendChild(cardContainer);
            this._doc.body.appendChild(pageBreakNode);
            this._cardContainer = cardContainer;
        };
        return CardHtmlBuilder;
    }());
    exports.CardHtmlBuilder = CardHtmlBuilder;
});
