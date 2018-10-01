define(["require", "exports", "./card.layout"], function (require, exports, card_layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CardHtmlBuilder = /** @class */ (function () {
        function CardHtmlBuilder() {
            this._cardCount = 0;
            var doc = document.implementation.createHTMLDocument();
            var styleNode = doc.createElement("style");
            styleNode.innerHTML = card_layout_1.CardLayout.cardCss;
            doc.head.appendChild(styleNode);
            this._doc = doc;
            this.createNewRow();
        }
        CardHtmlBuilder.prototype.addCard = function (ticketItem) {
            var templateHtml;
            if (ticketItem.teamProject === "TeamTesla") {
                templateHtml = handlebarTemplates.template_card_simple(ticketItem);
            }
            else {
                templateHtml = handlebarTemplates.template_card_detailed(ticketItem);
            }
            var cardNode = this._doc.createElement("div");
            cardNode.classList.add("col");
            cardNode.classList.add("card-holder");
            cardNode.innerHTML = templateHtml;
            this._cardContainer.appendChild(cardNode);
            this._cardCount++;
            if (this._cardCount % 4 == 0) {
                this.createNewRow();
            }
            return this;
        };
        CardHtmlBuilder.prototype.build = function () {
            var pageBreaks = this._doc.getElementsByClassName("pagebreak");
            this._doc.body.removeChild(pageBreaks[pageBreaks.length - 1]);
            return this._doc.documentElement.outerHTML;
        };
        CardHtmlBuilder.prototype.createNewRow = function () {
            var cardContainer = this._doc.createElement("div");
            cardContainer.classList.add("row");
            var pageBreakNode = this._doc.createElement("div");
            pageBreakNode.classList.add("pagebreak");
            this._doc.body.appendChild(cardContainer);
            this._doc.body.appendChild(pageBreakNode);
            this._cardContainer = cardContainer;
        };
        return CardHtmlBuilder;
    }());
    exports.CardHtmlBuilder = CardHtmlBuilder;
});
