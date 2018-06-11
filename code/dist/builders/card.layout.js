define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CardLayout = /** @class */ (function () {
        function CardLayout() {
        }
        Object.defineProperty(CardLayout, "cardCss", {
            get: function () {
                return this._cardCss;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CardLayout, "cardHtml", {
            get: function () {
                return this._cardHtml;
            },
            enumerable: true,
            configurable: true
        });
        CardLayout.getTagHtml = function (tagText) {
            return "<span class=\"tag\">" + tagText + "</span>";
        };
        CardLayout._cardCss = '\
        body {\
            -webkit-print-color-adjust: exact !important;\
            background-color: #FFFFFF;\
            font-family: Arial, Helvetica, sans-serif;\
        }\
        .row {\
            display: flex;\
            flex-wrap: wrap;\
            width: 1400px;\
            margin-left: auto;\
            margin-right: auto;\
            margin-top: 20px;\
        }\
        .col {\
            flex-basis: 0;\
            flex-grow: 1;\
            max-width: 100%;\
        }\
        .work-item-card {\
            border: 1px solid #000000;\
            margin: 20px 10px;\
            background-color: #FFFFFF;\
            width: 660px;\
            height: 440px;\
        }\
        .accent-section {\
            width: 16px;\
            height: 100%;\
            float: left;\
            background-color: royalblue;\
        }\
        .main-section {\
            margin-left: 16px;\
            padding: 0 20px;\
        }\
        .tag-container {\
            margin: 10px 0;\
        }\
        .tag-container>.tag {\
            background-color: rgb(204, 204, 204);\
            font-weight: bold;\
            padding: 5px;\
            margin-right: 10px;\
        }\
        .ticket-title {\
            margin-top: 34px;\
        }\
        .effort-section {\
            float: right;\
            position: relative;\
            z-index: 5;\
            margin-top: 20px;\
            margin-right: 15px;\
        }\
        .effort-section>.effort-value {\
            font-weight: bold;\
            font-size: 1.5em;\
            padding-left: 5px;\
        }\
        @media all {\
            .pagebreak {\
                display:none;\
            }\
        }\
        @media print {\
            .pagebreak {\
                display: block;\
                page-break-before: always;\
                page-break-after: always;\
            }\
        }';
        CardLayout._cardHtml = '\
        <div class="work-item-card">\
            <div id="work-item-accent" class="accent-section"></div>\
            <div class="effort-section">\
                <span>Points:</span>\
                <span id="work-item-effort" class="effort-value">-</span>\
            </div>\
            <div class="main-section">\
                <h1 id="work-item-id">#000</h1>\
                <div id="work-item-tags" class="tag-container"></div>\
                <h1 id="work-item-title" class="ticket-title"></h1>\
            </div>\
        </div>';
        return CardLayout;
    }());
    exports.CardLayout = CardLayout;
});
