import NavBar from './components/NavBar';
import styles from './App.module.css';
import {Route, Switch} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import SignUpForm from './pages/auth/SignUpForm';
import './api/axiosDefaults';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import SignInForm from './pages/auth/SignInForm';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount()
  }, []);



  return (
    <CurrentUserContext.Provider value={currentUser}>
    <SetCurrentUserContext.Provider value={setCurrentUser}>
    <div className={styles.App}>
      <NavBar></NavBar>
      <Container className={styles.Main} >
        <Switch>
          <Route exact path='/' render={() => <h1>Quizzes</h1>} />
          <Route exact path='/create' render={() => <h1>Quiz Creation</h1>} />
          <Route exact path='/profile' render={() => <h1>Profile</h1>} />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/signout' render={() => <h1>Sign Out</h1>} />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
    </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;