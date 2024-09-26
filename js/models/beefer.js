"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Beefer {
    constructor(name) {
        this.name = name;
        this.id = 0;
        this.status = Status.manufactured;
        this.detonated_at = null;
        this.longitude = 0;
        this.latitude = 0;
        this.created_at = new Date;
    }
}
exports.default = Beefer;
