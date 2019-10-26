"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Question_1 = require("./Question");
var Response_1 = require("./Response");
var QuestionResponse = /** @class */ (function () {
    function QuestionResponse() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], QuestionResponse.prototype, "questionResponse", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 300 }),
        tslib_1.__metadata("design:type", String)
    ], QuestionResponse.prototype, "answer", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return Question_1.Question; }, function (question) { return question.questionResponse; }),
        tslib_1.__metadata("design:type", Question_1.Question)
    ], QuestionResponse.prototype, "question", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return Response_1.Response; }, function (response) { return response.questionResponse; }),
        tslib_1.__metadata("design:type", Response_1.Response)
    ], QuestionResponse.prototype, "response", void 0);
    QuestionResponse = tslib_1.__decorate([
        typeorm_1.Entity()
    ], QuestionResponse);
    return QuestionResponse;
}());
exports.QuestionResponse = QuestionResponse;
//# sourceMappingURL=QuestionResponse.js.map