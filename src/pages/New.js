import { useState } from 'react';
import './Form.css'

function New (props) {
    const [newProject, setNewProject] = useState({
        name:'',
        requestor: '',
        qty: '',
        charge: '',
        paid: 'no',
        due: '',
        status: 'processing',
        photos:''
    })
    



    function handleSubmit (event) {
        event.preventDefault();
        props.createProjects(newProject);
        setNewProject({
            name:'',
            requestor: '',
            qty: '',
            charge: '',
            paid: 'yes',
            due: '',
            status: 'processing',
            photos: ''
        })
        console.log(newProject);
        props.getProjects();
        props.history.push('/');       
    }

    function handleChange (event) {
        setNewProject({
            ...newProject,
            [event.target.name]: event.target.value
        })
    }


    
    return (
        <div >
        <h1>ADD A PROJECT!</h1>
        <form className="form" onSubmit={handleSubmit}>
            <label>
                What's your project called?
                <input type="text" value={newProject.name} name="name" placeholder="Project Name" onChange={handleChange} /><br />
            </label>
            <label>
                When's it due? 
                <input type="date" name="due" value={newProject.due} placeholder="Due Date" onChange={handleChange}/><br />
            </label>
            <label>
                Customer Name: 
                <input type="text" value={newProject.requestor} name="requestor" placeholder="Customer Name" onChange={handleChange}/><br />
            </label>
            <label>
                Quantity: 
                <input type="text" value={newProject.qty} name="qty" placeholder="Quantity" onChange={handleChange}/><br /> 
            </label>
            <label>
                Charge: 
                <input type="text" value={newProject.charge} name="charge" placeholder="Total Charge" onChange={handleChange} /><br />
            </label>
            <label>
                Project Status: 
                <select value={newProject.status} onChange={handleChange} name="status" > 
                    <option value="processing">Processing</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <label>
                Is it fully paid for?
                <select value={newProject.paid} onChange={handleChange} name="paid">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            </label>
            <label>
                Concept image URL: 
                <input type="text" value={newProject.photos} name="photos" placeholder="Image URL" onChange={handleChange}/><br /> 
            </label><br /> 
            <input type="submit" value="Create Project" />
        </form>
        </div>
    )
}

export default New;