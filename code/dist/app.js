define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
        }
        App.prototype.execute = function (actionContext) {
            this._actionContext = actionContext;
            console.log('Print clicked');
        };
        return App;
    }());
    exports.App = App;
    VSS.register('AdenEarnshaw.vsts-ticket-printing.printTicketsAction', function (context) {
        return new App();
    });
    VSS.notifyLoadSucceeded();
});
