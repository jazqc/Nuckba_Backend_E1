import inquirer from "inquirer";
import { IExpense } from "../interfaces/interfaces";
import { getWithFS } from "./fsMethods";

export const newExpensePrompt = async (): Promise<IExpense> => {
  return await inquirer.prompt([
    {
      default: await setId(),
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
};

/**
 * setea un id para cada gasto de manera random
 */

const setId = async () => {
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
};

/**
 * valida el formato de fecha
 */

function validateDate(input: string) {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!pattern.test(input)) {
    return 'Ingresa una fecha válida en el formato "YYYY-MM-DD"';
  }
  return true;
}

/**
 * recorre el array de gastos, los convierte en choices para seleccionar el gasto a eliminar y devuelve la ubicación del gasto dentro de la base
 */

export const deleteExpensePrompt = async (): Promise<number> => {
  const options: IExpense[] = await getWithFS("expenses");

  const selected = await inquirer.prompt([
    {
      type: "list",
      name: "delExp",
      message: "Seleccione el gasto a eliminar:",
      choices: options.map(
        (expense) =>
          `${expense.id} ${expense.date} ${expense.category} ${expense.amount} ${expense.description}`
      ),
    },
  ]);

  const selectedId: string = selected.delExp.substring(0, 8);
  const expenses: IExpense[] = await getWithFS("expenses");
  const index: number = expenses.findIndex(
    (expense) => expense.id === selectedId
  );
  return index;
};
