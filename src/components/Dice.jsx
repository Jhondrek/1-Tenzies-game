export default function Dice(props){

    function createDiceJsx(diceNumbersArray){
        const diceJsx = diceNumbersArray.map((die, i)=>
            <button key={i} className= {`dice__die ${die.isClicked ? "dice__die--clicked" : null}`}  onClick={ ()=>{toggleIsClicked(die.id)} }>{die.number}</button>)
        return diceJsx
    }

    function toggleIsClicked(id){
        props.setDiceValues((prevDice)=>{
            
            const newDice = prevDice.map((die)=>{
                return die.id === id ? {...die, isClicked : !die.isClicked} : die
            })

            return(newDice)
        })
    }

    const diceJsx = createDiceJsx(props.diceValues)
  
    return (diceJsx)
}