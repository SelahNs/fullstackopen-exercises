const Form = ({handleNameChange, handleNumberChange, handleSumbit, newName, newNumber})=> {
  return (
    <form onSubmit={handleSumbit}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
    </form>
  )
}

export default Form