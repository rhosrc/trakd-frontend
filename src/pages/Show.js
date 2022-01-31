import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Show.css'

 

function Show (props) {
    
    const URL = 'https://trakd-backend.herokuapp.com/projects/';
    const id = props.match.params.id;

    
    
    const [ newNote, setNewNote] = useState('')

    const [ project, setProject ] = useState(null)
    const getProjectRef = useRef();

    const handleChange = function (event) {
        setNewNote(event.target.value)
    }

    const handleSubmitNote = function (event) {
        // event.preventDefault();
        postNote({content: newNote}, project._id);
        setNewNote('');
    }


    
const findProject = async function () {
    if(!props.user) return;
    const token = await props.user.getIdToken();
    const response = await fetch(URL + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();

    setProject(data);

}

const postNote = async function (note, id) {
    if(!props.user) return;
    const token = await props.user.getIdToken();
    const response = await fetch(URL + id + '/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(note)
    })
    const data = await response.json();
    setNewNote(data);
}

const removeNote = async function (noteId) {
    if(!props.user) return;
    const token = await props.user.getIdToken();
    await fetch('https://trakd-backend.herokuapp.com/notes/' + noteId, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    setNewNote('');
    findProject();
}

async function handleLogout () {
    setProject([]);
  };

useEffect(() => {
    getProjectRef.current = findProject;
})

  useEffect(() => {
    if (props.user) {
        getProjectRef.current();
    } else {
      handleLogout();
    }
  }, [props.user]);

//   useEffect(() => {
//     if (props.user) {
//     } else {
//       handleLogout();
//     }
//   }, [props.user]);

//   useEffect(() => {
//     if (props.user) {
//     } else {
//       handleLogout();
//     }
//   }, [props.user]);

// console.log(props)

const loading = () => <h1>Grabbing profile...</h1>

const loaded = () => {
    return (
        <div className="project">
            <div className="flex-div">
                <h1>{project.name}</h1>
                <Link to={`/projects/${project._id}/edit`}>
                    <p>Edit this project!</p>
                </Link>
                <img className="show-photo" alt="concept" src={project.photos}></img>
            </div>
            <div className="flex-div">
                <h1>DUE: {new Date(project.due).toLocaleDateString('en-US')}</h1>
                <p>Requested by: {project.requestor} </p>
                <p>Charging ${project.charge}</p>
                <p>Paid for? {project.paid}</p>
                <p>{project.qty} commissioned</p>
                <form onSubmit={handleSubmitNote}>
                    <label>Note<input type="text" value={newNote} onChange={handleChange}></input></label><br />
                    <input type="submit" value="Add Note" />
                </form>
                <div className="notes-div">
                {
                    project.notes.map(function (note) {
                        return (
                            <div className="note" key={note._id}>
                                <p>{note.content}</p>
                                <button onClick={() => removeNote(note._id)}>Remove note</button>
                            </div>
                        )
                    })
                }
                </div>
            </div>  
        </div>
 
    )
}

return project ? loaded() : loading();

}



export default Show;