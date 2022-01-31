import { useState, useEffect, useRef } from 'react';
import './Form.css'

function Edit (props) {
    const URL = 'http://localhost:3001/projects/';
    const id = props.match.params.id;
    const projects = props.projects;
    const result = projects.find((project) => project._id === id);

    const [ editForm, setEditForm ] = useState(null);

    const getProjectRef = useRef();

    const handleChange = function (event) {
        setEditForm({
            ...editForm,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = function (event) {
        event.preventDefault();
        props.updateProjects(editForm, result._id)
        props.history.push('/')
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

        setEditForm(data);
      
    }

    async function handleLogout () {
        setEditForm('');
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
    
    
    const loading = () => <h1>Grabbing profile...</h1>
    
    const loaded = () => {
    return (
        <div>
            <h1>Edit Page</h1>
            <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
            <label>
                What's your project called?
                <input type="text" value={editForm.name} name="name" placeholder="Project Name" onChange={handleChange} /><br />
            </label>
            <label>
                When's it due? 
                <input type="date" name="due" value={new Date(editForm.due).toISOString().substring(0, 10)} placeholder="Due Date" onChange={handleChange}/><br />
            </label>
            <label>
                Customer Name: 
                <input type="text" value={editForm.requestor} name="requestor" placeholder="Customer Name" onChange={handleChange}/><br />
            </label>
            <label>
                Quantity: 
                <input type="text" value={editForm.qty} name="qty" placeholder="quantity" onChange={handleChange}/><br /> 
            </label>
            <label>
                Charge: 
                <input type="text" value={editForm.charge} name="charge" placeholder="Quantity" onChange={handleChange} /><br />
            </label>
            <label>
                Project Status: 
                <select value={editForm.status} onChange={handleChange} name="status" > 
                    <option value="processing">Processing</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <label>
                Is it fully paid for?
                <select value={editForm.paid} onChange={handleChange} name="paid">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            </label>
            <label>
            Change image URL: 
                <input type="text" value={editForm.photos} name="photos" placeholder="Image URL" onChange={handleChange}/><br /> 
            </label><br />
            <input type="submit" value="Update Project" />
        </form>
        </div>
    )
    }
    return editForm ? loaded() : loading();
}

export default Edit;