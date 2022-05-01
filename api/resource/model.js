// build your `Resource` model here
const db = require('../../data/dbConfig')

async function getAll() {
    let resourceRows = await db('resources')
    return resourceRows
}

async function getById(resource_id) {
    let resourceRows = await db('resources')
        .select('resource_id', 'resource_name', 'resource_description')
        .where('resources.resource_id', resource_id).first()
    return resourceRows
}

async function add(newResource) {
    const [resource_id] = await db('resources').insert(newResource)
    return getById(resource_id)
}

module.exports = { 
    getAll,
    getById,
    add,
}