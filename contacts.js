const uniqid = require("uniqid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

//Получаем контакты, 1. читаем. 2. парсим. 3. возвращаем распарсиній массив
async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const existingUsers = await JSON.parse(data);
		console.log(existingUsers);
		return existingUsers;
	} catch (error) {
		console.log(error);
	}
}

//Получаем контакты, 1. читаем. 2. парсим. 3. находим по IDшнику
async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const getContact = await JSON.parse(data).find(
			obj => String(obj.id) === String(contactId)
		)
		console.log(`The user with id: ${contactId} succssesfuly got!!!`, getContact)
		return getContact
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

//Фильтруем контакт, 1. читаем. 2. парсим. 3. Фильтруем новый массив. 4. новым массив стрингифаем и записываем
async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const existingUsers = await JSON.parse(data);
		const filterUser = await existingUsers.filter(
			user => String(user.id) !== String(contactId)
		);
		const dataWriteNewObj = await fs.writeFile(
			contactsPath,
			JSON.stringify(filterUser),
			"utf8"
		);
		console.log(`The user with id: ${contactId} succssesfuly removed!!!`)
		return dataWriteNewObj;
	} catch (error) {
		console.log(error);
	}
}

//Добавляем контакт, 1. читаем. 2. парсим. 3. распыляем новый массив. 4. новым массив стрингифаем и записываем
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
		const addNewUser = await [...existingUsers, newContact];
		const dataWriteNewUser = await fs.writeFile(
			contactsPath,
			JSON.stringify(addNewUser),
			"utf8"
		);
		console.log(`The user succssesfuly added!!!`, newContact)
		return dataWriteNewUser;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
