"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Survey_1 = require("./Survey");
var QuestionResponse_1 = require("./QuestionResponse");
var Response = /** @class */ (function () {
    function Response() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Response.prototype, "id", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({
            nullable: true
        }),
        tslib_1.__metadata("design:type", String)
    ], Response.prototype, "email", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return Survey_1.Survey; }, function (survey) { return survey.responses; }),
        tslib_1.__metadata("design:type", Survey_1.Survey)
    ], Response.prototype, "survey", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return QuestionResponse_1.QuestionResponse; }, function (questionResponse) { return questionResponse.response; }),
        tslib_1.__metadata("design:type", Array)
    ], Response.prototype, "questionResponse", void 0);
    Response = tslib_1.__decorate([
        typeorm_1.Entity()
    ], Response);
    return Response;
}());
exports.Response = Response;
//# sourceMappingURL=Response.js.map