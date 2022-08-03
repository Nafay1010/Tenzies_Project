import { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

const App = () => {
  const [dice, setDice] = useState(allNewDice());
  
  const [tenzies, setTenzies] = useState(false); //if tenzies is true, You win!
  
  
  const [countroll, setCountroll] = useState(0);
  
  const [PB, setPB] = useState(localStorage.getItem('score'))


  useEffect(()=>{
    const allheld = dice.every(die=> die.isHeld)

    const firstdie = dice[0].value

    const allSame = dice.every(die=> die.value === firstdie)

    const PB = localStorage.getItem('score');
    if(allheld && allSame)
    {
      if(countroll < PB)
      {
        localStorage.setItem('score', countroll);
      }
      
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 10),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 14; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        incRoll()
        setDice(oldDice => oldDice.map(die=>{
          return die.isHeld ? 
          die :
          generateNewDie()
        }))
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    function reset()
    {
        setCountroll(0)
        setTenzies(false)
        setDice(allNewDice())
    }

    function incRoll()
    {
      setCountroll(prev => prev + 1);
    }


  const GetDice = dice.map(die=> <Die key = {die.id} value = {die.value} isHeld = {die.isHeld} holdDice={()=> holdDice(die.id)}/>)
  return(
    <div className="whole">
      {tenzies && <Confetti />}
      <div className="heading">
        <div className="PB">
          <h1>Tenzies</h1><h4>Highest Score: {localStorage.getItem('score')}</h4><button className='reset' onClick={reset}>Reset</button>
        </div>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
        <div className='main'>
          <div className="layout">
            {GetDice}
          </div>
        </div>
        {/* <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button> */}
        {tenzies ? <button onClick={reset}>New Game</button> : <button onClick={rollDice}>Roll</button>}
        <h3>Number of Rolls: {countroll}</h3>
    </div>
  )
}
 
export default App;