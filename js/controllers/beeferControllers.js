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
const beeferSerice_1 = require("../services/beeferSerice");
const statusEnum_1 = __importDefault(require("../models/statusEnum"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const result = yield beeferSerice_1.BefferService.createNewBeefer(name);
        if (!result) {
            res.status(400).json({
                err: true,
                message: 'beefer name missing',
                data: null
            });
        }
        res.status(200).json({
            err: false,
            message: 'beefer created',
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
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beefers = yield beeferSerice_1.BefferService.getAllBeefers();
        let mymessage = "sucses";
        if (beefers.length == 0) {
            mymessage = "you dont have beefers";
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: beefers
        });
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let beefer = yield beeferSerice_1.BefferService.getBeeferById(Number(req.params.id));
        let mymessage = "sucses";
        if (!beefer) {
            mymessage = "beefer not found";
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: beefer
        });
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        });
    }
}));
router.get('/status/:status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beefers = yield beeferSerice_1.BefferService.getBeeferByStatus(req.params.status);
        let mymessage = "sucses";
        if (beefers.length == 0) {
            mymessage = "you dont have beefers machig to status";
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: beefers
        });
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield beeferSerice_1.BefferService.deleteBeefer(Number(req.params.id));
        let mymessage = "sucses delete";
        if (!result) {
            mymessage = "beefer not found";
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: result
        });
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        });
    }
}));
router.put('/:id/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        let result;
        let mymessage = "sucses update";
        if (status == statusEnum_1.default.deployed) {
            const LON = req.body["LON"];
            const LAT = req.body["LAT"];
            if (!LAT || !LON) {
                res.status(400).json({
                    err: true,
                    message: 'missing lon or lat',
                    data: null
                });
                return;
            }
            result = yield beeferSerice_1.BefferService.explosionBeeferUpdate(Number(req.params.id), LON, LAT);
        }
        else {
            result = yield beeferSerice_1.BefferService.updateBeeferStatus(Number(req.params.id), status);
        }
        console.log(result);
        if (!result) {
            mymessage = "not found beefer";
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: result
        });
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        });
    }
}));
exports.default = router;
