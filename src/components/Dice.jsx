export default function Dice(props){


    function isInSelectedDice(id){
        const isInSelectedDice = props.selectedDice.some((sDie)=>
            id === sDie.id
        )

        return  isInSelectedDice
    }

    

    function buttonClass(die){
        //if there are two buttons licked and their numbers are not the same
        if(die.isClicked && Array.isArray(props.selectedDice) && props.selectedDice.length === 2 && props.selectedDice[0].number !== props.selectedDice[1].number && isInSelectedDice(die.id)){
            return  "dice__die--wrong customShakeX"
        } else if(die.isClicked){
           return  "dice__die--clicked"
        }
    }

    function createDiceJsx(diceNumbersArray){
        const diceJsx = diceNumbersArray.map((die, i)=>
            <button key={i} 
                className= {`dice__die ${buttonClass(die)}`}  
                onClick={ ()=>{toggleIsClicked(die.id), props.saveSelectedDie(die)} }>
                    {die.number}
            </button>)
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