import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


 

function Show (props) {
    
    const URL = 'https://trakit.netlify.app/projects/';
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
    await fetch('https://trakit.netlify.app/notes/' + noteId, {
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
        <div className="flex-div"><h1>Project Name: {project.name}</h1>
        <Link to={`/projects/${project._id}/edit`}>
        <p>Edit this project</p>
        </Link>
        </div>
        <div className="flex-div">
            <h3>DUE: {project.due}</h3>
            <p>Requested by: {project.requestor} </p>
            <p>Paid for? {project.paid}</p>
            <p>{project.qty} commissioned</p>
            <img alt="concept" src={project.photos}></img>
        </div>
        <div className="flex-div">
        <form onSubmit={handleSubmitNote}>
        <label>Note</label><input type="text" value={newNote} onChange={handleChange}></input>
        <input type="submit" value="Add Note" />
        </form>
        </div>
{
        project.notes.map(function (note) {
    return (
        <div key={note._id}>
            <p>{note.content}</p>
            <button onClick={() => removeNote(note._id)}>Remove note</button>
        </div>
    )
})
}


        
     </div>   
    )
}

return project ? loaded() : loading();

}



export default Show;