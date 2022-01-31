import {login, logout } from '../services/firebase';
import { Link } from 'react-router-dom';
import './Header.css'

function Header(props) {
    return (
        <nav className="nav"> 
            <Link to ='/'>
                <h1>TrackIt!</h1>
            </Link>
            {
                props.user ?
                <>
                    <img style={{
                        height: '3.125rem',
                        width: '3.125rem',
                        borderRadius: '50%'
                    }} 
                    src={props.user.photoURL} 
                    alt={props.user.displayName} 
                    />
                    <button onClick={logout}>Logout</button>
                </>
                :
                <button onClick={login}>Login</button>
            }
        </nav> 
    )
}

export default Header;