// build your `Project` model here
const db = require('../../data/dbConfig')

async function getAll() {
    let projectRows = await db('projects')
    return projectRows.map(row => {
        return {
            project_id: row.project_id,
            project_name: row.project_name,
            project_description: row.project_description,
            project_completed: row.project_completed === 0 ? false : true
        }
    })
}

async function getById(project_id) {
    let projectRows = await db('projects')
        .select('project_id', 'project_name', 'project_description', 'project_completed')
        .where('projects.project_id', project_id).first()
    if (projectRows.project_completed === 0) {
        projectRows.project_completed = false
    } else {
        projectRows.project_completed = true

    }
    return projectRows
}

async function add(newProject) {
    const [project_id] = await db('projects').insert(newProject)
    return getById(project_id)
}

module.exports = { 
    getAll,
    getById,
    add,
}