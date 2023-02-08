const { getContactById, addContact } = require("./contacts.js");

getContactById(5).then(console.log)

addContact('Rustem', 'dzhuraievrustem@gmail.com', '068578714')