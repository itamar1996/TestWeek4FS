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
exports.personService = void 0;
const filleDataLayer_1 = require("../config/filleDataLayer");
const person_1 = __importDefault(require("../models/person"));
class personService {
    static createNewPerson(personName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!personName) {
                return false;
            }
            const beefer = new person_1.default(personName);
            let persons = yield (0, filleDataLayer_1.getFilleData)('persons');
            if (!persons)
                persons = [];
            beefer.id = persons.length + 1;
            persons.push(beefer);
            (0, filleDataLayer_1.saveFilleData)('persons', persons);
            return true;
        });
    }
    static updatePerson(personId, beeferId) {
        return __awaiter(this, void 0, void 0, function* () {
            let persons = yield (0, filleDataLayer_1.getFilleData)('persons');
            const person = persons.find(p => p.id == personId);
            if (!person) {
                return false;
            }
            person.beeferId = beeferId;
            (0, filleDataLayer_1.saveFilleData)('persons', persons);
            return true;
        });
    }
}
exports.personService = personService;
