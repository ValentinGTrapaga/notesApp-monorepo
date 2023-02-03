export const NoteForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit}>
        <input
          className='textInput'
          value={value}
          onChange={handleChange}
        />
        <button
          className='saveNoteButton'
          type='submit'>
          save
        </button>
      </form>
    </div>
  )
}
