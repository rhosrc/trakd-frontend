import './Home.css'
import {login, logout } from '../services/firebase';

function Home (props) {
    return (
        <div className="home">
            <div className="home-copy">
                <h1 className="splash-head">Track your commissions.</h1>
                <p className="splash-text">Click the button below to get started.</p>
                <button onClick={login}>Login with Google</button>
            </div>
            <div className="home-image">
                <img className="splash" src="https://cdn4.vectorstock.com/i/1000x1000/48/58/artist-and-designer-desk-vector-8964858.jpg"/>
            </div>
        </div>
    )
}

export default Home;