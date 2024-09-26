"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beeferControllers_1 = __importDefault(require("./controllers/beeferControllers"));
const personController_1 = __importDefault(require("./controllers/personController"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/beepers', beeferControllers_1.default);
app.use('/api/persons', personController_1.default);
app.listen(process.env.PORT, () => console.log(`See you at http::localhost:${process.env.PORT}`));
