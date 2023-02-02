

function Quiz(props){

    //console.log(props.questions.selected_answer)
    //console.log(props.showAnswer)
    function styler(opt,index){
        if(props.showAnswer===true){
            if(props.questions.correct_answer === opt){
                return({backgroundColor:"#94D7A2"})
            }else if(props.questions.selected_answer === index){
                return({backgroundColor:"#F8BCBC"})
            }else{
                return({backgroundColor:"#F5F7FB"})
            }

        }else{
            return(props.questions.selected_answer === index ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"})
        }
       
    }
   
     
    const options =props.questions.options.map((i,index) => {
        //console.log(index)
        return <button 
                    key={index} 
                    onClick={(event) => props.selectAnswer(event,props.id,index)} 
                    style={styler(i,index)} 
                    disabled={props.showAnswers}
                    
                    >{i}</button>
    })
    

    return(
        
        <div className="quiz_box">
            <p className="questions">{props.questions.question}</p>
            <div className="options">
                {/* <li>{props.options[0]}</li>
                <li>{props.options[1]}</li>
                <li>{props.options[2]}</li>
                <li>{props.options[3]}</li> */}
                {options}
            </div>
            <hr/>
        </div>
        
    )
}

export default Quiz
