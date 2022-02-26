import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
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
import { createClient } from '@supabase/supabase-js'

import { FaRegCopy } from 'react-icons/fa'
import "98.css";



const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)



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
  const [guests, setGuests] = useState([])


  function shortAddress(addr) {
    const first = addr.slice(0, 5)
    const last = addr.slice(-4)
    return `${first}...${last}`
  }

  function toggleWindow() {
    const prevValue = minimized
    console.log(prevValue)
    setMinimized(!prevValue)

  }

  async function signGuestBook() {

    if(!window.ethereum) {
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const signer = provider.getSigner()
    let msg
    try {
       msg = await signer.signMessage("\x19Ethereum Signed Message:\n" + 'Hello fren!')
    } catch(error) {
      console.log(error)
      return
    }

    if(!msg) {
      return
    }

    

    const address = await signer.getAddress()

    const ens = await provider.lookupAddress(address)

    let guest

    if (ens) {
      guest = ens
    } else {
      guest = shortAddress(address)
    }


    const { error } = await supabase
      .from('entries')
      .insert([{ guest: guest }]);

      console.log(error)
  }

  useEffect(() => {


    async function fetchEntries() {
      const { data, error } = await supabase
      .from('entries')
      .select()

    setGuests(data)

    }
    fetchEntries()

  }, [])



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
          <div className='window' style={{width: "60%"}}>
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
          <div className='window'  style={{width: "60%"}}>
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


      <div className='rightContainer' style={{marginLeft: "20px", fontFamily: "Pixelated MS Sans Serif"}}>
        <button onClick={signGuestBook} >Sign Guestbook</button>
          <div style={{marginLeft: '4px'}}>
            {
              guests.map((guest, key) => (
                <p key={key}>{guest.guest}</p>
              ))
            }
        </div>
      </div>
    </div>

  );
}

export default App;
