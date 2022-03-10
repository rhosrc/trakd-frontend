import { useEffect, useState, useRef } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Index from '../pages/Index';
import Show from '../pages/Show';
import New from '../pages/New';
import Edit from '../pages/Edit'

function Main(props) {
    const [projects, setProjects] = useState([]);
    
    const getProjectsRef = useRef();

    const URL = 'https://trakd-backend.herokuapp.com/projects/';

    const getProjects = async function () {
        if(!props.user) return;
        const token = await props.user.getIdToken();

        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();

        setProjects(data);
    }

    const createProjects = async function (project) {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + token
            }, 
            body: JSON.stringify(project)
        })
        getProjects();
    }

    const deleteProjects = async function (id) {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        await fetch(URL + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        getProjects();
    }

    const updateProjects = async function (project, id) {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        await fetch(URL + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(project)
        })
        getProjects();
   }

    const handleLogout = function () {
        setProjects([]);
    }

    useEffect(() => {
        getProjectsRef.current = getProjects;
    })

    useEffect(() => {
        if(props.user) {
            getProjectsRef.current();
        } else {
            handleLogout();
        }
    }, [props.user])
    

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
                    <Redirect to='/' />
                )} />

                <Route path='/projects/:id' render={(rp) => (
                    props.user ?
                    <Show 
                        {...rp}
                        user={props.user} 
                        projects={projects}
                        getProjects={getProjects}
                        handleLogout={handleLogout}

                    />
                    :
                    <Home />
                )} />

                <Route path='/projects' render={(rp) => (
                    props.user ?
                    <Index {...props} user={props.user} setProjects={setProjects} projects={projects} getProjects={getProjects} deleteProjects={deleteProjects} / > 
                    :
                    <Redirect to='/' />
                )} />
            </Switch>
        </main>
    )


}

export default Main;