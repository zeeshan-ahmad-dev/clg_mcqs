const question_wrap = document.querySelector("#questions-wrap");
const answer_wrap = document.querySelector("#answer-wrap");
const scoreContainer = document.querySelector(".score_container");

const nextBtn = document.querySelector("#nxtBtn");
const checkBtn = document.querySelector("#chkAns");
const newGame = document.querySelector("#newGame");

const score = document.querySelector("#score");

const total = document.getElementById('total');
const currentQuestion = document.getElementById('at');

let options;
let correctScore = 0;
let correctAnswer;
let totalQuestion = 10;
let currentQue = 1;
currentQuestion.textContent = currentQue;


//Event Listeners
function eventlisteners(){
    newGame.addEventListener('click',restartQuiz)
    checkBtn.addEventListener('click',()=>{
        checkAnswer();
        if(answer_wrap.querySelector('.selected')){
            checkBtn.style.display = 'none';
            nextBtn.style.display = 'block';

        }
    });
}

document.addEventListener('DOMContentLoaded',()=>{
    loadQuestions();
    eventlisteners();
    total.textContent = totalQuestion;
})

async function loadQuestions() {
    let index = 0;
    let URL = `questions.json`;
    let response = await fetch(URL);
    const data = await response.json();
    let questionsList = [];
    const length = data.length;
    for (let i = 0; i <= 10; i++) {
        questionsList.push(data[Math.floor(Math.random() * data.length)]);
    }
    
    console.log(questionsList)
    showQustions(questionsList[index]);

    total.innerHTML = totalQuestion;
    currentQue = index++;

    
    nextBtn.addEventListener('click', () => {
        nextBtn.style.display = 'none';
        checkBtn.style.display = 'block';

        index++;
        if (index < 10) {
            showQustions(data[index]);
            scoreContainer.style.display = 'none'
        } else{
            scoreContainer.style.display = 'block'
        }
        if (index < 11) {
            currentQue = index; 
            currentQuestion.innerHTML = currentQue;
        }
    })
}


function showQustions(data) {
    correctAnswer = data.answer;
    let optionsList = data.options;
    
    optionsList = swapOptions(optionsList);

    question_wrap.innerHTML = data.question;

    answer_wrap.innerHTML = `${optionsList.map((option, index) => {
        return `<div class="choices"><span>${index + 1}.</span><span class="opt">${option}</span></div>`;
    }).join('')}`;

    selectOption();
}

function swapOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

function checkAnswer(){
    if (answer_wrap.querySelector('.selected')) {
        const selectedAnswer = answer_wrap.querySelector('.selected .opt').textContent;
        
        if (selectedAnswer === correctAnswer) {
                correctScore++;
                answer_wrap.querySelector('.selected').classList.remove('red')
                answer_wrap.querySelector('.selected').classList.add('green')
                score.textContent = correctScore;
            } else{
                answer_wrap.querySelector('.selected').classList.remove('green')
                answer_wrap.querySelector('.selected').classList.add('red')
            }
        }

}



function selectOption() {
    answer_wrap.querySelectorAll('div').forEach((option) => {
        option.addEventListener("click", () => {
            if (answer_wrap.querySelector('.selected')) {
                
                

                const activeOption = answer_wrap.querySelector('.selected');
                activeOption.classList.remove('selected');
                activeOption.classList.add('choices');
            }
            option.classList.add('selected');
            option.classList.remove('choices')
        });
    });
};



function restartQuiz(){
    correctScore = 0;
    currentQue = 1;
    score.textContent = correctScore;
    currentQuestion.textContent = currentQue;
    scoreContainer.style.display = 'none';
    loadQuestions();
}


