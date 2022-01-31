import { Link } from 'react-router-dom';
import './Index.css'
function Index (props) {



    // console.log(props.projects);
    return (
        <div className="dashboard">
        <h1 className="heading">YOUR PROJECTS!</h1>
        <Link to='/projects/new'>
        <p className="add">Add a NEW Project</p>
        </Link>
        <div className="projects">
        
        {
            props.projects.map(function (project){
                const removeProject = function (event) {
                    event.preventDefault();
                    props.deleteProjects(project._id);
                } 
                return (
                    
                        <div className="card" key={project._id}>
                        <Link to={`/projects/${project._id}`}>
                        <p className="title">{project.name}</p>
                        </Link>
                        <p className="requestor">For {project.requestor}</p>
                        <div className="image-box" >
                        <Link to={`/projects/${project._id}`}>
                            <img className="photo" alt="concept" src={project.photos} />
                            </Link>
                        </div>
                        <p>Due on {new Date(project.due).toISOString().substring(0, 10)}</p>
                        <button onClick={removeProject}>Delete this Project</button>
                        </div>
                  
                )
            })
            
}
</div>
        </div>
    )
}

export default Index;