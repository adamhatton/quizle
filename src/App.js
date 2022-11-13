import NavBar from './components/NavBar';
import styles from './App.module.css';
import {Route, Switch} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import SignUpForm from './pages/auth/SignUpForm';
import './api/axiosDefaults';
import SignInForm from './pages/auth/SignInForm';
import QuizCreateForm from './pages/quizzes/QuizCreateForm';
import QuizPage from './pages/quizzes/QuizPage';

function App() {

  return (
    <div className={styles.App}>
      <NavBar></NavBar>
      <Container className={styles.Main} >
        <Switch>
          <Route exact path='/' render={() => <h1>Quizzes</h1>} />
          <Route exact path='/quizzes/create' render={() => <QuizCreateForm />} />
          <Route exact path='/quizzes/:id' render={() => <QuizPage />} />
          <Route exact path='/profile' render={() => <h1>Profile</h1>} />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/signout' render={() => <h1>Sign Out</h1>} />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;