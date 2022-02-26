import logo from './logo.svg';
import './App.css';
import figlet from 'figlet';
import Standard from 'figlet/importable-fonts/Standard'
import Basic from 'figlet/importable-fonts/Basic'
import Banner from 'figlet/importable-fonts/Banner';

import { FaRegCopy } from 'react-icons/fa'
import "98.css";




import { useRef, useState } from 'react';


function App() {
  const fonts = [
    {name: "Standard", font: Standard},
    {name: "Basic", font: Basic},
    {name: "Banner", font: Banner},




  ]

  const [banner, setBanner] = useState()
  const [textToGenerate, setTextToGenerate] = useState()
  const [minimized, setMinimized] = useState(false)
  const [selectedFont, setSelectedFont] = useState(0)
  const [zoom, setZoom] = useState('11')


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
        <div className='window' style={{width: '50%'}}>
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
        <div className='window' style={{width: '50%'}}>
          <div className='title-bar'>
            <div className='title-bar-text'>NFT Banner Generator</div>
            <div className="title-bar-controls">
              <button onClick={toggleWindow} aria-label="Minimize" />
              <button aria-label="Maximize" />
              <button aria-label="Close" />
            </div>
          </div>
          <div className='window-body' style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>

            <textarea 
              type="text" 
              value={banner} 
              readOnly={true} 
              disabled={true} 
              style={{width: "500px", height: "auto", fontSize: `${zoom}px`,  fontFamily: 'sans-serif', textAlign:"center", paddingTop: "40px", margin: "0px", resize: "none", width: "100%", maxHeight: "400px", margin: "auto", letterSpacing: "normal"}}
              rows="20" 
            >

            </textarea>


            <div style={{display: "flex", alignItems: "center"}}>
              <input
                type="range"
                style={{margin: "20px"}}
                min="10"
                max="30"
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

