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
exports.BefferService = void 0;
const beefer_1 = __importDefault(require("../models/beefer"));
const statusEnum_1 = __importDefault(require("../models/statusEnum"));
const filleDataLayer_1 = require("../config/filleDataLayer");
class BefferService {
    static createNewBeefer(beeferName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!beeferName) {
                return false;
            }
            const beefer = new beefer_1.default(beeferName);
            let beefers = yield (0, filleDataLayer_1.getFilleData)('beefers');
            if (!beefers)
                beefers = [];
            beefer.id = beefers.length + 1;
            beefers.push(beefer);
            (0, filleDataLayer_1.saveFilleData)('beefers', beefers);
            return true;
        });
    }
    static getAllBeefers() {
        return __awaiter(this, void 0, void 0, function* () {
            let beefers = yield (0, filleDataLayer_1.getFilleData)('beefers');
            if (!beefers)
                beefers = [];
            return beefers;
        });
    }
    static getBeeferById(beeferId) {
        return __awaiter(this, void 0, void 0, function* () {
            let beefers = yield (0, filleDataLayer_1.getFilleData)('beefers');
            const beefer = beefers.find(b => b.id == beeferId);
            if (!beefer) {
                return false;
            }
            return beefer;
        });
    }
    static getBeeferByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            let beefers = yield (0, filleDataLayer_1.getFilleData)('beefers');
            beefers = beefers.filter(b => b.status == status);
            return beefers;
        });
    }
    static deleteBeefer(beeferId) {
        return __awaiter(this, void 0, void 0, function* () {
            let beefers = yield (0, filleDataLayer_1.getFilleData)('beefers');
            const beeferindex = beefers.findIndex(b => b.id == beeferId);
            if (beeferindex == -1) {
                return false;
            }
            beefers.splice(beeferindex, 1);
            (0, filleDataLayer_1.saveFilleData)('beefers', beefers);
            return true;
        });
    }
    static updateBeeferStatus(beeferId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let beefers = yield (0, filleDataLayer_1.getFilleData)('beefers');
            const beefer = beefers.find(b => b.id == beeferId);
            if (!beefer) {
                return false;
            }
            const currStatusIndex = statusEnum_1.default.indexOf(beefer.status);
            const getStatusIndex = statusEnum_1.default.indexOf(status);
            if (getStatusIndex - currStatusIndex != 1 || getStatusIndex == -1) {
                return false;
            }
            beefer.status = status;
            (0, filleDataLayer_1.saveFilleData)('beefers', beefers);
            return true;
        });
    }
    static explosionBeeferUpdate(beeferId, lon, lat) {
        return __awaiter(this, void 0, void 0, function* () {
            let beefers = yield (0, filleDataLayer_1.getFilleData)('beefers');
            const beefer = beefers.find(b => b.id == beeferId);
            const persons = yield (0, filleDataLayer_1.getFilleData)('persons');
            const person = persons.find(p => p.beeferId == beeferId);
            if (person) {
                person.status = false;
                console.log(person);
                // await saveFilleData("persons",persons)
            }
            if (!beefer) {
                return false;
            }
            beefer.latitude = lat;
            beefer.longitude = lon;
            return new Promise((resolve) => {
                setTimeout(() => {
                    beefer.status = statusEnum_1.default[4];
                    resolve(true);
                    beefer.detonated_at = new Date;
                    (0, filleDataLayer_1.saveFilleData)('beefers', beefers);
                    (0, filleDataLayer_1.saveFilleData)("persons", persons);
                }, 5000);
            });
        });
    }
}
exports.BefferService = BefferService;
