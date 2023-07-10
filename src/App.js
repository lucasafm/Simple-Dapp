import logo from './small-logo.png';
import './App.css';
import ContractImpl from './ContractImpl';
import { useState } from 'react';

function App() {

  const [Clicked, setClicked] = useState(false)
  
  const logoHandler = ()=>{
    setClicked(!Clicked)
  }

  return (
    <div className="App">
      <img onClick={logoHandler} src={logo} className="App-logo" alt="logo" />
      <ContractImpl logoClicked={Clicked}/>
    </div>
  );
}

export default App;
