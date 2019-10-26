"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Response_1 = require("./Response");
var Question_1 = require("./Question");
var Survey = /** @class */ (function () {
    function Survey() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Survey.prototype, "id", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Survey.prototype, "url", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return Response_1.Response; }, function (response) { return response.survey; }),
        tslib_1.__metadata("design:type", Array)
    ], Survey.prototype, "responses", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToMany(function (type) { return Question_1.Question; }, function (question) { return question.surveys; }),
        tslib_1.__metadata("design:type", Array)
    ], Survey.prototype, "questions", void 0);
    Survey = tslib_1.__decorate([
        typeorm_1.Entity()
    ], Survey);
    return Survey;
}());
exports.Survey = Survey;
//# sourceMappingURL=Survey.js.map