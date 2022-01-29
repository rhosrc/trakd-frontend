import { useState } from 'react';
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


    const handleDeleteNote = async function (noteId) {
        await fetch('http://localhost:3001/notes/' + noteId, {
            method: 'DELETE'
        })
    props.getProjects();
   }


    

// console.log(result);

    return (
     <div>
        {
            console.log(result.notes)
        }
        <h1>Project Name: {result.name}</h1>
        <Link to={`/projects/${result._id}/edit`}>
        <p>Edit this project</p>
        </Link>
        {
            
            result.notes.map(function (note) {
                return (
                    <div key={note._id}>
                        <p>{note.content}</p>
                        <button onClick={() => handleDeleteNote(note._id)}>Remove note</button>
                    </div>
                )
            })
        }
        <form onSubmit={handleSubmitNote}>
        <label>Note</label><input type="text" value={newNote} onChange={handleChange}></input>
        <input type="submit" value="Add Note" />
        </form>
     </div>   
    )
}

export default Show;