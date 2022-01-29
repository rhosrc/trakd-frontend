import { Link } from 'react-router-dom';

function Index (props) {



    // console.log(props.projects);
    return (
        <>
        <h1>YOUR PROJECTS!</h1>
        <Link to='/projects/new'>
        <p>Add a Project</p>
        </Link>
        {
            props.projects.map(function (project){
                const removeProject = function (event) {
                    event.preventDefault();
                    props.deleteProjects(project._id);
                } 
                return (
                    <div key={project._id}>
                        <div className="card">
                        <Link to={`/projects/${project._id}`}>
                        <p>{project.name}</p>
                        </Link>
                        <button onClick={removeProject}>Delete this Project</button>
                        </div>
                    </div>
                )
            })
            
}
        </>
    )
}

export default Index;