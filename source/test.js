"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress_1 = __importDefault(require("progress"));
const progress = progress_1.default.create().step('the task you are currently performing');
// use an array of steps that execute one second after each other
// as if we do them all instantly
// you won't see the progress bar as it will be instant
const steps = [
    () => progress.setTotal(5),
    () => progress.setTick(1),
    () => progress.setTick(2),
    () => progress.setTick(3),
    () => progress.addTick(),
    () => progress.addTick(),
    () => progress.finish() // remove and destroy the progress bar
];
steps.forEach(function (step, index) {
    setTimeout(step, index * 1000);
});
//# sourceMappingURL=test.js.map