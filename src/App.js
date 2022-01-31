import { useState, useEffect } from 'react';
import { auth } from './services/firebase';


import './App.css';

import Header from './components/Header';
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user));
  }, []);
  return (
    <div className="App">
      <Header user={user} />
      <Main user={user} />
      <Footer />
    </div>
  );
}

export default App;
