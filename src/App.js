import logo from './logo.svg';
import './App.css';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js'
import { FaRegCopy } from 'react-icons/fa'

import { useEffect, useState } from 'react';

function App() {

  const [banner, setBanner] = useState()
  const [textToGenerate, setTextToGenerate] = useState()


  function generateText() {
    figlet.parseFont('Standard', standard);

    figlet.text(textToGenerate, {
        font: 'Standard',
    }, function(err, data) {
        setBanner(data)
    });
  }
 
  return (
    <div className="container">
      <h1 className='logo'>NFT Banner Generator</h1>
      <input 
        type="text" 
        className='input'
        onChange={(e) => setTextToGenerate(e.target.value)}
      />
      <button className="generateButton" onClick={generateText}>Generate!</button>
      {
        banner ?
        <div className='displayContainer'>
          <textarea type="text" className="display" value={banner} readOnly={true}></textarea>
          <button className="copyButton" onClick={() => {navigator.clipboard.writeText(banner)}}><FaRegCopy/></button>
        </div>
        :
        null
        
      }

      
    </div>
  );
}

export default App;
