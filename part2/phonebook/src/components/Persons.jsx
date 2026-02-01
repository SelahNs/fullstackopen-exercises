const Persons = (({ toShow, handleDelete }) => {
    console.log('DATA CHECK:', toShow, typeof toShow)
    if (toShow && toShow.length > 0) {
        return (<>
            {toShow.map(person => <p key={person.name}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>Delete</button></p>)}
        </>
        )
    }
    // return null

})

export default Persons