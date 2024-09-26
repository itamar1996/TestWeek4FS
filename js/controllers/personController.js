"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personService_1 = require("../services/personService");
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const result = yield personService_1.personService.createNewPerson(name);
        if (!result) {
            res.status(400).json({
                err: true,
                message: 'person name missing',
                data: null
            });
        }
        res.status(200).json({
            err: false,
            message: 'person created',
        });
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: 'beefer not created',
            data: null
        });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personid = req.params.id;
        const { beeferId } = req.body;
        const result = yield personService_1.personService.updatePerson(Number(personid), Number(beeferId));
        if (!result) {
            res.status(400).json({
                err: true,
                message: 'person not found',
                data: null
            });
        }
        res.status(200).json({
            err: false,
            message: 'person update',
        });
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: 'beefer not created',
            data: null
        });
    }
}));
exports.default = router;
