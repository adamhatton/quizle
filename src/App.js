import NavBar from './components/NavBar';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <NavBar></NavBar>
      <h1>Quizle</h1>
    </div>
  );
}

export default App;