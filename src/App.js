import NavBar from './components/NavBar';
import styles from './App.module.css';
import {Route, Switch} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className={styles.App}>
      <NavBar></NavBar>
      <Container className={styles.Main} >
        <Switch>
          <Route exact path='/' render={() => <h1>Quizzes</h1>} />
          <Route exact path='/create' render={() => <h1>Quiz Creation</h1>} />
          <Route exact path='/profile' render={() => <h1>Profile</h1>} />
          <Route exact path='/signin' render={() => <h1>Sign In</h1>} />
          <Route exact path='/signup' render={() => <h1>Sign Up</h1>} />
          <Route exact path='/signout' render={() => <h1>Sign Out</h1>} />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;