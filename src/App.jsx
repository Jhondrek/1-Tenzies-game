import Dice from "./components/Dice"
import './App.css'
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti'

  
function App() {

  //contains the values of all the dice in the game
  const [diceValues, setDiceValues] = useState([])
  const [selectedDice, setSelectedDice] = useState([])
  const [wasSelectionAnError, setWasSelectionAnError] = useState(false)
  
  

  const gameWon = diceValues.length > 0 && diceValues.every((die)=>die.isClicked && die.number === diceValues[2].number)
  
  //Generates the initial dices for the game
  useEffect(()=>{
    const initialDice = setDiceObjects(getDiceNumbers())
    setDiceValues(initialDice)
  },[])

  //Returns an 10 element array of random numbers from 1 to 10
  function getDiceNumbers(){
    let diceArray = []
    for(let i=0; i<10; i++){
      diceArray.push(Math.floor(Math.random()*10))
    }
    return diceArray
  }
 
  //Creates an array with dice objects
  function setDiceObjects(diceNumbers){

    const diceObjects =  diceNumbers.map((die, i)=>{
      return ({number: die, isClicked : false, id : i})
    })

    return diceObjects
  }

  //Returns a new array from the old array of dice, checks each die, if clicked returns the die, else, changes the number to a random numer
  function shuffleDice(){
    setDiceValues((prevDice)=>{
        const newDiceSet = prevDice.map((die)=>{ 
            return (die.isClicked? die : {...die, number : Math.floor(Math.random()*10)})
          }
        )
        return newDiceSet
      }
    ) 
  }


  function resetGame(){
  const initialDice = setDiceObjects(getDiceNumbers())
    setDiceValues(initialDice)
    setSelectedDice([])
 } 

//Error Checking section 

//Done
  function saveSelectedDie(die){

    setSelectedDice(prevDie=>  [...prevDie, die])
  }

  //Done
  function areDiceEqual(currentDie){
    return selectedDice[0].number === currentDie.number
  }

  useEffect(()=>{
    if(Array.isArray(selectedDice) && selectedDice.length >=2){
      
      
      restoreIncorrectDiceUi()

    }
  },[selectedDice])


  
function restoreIncorrectDiceUi() {

  setTimeout(() => {
    

    setDiceValues((prevDiceValues) =>
      
      prevDiceValues.map((die) => {
        
        if (
          selectedDice.some(
            (selectedDie) =>
              selectedDie.id === die.id && !areDiceEqual(die)
          )
        ) {
          setSelectedDice((prevSelectedDice) =>
            prevSelectedDice.slice(0, -1)
          );
          return { ...die, isClicked: !die.isClicked };
        } else {
          return die;
        }
      })
    );

    
    setWasSelectionAnError(false);
  }, 2000);
}




  
  


  return (
      
    <section className='mainCont'>

      {gameWon ? <Confetti /> : undefined}
      
      <h1 className='mainCont__tittle'>Tenzies</h1>
      <p className='mainCont__gameDescription'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      
      <section className='mainCont__dice'>
        <Dice setWasSelectionAnError={setWasSelectionAnError} wasSelectionAnError={wasSelectionAnError} diceValues = {diceValues} setDiceValues = {setDiceValues} saveSelectedDie = {saveSelectedDie} areDiceEqual ={areDiceEqual} selectedDice = {selectedDice} />
      </section>
      
      <button disabled= {wasSelectionAnError}
        className='mainCont__mainBtn'
        onClick={()=>{gameWon ? resetGame() : shuffleDice()   }}>
          {gameWon ? "Restart Game":"Roll" }
      </button>

    </section>
  )
}

export default App



//TODO: 
// 1 ) hacer que cada vez que se le de click a un btn este guarde el valor de referencia que se le ha dado click, y que cambie de color.
// 2) luego que solo se le haga shuffle a los botones que no se han clickeado.
// 3) vigitar a ver cuando se le ha dado click a todos los botones y que todos sean iguales para dar el ganador
// 4) streatch goal detectar cuando se elijan numeros iguales y dar aviso de esto al usuario.