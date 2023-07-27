import { getWithFS, saveWithFS } from "./fsMethods";
import { deleteExpensePrompt, newExpensePrompt } from "./prompts";

/**
 * Muestra todos los gastos en consola
 */
export const getAllExpenses = async () => {
  const currentExpenses = await getWithFS("expenses");
  return currentExpenses;
};

/**
 * guarda el gasto nuevo en el json
 */
export const createExpense = async () => {
  const newExpenseData = await newExpensePrompt();
  const currentExpenses = await getWithFS("expenses");
  currentExpenses.push(newExpenseData);
  await saveWithFS("expenses", currentExpenses);
};

/**
 * calcula los gastos por categoría y el total y los muestra por consola
 */
export const resumeExpenses = async () => {
  try {
    const currentExpenses = await getWithFS("expenses");

    let totalViaticos: number = 0;
    let totalSalud: number = 0;
    let totalIndumentaria: number = 0;
    let totalRegalos: number = 0;
    let totalOtros: number = 0;
    let totalAmount: number = 0;

    currentExpenses.forEach((expense) => {
      if (expense.category === "Viáticos") {
        totalViaticos += expense.amount;
      } else if (expense.category === "Salud") {
        totalSalud += expense.amount;
      } else if (expense.category === "Indumentaria") {
        totalIndumentaria += expense.amount;
      } else if (expense.category === "Regalos") {
        totalRegalos += expense.amount;
      } else if (expense.category === "Otros") {
        totalOtros += expense.amount;
      } else {
        console.log("Ha sucedido un error");
      }
    });
    totalAmount =
      totalViaticos +
      totalSalud +
      totalIndumentaria +
      totalRegalos +
      totalOtros;

    console.log(
      `Total Viáticos: $${totalViaticos};\n Total Salud: $${totalSalud};\n Total Indumentaria: $${totalIndumentaria};\n Total Regalos: $${totalRegalos};\n Total Otros: $${totalOtros};\n La suma de sus gastos es de: $${totalAmount}`
    );
  } catch (error) {
    console.error("Error al obtener la suma", error);
  }
};

/**
 * Elimina gasto
 */
export const removeExp = async () => {
  const index = await deleteExpensePrompt();
  const currentExpenses = await getWithFS("expenses");
  currentExpenses.splice(index, 1);
  await saveWithFS("expenses", currentExpenses);
};
