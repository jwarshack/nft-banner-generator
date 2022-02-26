import logo from './logo.svg';
import './App.css';
import figlet from 'figlet';
import Standard from 'figlet/importable-fonts/Standard'
import Basic from 'figlet/importable-fonts/Basic'
import Coinstak from 'figlet/importable-fonts/Coinstak';
import Cosmike from 'figlet/importable-fonts/Cosmike'
import ThreeD from 'figlet/importable-fonts/3-D'
import Aligator2 from 'figlet/importable-fonts/Alligator2'
import Nancyj from 'figlet/importable-fonts/Nancyj'
import Puffy from 'figlet/importable-fonts/Puffy'
import Rectangles from 'figlet/importable-fonts/Rectangles'

import { FaRegCopy } from 'react-icons/fa'
import "98.css";




import { useState } from 'react';


function App() {
  const fonts = [
    {name: "Standard", font: Standard},
    {name: "Basic", font: Basic},
    {name: "Coinstak", font: Coinstak},
    {name: "Cosmike", font: Cosmike},
    {name: "3-D", font: ThreeD},
    {name: "Alligator2", font: Aligator2},
    {name: "NancyJ", font: Nancyj},
    {name: "Puffy", font: Puffy},
    {name: "Rectangles", font: Rectangles},

  ]

  const underline = [
    {name: 'CryptoCoven', underline: ".・。.・゜✭・.・✫・゜・。..・。.・゜✭・.・✫・゜・。.✭・.・✫・゜・。..・✫・゜・。.・。.・゜✭・.・✫・゜・。..・。.・゜✭・.・✫・゜・。.✭・.・✫・゜・"}
  ]

  const [banner, setBanner] = useState()
  const [textToGenerate, setTextToGenerate] = useState()
  const [minimized, setMinimized] = useState(false)
  const [selectedFont, setSelectedFont] = useState(0)
  const [zoom, setZoom] = useState('5')


  function toggleWindow() {
    const prevValue = minimized
    console.log(prevValue)
    setMinimized(!prevValue)

  }



  function generateText() {
    figlet.parseFont(fonts[selectedFont].name, fonts[selectedFont].font);


    figlet.text(textToGenerate, fonts[selectedFont].name,
     function(err, text) {
       console.log(err)
      setBanner(text)

    });
 
  }
 
  return (
    <div className='container'>
      {
        minimized ?
        <div className='window' style={{width: '56%'}}>
          <div className='title-bar'>
            <div className='title-bar-text'>Ooops..</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" />
              <button onClick={toggleWindow} aria-label="Maximize" />
              <button aria-label="Close" />
            </div>
          </div>
          <div className='window-body'>This is awkward...</div>

        </div>
        :
        <div className='window' >
          <div className='title-bar'>
            <div className='title-bar-text'>NFT Banner Generator</div>
            <div className="title-bar-controls">
              <button onClick={toggleWindow} aria-label="Minimize" />
              <button aria-label="Maximize" />
              <button aria-label="Close" />
            </div>
          </div>
          <div className='window-body' style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>

            <pre style={{width: "90%", fontSize: `${zoom}px`, minHeight: "100px", whiteSpace: 'break-spaces' }}>
              {banner}
            </pre>
            <div style={{display: "flex", alignItems: "center"}}>
              <input
                type="range"
                style={{margin: "20px"}}
                min="5"
                max="20"
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />
              <input 
                  type="text" 
                  className='input'
                  onChange={(e) => setTextToGenerate(e.target.value)}
              />
              <button onClick={generateText}>Generate</button>
              <button onClick={() => {navigator.clipboard.writeText(banner)}}><FaRegCopy/></button>
            </div>
            <div>
              <p>Font type:</p>
              <select value={selectedFont} onChange={e => setSelectedFont(e.target.value)}>
                {
                  fonts.map((font, key) => (
                    <option key={key} value={key}>{font.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>


      }


    </div>

  );
}

export default App;

