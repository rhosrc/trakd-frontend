import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

 

function Show (props) {
    const [ newNote, setNewNote] = useState('')
    
    const result = props.projects.find(project => {
        return project._id === props.match.params.id;
    })

    // console.log(result);
    // console.log(newNote);

    const handleChange = function (event) {
        setNewNote(event.target.value)
    }

    const handleSubmitNote = function (event) {
        props.addNotes({content: newNote}, result._id);
        setNewNote(''); 
    }

    const handleDeleteNote = function (event) {
        console.log(event)
        // event.preventDefault();
        // props.deleteNotes(result._id, result.notes.)
        // window.location.reload(true);
        // console.log(event);
    }


    

// console.log(result);

    return (
     <div>
        <h1>Project Name: {result.name}</h1>
        <Link to={`/projects/${result._id}/edit`}>
        <p>Edit this project</p>
        </Link>
        {
            
            result.notes.map(function (note) {
                return (
                    <div key={note._id}>
                        <h1>{note.content}</h1>
                        <button onClick={handleDeleteNote}>Remove note</button>
                    </div>
                )
            })
        }
        <form onSubmit={handleSubmitNote}>
        <label>Note</label><textarea value={newNote} onChange={handleChange}></textarea>
        <input type="submit" value="Add Note" />
        </form>
     </div>   
    )
}

export default Show;