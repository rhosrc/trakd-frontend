import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Index from '../pages/Index';
import Show from '../pages/Show';
import New from '../pages/New';
import Edit from '../pages/Edit'

function Main(props) {
    const [projects, setProjects] = useState([]);

    // const URL = 'http://localhost:3001/projects/';
    const URL = 'https://trakd-backend.herokuapp.com/projects/';

    const getProjects = async function () {
        const response = await fetch(URL);
        const data = await response.json();
        setProjects(data);
    }

    const createProjects = async function (project) {
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            }, 
            body: JSON.stringify(project)
        })
    }

    const deleteProjects = async function (id) {
        await fetch(URL + id, {
            method: 'DELETE'
        })
    }

    const updateProjects = async function (project, id) {
        await fetch(URL + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(project)
        })
   }

   const addNotes = async function (note, id) {
    console.log(JSON.stringify(note), id)   
    await fetch(URL + id + '/notes', {
           method: 'POST',
           headers: {
               'Content-Type': 'Application/json'
           },
           body: JSON.stringify(note)
       })
   console.log(JSON.stringify(note));
    }

   

   


    useEffect(() => {
        getProjects();
    }, [])
    

    return(
        <main>
             <Switch>
             <Route exact path='/' render={(rp) => (
             props.user ?
             <Redirect to='/projects' />
                    :
                    <Home />
                )} />
             
             <Route path='/projects/new' render={(rp) => (
                    props.user ?
                    <New
                        user={props.user}
                        projects={projects}
                        {...props} 
                        {...rp} 
                        createProjects={createProjects}
                        getProjects={getProjects}
                    />
                    :
                    <Home />
                )} />
                
                <Route path='/projects/:id/edit' render={(rp) => (
                    props.user ?
                    <Edit
                        user={props.user}
                        projects={projects}
                        {...props} 
                        {...rp} 
                        createProjects={createProjects}
                        updateProjects={updateProjects}
                    />
                    :
                    <Home />
                )} />

                <Route path='/projects/:id' render={(rp) => (
                    props.user ?
                    <Show 
                        {...rp} 
                        projects={projects}
                        addNotes={addNotes}
                        getProjects={getProjects}
                    />
                    :
                    <Home />
                )} />

                <Route path='/projects' render={(rp) => (
                    props.user ?
                    <Index {...props} user={props.user} setProjects={setProjects} projects={projects} getProjects={getProjects} deleteProjects={deleteProjects} / > 
                    :
                    <Home />
                )} />
            </Switch>
        </main>
    )


}

export default Main;