import './App.css';
import { useState,useEffect } from 'react';
import Quiz from './Components/Quiz';
//import data from "./QuizQustions"

function App() {
  const [squiz,setSquiz]= useState(false)
  const[question,setQuestion]=useState([])
  const[showAnswer,setShowAnswer]=useState(false)
  const [allComplete, setAllComplete] = useState(false)
  const [points,setPoints]=useState(0)

  function restart(){
    setSquiz(false)
    setShowAnswer(false)
    setAllComplete(false)
    setQuestion([])
  }

  function selectedAnswer(event,quest_id,option_id){

    setQuestion((prev)=> {
      return(question.map((que,qid)=>{
        if(quest_id===qid){
          return ({...que,selected_answer:option_id})
        }
        else{
          return (que)
        }
      }))
    })

  }

  function charRepalce(x){
    return x.replace(/&#039;|&amp;|&quot;/g, function(characters){
      if(characters === "&quot;")
      {
        return "\""
      }
      else if(characters === "&#039;")
      {
        return "'"
      }
      else{
        return " & "
      }
    })

  }

  
  useEffect(()=>{
    let count=0;
    for(let i=0;i<question.length;i++){
      if(typeof question[i].selected_answer !== 'undefined'){
        if(question[i].options[question[i].selected_answer]=== question[i].correct_answer)
        {
          count=count+1;
        }
      }
    }
    setPoints(count)


  },[question])

  function show(){
    setShowAnswer(true)
  }


  
  


  useEffect(()=>{
    if(squiz === true){
    fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple')
    .then(res => res.json())
    .then(data => 
      {
        setQuestion(data.results.map(function(quest){
          return ({
            question:charRepalce(quest.question),
            options:quest.incorrect_answers.concat([quest.correct_answer]).sort(() => Math.random() - 0.5).map(values =>{return charRepalce(values) }),// options are collected in an array and shuffeled
            selected_answer:undefined,
            correct_answer:quest.correct_answer
          })

        }));
        
      })
    }
  },[squiz])
  //console.log(question)
  
  useEffect(() => { 
    setAllComplete(question.every((quest) => typeof quest.selected_answer !== 'undefined'))
}, [question])
  
  
  

  //let renderQuiz= question.map(i => {return <Quiz q={i.question}  a={i.options[0]} b={i.options[1]} c={i.options[2]} d={i.options[3]}/>})
  let renderQuiz= question.map((questions,index) => {return <Quiz key={index} questions={questions} id={index} selectAnswer={selectedAnswer} showAnswer={showAnswer}/>})
  
  function change(){
    setSquiz(prev => !prev)
  }

  return (

    <main>
      {
        squiz ? 
        <div>
          {renderQuiz}
          
          {showAnswer ? 
              <div className='score_container'>
                <button className='buttons' onClick={restart}>Paly Again</button>
                <h3>{`Your score is ${points} out of 5`}</h3>
              </div>:
              <button className='buttons' onClick={show}  disabled={!allComplete} >Check Answer</button>}
        </div> : 
        <div className='front-page'>
          <h1 className='heading'>Quizzical</h1>
          <p className='description' >Some description if needed</p>
          <button className='buttons' onClick={change} >Start quiz</button>
        </div>
      }

      
      
    </main>
  );
}

export default App;
