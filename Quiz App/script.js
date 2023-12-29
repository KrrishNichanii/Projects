const questions = [
    {
        question : 'Which is largest animal in the world?',
        answers : [

            {text : "Shark" , correct : false},
            {text : "Blue Whale" , correct : true} ,
            {text : "Elephant" , correct : false},
            {text : "Giraffe" , correct : false}
        ]
    } 
    ,
    {
        question : 'Which is the smallest  country in the world?',
        answers : [

            {text : "Vatican City" , correct : true},
            {text : "Bhutan" , correct : false} ,
            {text : "Nepal" , correct : false},
            {text : "Sri Lanka" , correct : false}
        ]
    }
    ,
    {
        question : 'Which is largest desert in the world?',
        answers : [

            {text : "Kalahari" , correct : false},
            {text : "Gobi" , correct : false} ,
            {text : "Sahara" , correct : false},
            {text : "Antarctica" , correct : true}
        ]
    }
    ,
    {
        question : 'Which is smallest continent in the world?',
        answers : [

            {text : "Asia" , correct : false},
            {text : "Australia" , correct : true} ,
            {text : "Arctic" , correct : false},
            {text : "Africa" , correct : false}
        ]
    }
    ,
    {
        question : 'Which is the highest Peak?',
        answers : [

            {text : "Lhotse" , correct : false},
            {text : "Kanchenjunga" , correct : false} ,
            {text : "Mount Everest" , correct : true},
            {text : "K2" , correct : false}
        ]
    }
    ,
    {
        question : 'Which is longest river in the  world?',
        answers : [

            {text : "Nile" , correct : true},
            {text : "Amazon" , correct : false} ,
            {text : "Yangtze" , correct : false},
            {text : "Mississippi" , correct : false}
        ]
    }
    ,
    {
        question : 'Which is the fastest  animal in the  world?',
        answers : [

            {text : "Cheetah" , correct : false},
            {text : "Black Marlin" , correct : false} ,
            {text : "Golden Eagle" , correct : false},
            {text : "Peregrine Falcon" , correct : true}
        ]
    }
    ,
    {
        question : 'In which country is the Yellowstone National Park Located?',
        answers : [

            {text : "Nepal" , correct : false},
            {text : "India" , correct : false} ,
            {text : "United States" , correct : true},
            {text : "Australia" , correct : false}
        ]
    }
    ,
    {
        question : 'Which is the largest lake in the world?',
        answers : [

            {text : "Caspian Sea" , correct : true},
            {text : "Lake Superior" , correct : false} ,
            {text : "Lake Victoria" , correct : false },
            {text : "Lake Michigan" , correct : false}
        ]
    }
    ,
    {
        question : 'Which among the following lays eggs?',
        answers : [

            {text : "Bat" , correct : false},
            {text : "Platypus" , correct : true} ,
            {text : "Whale" , correct : false},
            {text : "Possum" , correct : false}
        ]
    }
];

const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0 ;
let score = 0 ; 

function startQuiz(){
      currentQuestionIndex = 0;
      score = 0 ;
      nextButton.innerHTML = "Next";
      showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex] ;
    let questionNo = currentQuestionIndex + 1 ;
    question.innerHTML = questionNo + ". " + currentQuestion.question ;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    })

}

function resetState(){
    nextButton.style.display = "none" ;
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target ;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

     Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled  = true ;
     })
     nextButton.style.display = "block" ; 

}

function showScore(){
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}
function handleNextButton(){
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion() ;
    }
    else{
        showScore();
    }
}
nextButton.addEventListener('click' , () => {
    if(currentQuestionIndex < questions.length ){
            handleNextButton() ; 
    }
    else{
        startQuiz();
    }
})
startQuiz();

