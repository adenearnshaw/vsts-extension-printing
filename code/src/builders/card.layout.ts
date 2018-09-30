export class CardLayout {
    public static get cardCss(): string {
        return this._cardCss;
    }
   
    private static _cardCss: string = '\
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
            overflow: hidden;\
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
        .ticket-description p {\
            margin: 0 0 10px 0;\
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

    
}