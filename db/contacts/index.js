const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')


const contactPath = path.join(__dirname, 'contacts.json')
// console.log(bookPath)  

const getAll = async () => {

    const data = await fs.readFile(contactPath, 'utf-8'  ) //'utf-8'
   console.log("data")
    return JSON.parse(data)  || null

}

const getById = async (id) => {
    const ContactId = String(id)
    const contacts = await getAll() 
    const result = contacts.find(item => item.id === ContactId)
    return result || null
}

const add = async (data) => {
    const contacts = await getAll() 
    const newContact = {
        id: nanoid(),
        ...data,

    }
    contacts.push(newContact)
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return newContact
} 

const update = async (id, data) => {
    const ContactId = String(id)
    const contacts = await getAll()
    const index  = contacts.findIndex(item => item.id === ContactId)
     if (index === -1){
        return null
     }
     contacts[index] = {id, ...data}
     await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
     return contacts[index]
}

const del = async (id) => {
    const ContactId = String(id)
    const contacts = await getAll()
    const index  = contacts.findIndex(item => item.id === ContactId)
     if (index === -1){
        return null
     }

     const result = contacts.splice(index, 1)
     await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
     return result
}


module.exports = {
    getAll,
    getById,
    add,  
    update,
    del,
 
}
  