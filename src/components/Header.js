import {login, logout } from '../services/firebase';
import { Link } from 'react-router-dom';
import './Header.css'

function Header(props) {
    return (
        <nav className="nav"> 
            <Link to ='/'>
                <h1>TrackIt!</h1>
            </Link>
            <div className="google">
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
                <button style={{
                    marginTop: '15px'
                }} onClick={login}>Login</button>
            }
            </div>
        </nav> 
    )
}

export default Header;