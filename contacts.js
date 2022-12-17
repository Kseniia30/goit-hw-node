const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");
const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contact = await getContactById(contactId);
  const contacts = await listContacts();
  const newContactList = contacts.filter((item) => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
