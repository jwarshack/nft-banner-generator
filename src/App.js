import logo from './logo.svg';
import './App.css';
import figlet from 'figlet';
import Standard from 'figlet/importable-fonts/Standard'
import Basic from 'figlet/importable-fonts/Basic'
import Banner from 'figlet/importable-fonts/Banner';

import { FaRegCopy } from 'react-icons/fa'
import "98.css";




import { useEffect, useRef, useState } from 'react';


function App() {
  const fonts = [
    {name: "Standard", font: Standard},
    {name: "Basic", font: Basic},
    {name: "Banner", font: Banner},




  ]

  const [banner, setBanner] = useState()
  const [textToGenerate, setTextToGenerate] = useState()
  const [minimized, setMinimized] = useState(false)

  const displayRef = useRef()

  function toggleWindow() {
    const prevValue = minimized
    console.log(prevValue)
    setMinimized(!prevValue)

  }



  function generateText() {
    figlet.parseFont(fonts[1].name, fonts[1].font);


    figlet.text(textToGenerate, fonts[1].name,
     function(err, text) {
       console.log(err)
      setBanner(text)
      console.log(displayRef.current)
      displayRef.current.style.height = 'inherit'
      displayRef.current.style.height = `${displayRef.current.scrollHeight}px`

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
              ref={displayRef} 
              value={banner} 
              readOnly={true} 
              disabled={true} 
              style={{width: "500px", height: "auto", fontFamily: 'sans-serif', textAlign:"center", padding: "0", margin: "0", resize: "none", width: "100%"}}
              rows="20" 
            >

            </textarea>


            <div style={{display: "flex", alignItems: "center"}}>
              <input
                type="range"
                style={{margin: "20px"}}
                min="10"
                max="30"
                value="11"
                onChange={(e) => displayRef.current.style.fontSize = `${e.target.value}px`}
              />
              <input 
                  type="text" 
                  className='input'
                  onChange={(e) => setTextToGenerate(e.target.value)}
              />
              <button onClick={generateText}>Generate</button>
              <button onClick={() => {navigator.clipboard.writeText(banner)}}><FaRegCopy/></button>
            </div>
            <select>
              <option>5 - Incredible!</option>
              <option>4 - Great!</option>
              <option selected>3 - Pretty good</option>
              <option>2 - Not so great</option>
              <option>1 - Unfortunate</option>
            </select>
          </div>
        </div>


      }


    </div>

  );
}

export default App;
