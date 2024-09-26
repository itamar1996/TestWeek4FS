"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusEnum_1 = __importDefault(require("./statusEnum"));
class Beefer {
    constructor(name) {
        this.name = name;
        this.id = 0;
        this.status = statusEnum_1.default[0];
        this.detonated_at = null;
        this.longitude = 0;
        this.latitude = 0;
        this.created_at = new Date;
    }
}
exports.default = Beefer;
