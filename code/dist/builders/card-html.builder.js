define(["require", "exports", "handlebars", "./card.layout"], function (require, exports, Handlebars, card_layout_1) {
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
            var handlebarTemplate = document.getElementById("default-template").innerHTML;
            this._templateConverter = Handlebars.compile(handlebarTemplate);
            this.createNewRow();
        }
        CardHtmlBuilder.prototype.addCard = function (ticketItem) {
            var templateHtml = this._templateConverter(ticketItem);
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
