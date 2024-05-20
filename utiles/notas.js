import fs from 'fs'
import chalk from 'chalk'

const getNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notas.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notas.json', dataJSON)
}

const addNote = (title, body) => {
    const notes = getNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Nota guardada'))
    } else {
        console.log(chalk.red.inverse('Ya existe una nota con ese título'))
    }

}

const deleteNote = (title) => {
    const notes = getNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Nota eliminada'))
    } else {
        console.log(chalk.red.inverse('No se encontró la nota'))
    }
}

const listNotes = () => {
    const notes = getNotes()
    console.log(chalk.inverse('Tus notas'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = getNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('No se encontró la nota'))
    }
}

const editNote = (title, newBody) => {
    const notes = getNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        note.body = newBody
        saveNotes(notes)
        console.log(chalk.green.inverse('Nota editada'))
    } else {
        console.log(chalk.red.inverse('No se encontró la nota'))
    }
}

export {addNote, deleteNote, listNotes, readNote, editNote }