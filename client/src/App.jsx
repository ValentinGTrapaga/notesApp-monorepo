import { useState, useEffect, useRef } from 'react'

import noteService from './services/notes'
import { login } from './services/login'

import { Notification } from './components/Notification'
import Footer from './components/Footer'
import { Note } from './components/Note'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'
import Togglable from './components/Togglable'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes))
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  function noteForm() {
    return (
      <Togglable
        buttonLabel='new note'
        ref={noteFormRef}>
        <p>{user.name}</p>
        <NoteForm
          onSubmit={addNote}
          value={newNote}
          handleChange={handleNoteChange}
        />
      </Togglable>
    )
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    }
    console.log(noteFormRef)
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((createdNote) => {
      setNotes((prevNotes) => [...prevNotes, createdNote])
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      console.log(user)
      noteService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        noteForm()
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
      {user && (
        <button
          onClick={() => {
            window.localStorage.clear()
            window.location.reload()
          }}>
          Log out
        </button>
      )}
    </div>
  )
}

export default App
