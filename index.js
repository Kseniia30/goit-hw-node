const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const сontact = await getContactById(id);
        if (сontact === void 0) {
          const message = `no contact by id ${id}`;
          console.log(message);
          return;
        }
        console.log("Your contact is find");
        console.table(сontact);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log("Add new contact");
        console.table(newContact);
        break;

      case "remove":
        const remContact = await removeContact(id);
        if (remContact === void 0) {
          const message = `no contact by id ${id}`;
          console.log(message);
          return;
        }
        console.log(`Contact with id: ${id} was deleted`);
        console.table(remContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

invokeAction(argv);

// listContacts();
//getContactById();
//removeContact();
//addContact();
