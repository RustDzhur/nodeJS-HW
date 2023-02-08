const uniqid = require("uniqid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const getContact = JSON.parse(data).find(
			obj => parseInt(obj.id) === parseInt(contactId)
		);
		return getContact;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

async function addContact(name, email, phone) {
	const newContact = {
		id: uniqid(),
		name: name,
		email: email,
		phone: phone,
	};
	try {
		const getAllUsers = await fs.readFile(contactsPath, "utf8");
		const existingUsers = await JSON.parse(getAllUsers);
		const restNewUser = await [...existingUsers, newContact];
		const dataAddNewUser = await fs.writeFile(
			contactsPath,
			JSON.stringify(restNewUser),
			"utf8"
		);
		return dataAddNewUser;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getContactById,
	addContact,
};
