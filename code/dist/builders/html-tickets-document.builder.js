define(["require", "exports", "./card-html.builder"], function (require, exports, card_html_builder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HtmlTicketsDocumentBuilder = /** @class */ (function () {
        function HtmlTicketsDocumentBuilder() {
        }
        HtmlTicketsDocumentBuilder.prototype.generateDocumentHtml = function (ticketItems) {
            var ticketHtmlBuilder = new card_html_builder_1.CardHtmlBuilder();
            ticketItems.forEach(function (ticketItem, index) {
                ticketHtmlBuilder.addCard(ticketItem);
            });
            var ticketsHtml = ticketHtmlBuilder.build();
            return ticketsHtml;
        };
        return HtmlTicketsDocumentBuilder;
    }());
    exports.HtmlTicketsDocumentBuilder = HtmlTicketsDocumentBuilder;
});
