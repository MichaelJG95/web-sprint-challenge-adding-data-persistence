// build your `Task` model here
const db = require('../../data/dbConfig')

async function getAll() {
    const taskRows = await db('tasks as ta')
    .leftJoin('projects as pr', 'pr.project_id', 'ta.project_id')
    .select('task_id', 'task_notes', 'task_description', 'task_completed', 'project_name', 'project_description')

    return taskRows.map(row => {
        return {
            task_id: row.task_id,
            task_notes: row.task_notes,
            task_description: row.task_description,
            task_completed: row.task_completed === 0 ? false : true,
            project_name: row.project_name,
            project_description: row.project_description
    }
})
}

async function getById(task_id) {
    let taskRows = await db('tasks')
        .select('task_id', 'task_notes', 'task_description', 'task_completed')
        .where('tasks.task_id', task_id).first()
    if (taskRows.task_completed === 0) {
        taskRows.task_completed = false
    } else {
        taskRows.task_completed = true

    }
    return taskRows
}

async function add(newtask) {
    const [task_id] = await db('tasks').insert(newtask)
    return getById(task_id)
}

module.exports = { 
    getAll,
    getById,
    add,
}