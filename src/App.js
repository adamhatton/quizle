import NavBar from './components/NavBar';
import styles from './App.module.css';
import {Route, Switch} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import SignUpForm from './pages/auth/SignUpForm';
import './api/axiosDefaults';
import SignInForm from './pages/auth/SignInForm';
import QuizCreateForm from './pages/quizzes/QuizCreateForm';
import QuizPage from './pages/quizzes/QuizPage';
import QuizzesPage from './pages/quizzes/QuizzesPage';
import QuizEditForm from './pages/quizzes/QuizEditForm';
import ProfilePage from './pages/profile/ProfilePage';
import ProfileEditForm from './pages/profile/ProfileEditForm';
import UsernameForm from './pages/profile/UsernameForm';
import UserPasswordForm from './pages/profile/UserPasswordForm';
import NotFound from './components/NotFound';

function App() {

  return (
    <div className={styles.App} >
      <NavBar />
      <Container className={styles.Main} >
        <Switch>
          <Route exact path='/' render={() => <QuizzesPage />} />
          <Route exact path='/quizzes/sport' render={() => <QuizzesPage filter={'category=sport&'} page={'Sport'}  />} />
          <Route exact path='/quizzes/music' render={() => <QuizzesPage filter={'category=music&'} page={'Music'}  />} />
          <Route exact path='/quizzes/entertainment' render={() => <QuizzesPage filter={'category=entertainment&'} page={'Entertainment'}  />} />
          <Route exact path='/quizzes/general' render={() => <QuizzesPage filter={'category=general&'} page={'General Knowledge'} />} />
          <Route exact path='/quizzes/popular' render={() => <QuizzesPage filter={'ordering=-likes_count&'} page={'Most Popular'} />} />
          <Route exact path='/quizzes/create' render={() => <QuizCreateForm />} />
          <Route exact path='/quizzes/:id' render={() => <QuizPage />} />
          <Route exact path='/quizzes/:id/edit' render={() => <QuizEditForm />} />
          <Route exact path='/profiles/:id' render={() => <ProfilePage mobile />} />
          <Route exact path='/profiles/:id/edit' render={() => <ProfileEditForm />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;