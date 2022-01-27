import { useState } from 'react';

function Edit (props) {
    const id = props.match.params.id;
    const projects = props.projects;
    const result = projects.find((project) => project._id === id);

    const [ editForm, setEditForm ] = useState(result);

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

    
    return (
        <div>
            <h1>Edit Page</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
            </label><br />
            <label>
                Is it fully paid for?
                <select value={editForm.paid} onChange={handleChange} name="paid">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            </label><br />
            <label>
                Upload concept images here!
                <input type="file" valuename="coverImage" /><br /> 
            </label>
            <input type="submit" value="Update Project" />
        </form>
        </div>
    )

}

export default Edit;