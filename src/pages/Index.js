import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Index (props) {



    console.log(props.projects);
    return (
        <>
        <h1>YOUR PROJECTS!</h1>
        <Link to='/projects/new'>
        <p>Add a Project</p>
        </Link>
        {
            props.projects.map(function (project){
                const removeProject = function (event) {
                    props.deleteProjects(project._id);
                    window.location.reload(true);
                } 
                return (
                    <div key={project._id}>
                        <Link to={`/projects/${project._id}`}>
                        <p>{project.name}</p>
                        </Link>
                        <button onClick={removeProject}>Delete this Project</button>
                    </div>
                )
            })
            
}
        </>
    )
}

export default Index;