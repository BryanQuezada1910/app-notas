import { addNote, listNotes, deleteNote, readNote, editNote } from "./utiles/notas.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import readline from "readline";

// Configuración de yargs
yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Añadir una nota',
    builder: {
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string'
      },
      body: {
        describe: 'Cuerpo de la nota',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      addNote(argv.title, argv.body);
    }
  })
  .command({
    command: 'remove',
    describe: 'Eliminar una nota',
    builder: {
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      deleteNote(argv.title);
    }
  })
  .command({
    command: 'list',
    describe: 'Listar todas las notas',
    handler() {
      listNotes();
    }
  })
  .command({
    command: 'read',
    describe: 'Leer una nota',
    builder: {
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      readNote(argv.title);
    }
  })
  .command({
    command: 'edit',
    describe: 'Editar una nota',
    builder: {
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string'
      },
      body: {
        describe: 'Cuerpo de la nota',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      editNote(argv.title, argv.body);
    }
  })
  .argv;

// Interfaz de usuario interactiva con readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\nSeleccione una opción:");
  console.log("1. Añadir una nota");
  console.log("2. Eliminar una nota");
  console.log("3. Listar todas las notas");
  console.log("4. Leer una nota");
  console.log("5. Editar una nota");
  console.log("6. Salir");

  rl.question("> ", (option) => {
    switch (option) {
      case "1":
        rl.question("Ingrese el título de la nota: ", (title) => {
          rl.question("Ingrese el cuerpo de la nota: ", (body) => {
            addNote(title, body);
            showMenu();
          });
        });
        break;
      case "2":
        rl.question("Ingrese el título de la nota a eliminar: ", (title) => {
          deleteNote(title);
          showMenu();
        });
        break;
      case "3":
        listNotes();
        showMenu();
        break;
      case "4":
        rl.question("Ingrese el título de la nota a leer: ", (title) => {
          readNote(title);
          showMenu();
        });
        break;
      case "5":
        rl.question("Ingrese el título de la nota a editar: ", (title) => {
          rl.question("Ingrese el nuevo cuerpo de la nota: ", (body) => {
            editNote(title, body);
            showMenu();
          });
        });
        break;
      case "6":
        rl.close();
        break;
      default:
        console.log("Opción inválida");
        showMenu();
        break;
    }
  });
}

// Mostrar el menú inicial
showMenu();
