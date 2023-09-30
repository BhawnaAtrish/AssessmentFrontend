import './App.css';
import Grid from './Components/grid';
import Nav from './Components/Nav';
import {
  BrowserRouter as Router,
  Route, Routes,
} from "react-router-dom";


function App() {
  return (
    <>
      <Nav />
      <Grid/>
    </>
  );
}

export default App;
