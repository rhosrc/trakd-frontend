import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

 

function Show (props) {
    const [ newNote, setNewNote] = useState({
        title: '',
        note: '',
        tags: ''
    })
    
    const result = props.projects.find(project => {
        return project._id === props.match.params.id;
    })

    // console.log(result.notes);
    // console.log(newNote);

    const handleChange = function (event) {
        setNewNote({
            ...newNote,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = function (event) {
        event.preventDefault();
        props.addNotes(newNote, result._id);
        setNewNote({
            title: '',
            note: '',
            tags: ''
        });
    }


    console.log(props);

// console.log(result);

    return (
     <div>
        <h1>Project Name: {result.name}</h1>
        <form onSubmit={handleSubmit}>
        <label>Note</label><textarea onChange={handleChange}></textarea>
        <Link to={`/projects/${result._id}/edit`}>
        <p>Edit this project</p>
        </Link>
        </form>
        <button>Add Note</button>
     </div>   
    )
}

export default Show;