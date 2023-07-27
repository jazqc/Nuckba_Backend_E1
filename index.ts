import inquirer from "inquirer";
import {
  createExpense,
  getAllExpenses,
  removeExp,
  resumeExpenses,
} from "./helpers/listOptions";


const main = async () => {
  let run = true;

  while (run) {
    const action = await inquirer.prompt([
      {
        type: "list",
        name: "chosenItem",
        message: "Seleccione una acción:",
        choices: [
          {
            value: 1,
            name: "Cargar nuevo gasto",
          },
          {
            value: 2,
            name: "Ver todos los gastos",
          },
          {
            value: 3,
            name: "Eliminar un gasto",
          },
          {
            value: 4,
            name: "Resumen de gastos",
          },
          {
            value: 5,
            name: "SALIR",
          },
        ],
      },
    ]);

    switch (action.chosenItem) {
      case 1:
        await createExpense();
        break;
      case 2:
        const currentExpenses = await getAllExpenses();
        console.log(currentExpenses)
        break;
      case 3:
        await removeExp();
        break;
      case 4:
        await resumeExpenses();
        break;
      case 5:
        run = false;
      default:
        run = false;
        break;
    }
  }
};

main();



