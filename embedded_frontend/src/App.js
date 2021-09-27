import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from './components/views/HomePage/Home';
import TopMenu from './components/views/NavBar/TopMenu';
import imgA from './imgs/space.jpg';
import AboutPage from './components/views/AboutPage/AboutPage';
import AccidentPage from './components/views/AccidentPage/AccidentPage';
import PractPage from './components/views/NavBar/PractPage';
import ReportPage from './components/views/ReportPage/ReportPage';

function App() {
  const [image, setimage] = useState(imgA)

  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact component={Home} homepage />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/acc" exact component={AccidentPage} />
            <Route path="/report" exact component={ReportPage} />
            <Route path="/pract" exact component={PractPage} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
