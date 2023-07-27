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
exports.deleteExpensePrompt = exports.newExpensePrompt = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const fsMethods_1 = require("./fsMethods");
const newExpensePrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield inquirer_1.default.prompt([
        {
            default: yield setId(),
            name: "id",
        },
        {
            type: "input",
            name: "date",
            message: 'Ingresa una fecha en el formato "YYYY-MM-DD":',
            validate: validateDate,
        },
        {
            type: "list",
            name: "category",
            message: "Ingrese la categoría de su gasto:",
            choices: ["Viáticos", "Salud", "Indumentaria", "Regalos", "Otros gastos"],
        },
        {
            type: "number",
            name: "amount",
            message: "Ingrese el monto:",
        },
        {
            type: "input",
            name: "description",
            message: "descripción del gasto(opcional):",
        },
    ]);
});
exports.newExpensePrompt = newExpensePrompt;
/**
 * setea un id para cada gasto de manera random
 */
const setId = () => __awaiter(void 0, void 0, void 0, function* () {
    const hexDigits = "abcdef0123456789";
    const generateId = Array(8).fill(null);
    const id = generateId
        .map((e, i) => {
        return i === 8 || i === 13 || i === 18 || i === 23
            ? "-"
            : hexDigits[Math.floor(Math.random() * hexDigits.length)];
    })
        .join("");
    return id;
});
/**
 * valida el formato de fecha
 */
function validateDate(input) {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!pattern.test(input)) {
        return 'Ingresa una fecha válida en el formato "YYYY-MM-DD"';
    }
    return true;
}
/**
 * recorre el array de gastos, los convierte en choices para seleccionar el gasto a eliminar y devuelve la ubicación del gasto dentro de la base
 */
const deleteExpensePrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = yield (0, fsMethods_1.getWithFS)("expenses");
    const selected = yield inquirer_1.default.prompt([
        {
            type: "list",
            name: "delExp",
            message: "Seleccione el gasto a eliminar:",
            choices: options.map((expense) => `${expense.id} ${expense.date} ${expense.category} ${expense.amount} ${expense.description}`),
        },
    ]);
    const selectedId = selected.delExp.substring(0, 8);
    const expenses = yield (0, fsMethods_1.getWithFS)("expenses");
    const index = expenses.findIndex((expense) => expense.id === selectedId);
    return index;
});
exports.deleteExpensePrompt = deleteExpensePrompt;
