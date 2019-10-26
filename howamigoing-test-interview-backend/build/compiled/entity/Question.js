"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Survey_1 = require("./Survey");
var QuestionResponse_1 = require("./QuestionResponse");
var Types;
(function (Types) {
    Types["TEXT"] = "Text";
    Types["LIKERT"] = "Likert";
})(Types = exports.Types || (exports.Types = {}));
var Question = /** @class */ (function () {
    function Question() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Question.prototype, "id", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({
            type: "enum",
            enum: Types,
            default: Types.TEXT
        }),
        tslib_1.__metadata("design:type", String)
    ], Question.prototype, "type", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("text"),
        tslib_1.__metadata("design:type", String)
    ], Question.prototype, "text", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToMany(function (type) { return Survey_1.Survey; }),
        typeorm_1.JoinTable(),
        tslib_1.__metadata("design:type", Array)
    ], Question.prototype, "surveys", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return QuestionResponse_1.QuestionResponse; }, function (questionResponse) { return questionResponse.question; }),
        tslib_1.__metadata("design:type", Array)
    ], Question.prototype, "questionResponse", void 0);
    Question = tslib_1.__decorate([
        typeorm_1.Entity()
    ], Question);
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=Question.js.map