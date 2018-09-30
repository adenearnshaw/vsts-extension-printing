var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "TFS/WorkItemTracking/RestClient", "./work-item-field-keys.constants"], function (require, exports, RestClient, work_item_field_keys_constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TicketItemRetrieverService = /** @class */ (function () {
        function TicketItemRetrieverService() {
        }
        TicketItemRetrieverService.prototype.retrieveTicketItems = function (projectName, workItemIds) {
            return __awaiter(this, void 0, void 0, function () {
                var client, workItemFields, _a, workItems, ticketItems;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            client = RestClient.getClient();
                            workItemFields = Object.keys(work_item_field_keys_constants_1.WorkItemFieldKeyConstants).map(function (k) { return work_item_field_keys_constants_1.WorkItemFieldKeyConstants[k]; });
                            _a = this;
                            return [4 /*yield*/, client.getWorkItemTypes(projectName)];
                        case 1:
                            _a._workItemTypes = _b.sent();
                            return [4 /*yield*/, client.getWorkItems(workItemIds, workItemFields)];
                        case 2:
                            workItems = _b.sent();
                            ticketItems = workItems.map(function (wi) { return _this.buildTicketItem(wi); });
                            return [2 /*return*/, ticketItems];
                    }
                });
            });
        };
        TicketItemRetrieverService.prototype.buildTicketItem = function (workItem) {
            var workItemType = this._workItemTypes.filter(function (wi) { return wi.name == workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.itemType]; })[0];
            var ticketItem = {
                id: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.id],
                itemType: workItemType.name,
                title: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.title],
                accentColor: this.extractAccent(workItemType),
                areaPath: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.areaPath],
                description: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.description],
                dueDate: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.dueDate],
                effort: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.effort],
                iconUrl: workItemType.icon.url,
                isBlocked: this.extractIsBlocked(workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.isBlocked]),
                iterationPath: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.iterationPath],
                priority: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.priority],
                reproSteps: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.reproSteps],
                tags: this.extractTags(workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.tags]),
                teamProject: workItem.fields[work_item_field_keys_constants_1.WorkItemFieldKeyConstants.teamProject]
            };
            console.log(ticketItem);
            return ticketItem;
        };
        TicketItemRetrieverService.prototype.extractAccent = function (workItemType) {
            if (!workItemType) {
                return '#FFFFFF';
            }
            var accent = "#" + workItemType.color;
            return accent;
        };
        TicketItemRetrieverService.prototype.extractIsBlocked = function (blocked) {
            return blocked === 'Yes';
        };
        TicketItemRetrieverService.prototype.extractTags = function (tagsRaw) {
            if (!tagsRaw) {
                return [];
            }
            return tagsRaw.split(';').map(function (s) { return s.trim(); });
        };
        return TicketItemRetrieverService;
    }());
    exports.TicketItemRetrieverService = TicketItemRetrieverService;
});
