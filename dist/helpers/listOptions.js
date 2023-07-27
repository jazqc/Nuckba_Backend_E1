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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExp = exports.resumeExpenses = exports.createExpense = exports.getAllExpenses = void 0;
const fsMethods_1 = require("./fsMethods");
const prompts_1 = require("./prompts");
/**
 * Muestra todos los gastos en consola
 */
const getAllExpenses = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentExpenses = yield (0, fsMethods_1.getWithFS)("expenses");
    return currentExpenses;
});
exports.getAllExpenses = getAllExpenses;
/**
 * guarda el gasto nuevo en el json
 */
const createExpense = () => __awaiter(void 0, void 0, void 0, function* () {
    const newExpenseData = yield (0, prompts_1.newExpensePrompt)();
    const currentExpenses = yield (0, fsMethods_1.getWithFS)("expenses");
    currentExpenses.push(newExpenseData);
    yield (0, fsMethods_1.saveWithFS)("expenses", currentExpenses);
});
exports.createExpense = createExpense;
/**
 * calcula los gastos por categoría y el total y los muestra por consola
 */
const resumeExpenses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentExpenses = yield (0, fsMethods_1.getWithFS)("expenses");
        let totalViaticos = 0;
        let totalSalud = 0;
        let totalIndumentaria = 0;
        let totalRegalos = 0;
        let totalOtros = 0;
        let totalAmount = 0;
        currentExpenses.forEach((expense) => {
            if (expense.category === "Viáticos") {
                totalViaticos += expense.amount;
            }
            else if (expense.category === "Salud") {
                totalSalud += expense.amount;
            }
            else if (expense.category === "Indumentaria") {
                totalIndumentaria += expense.amount;
            }
            else if (expense.category === "Regalos") {
                totalRegalos += expense.amount;
            }
            else if (expense.category === "Otros") {
                totalOtros += expense.amount;
            }
            else {
                console.log("Ha sucedido un error");
            }
        });
        totalAmount =
            totalViaticos +
                totalSalud +
                totalIndumentaria +
                totalRegalos +
                totalOtros;
        console.log(`Total Viáticos: $${totalViaticos};\n Total Salud: $${totalSalud};\n Total Indumentaria: $${totalIndumentaria};\n Total Regalos: $${totalRegalos};\n Total Otros: $${totalOtros};\n La suma de sus gastos es de: $${totalAmount}`);
    }
    catch (error) {
        console.error("Error al obtener la suma", error);
    }
});
exports.resumeExpenses = resumeExpenses;
/**
 * Elimina gasto
 */
const removeExp = () => __awaiter(void 0, void 0, void 0, function* () {
    const index = yield (0, prompts_1.deleteExpensePrompt)();
    const currentExpenses = yield (0, fsMethods_1.getWithFS)("expenses");
    currentExpenses.splice(index, 1);
    yield (0, fsMethods_1.saveWithFS)("expenses", currentExpenses);
});
exports.removeExp = removeExp;
