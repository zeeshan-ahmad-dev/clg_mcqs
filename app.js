const data = [
    {
        "question": "Who wrote the poem 'The Solitary Reaper'?",
        "options": ["William Wordsworth", "Robert Frost", "John Keats", "P.B. Shelley"],
        "answer": "William Wordsworth"
    },
    {
        "question": "What is the central theme of 'The Solitary Reaper'?",
        "options": ["The pain of war", "The power of memory and nature", "Love and loss", "City life"],
        "answer": "The power of memory and nature"
    },
    {
        "question": "Who wrote the poem 'If'?",
        "options": ["Rudyard Kipling", "W.B. Yeats", "T.S. Eliot", "Emily Dickinson"],
        "answer": "Rudyard Kipling"
    },
    {
        "question": "In 'If' by Rudyard Kipling, what quality is NOT mentioned as a virtue?",
        "options": ["Patience", "Pride", "Determination", "Self-control"],
        "answer": "Pride"
    },
    {
        "question": "What is the tone of the poem 'If'?",
        "options": ["Cynical", "Sarcastic", "Advisory", "Angry"],
        "answer": "Advisory"
    },
    {
        "question": "Who wrote the poem 'The Toys'?",
        "options": ["Coventry Patmore", "Alfred Tennyson", "Robert Browning", "Matthew Arnold"],
        "answer": "Coventry Patmore"
    },
    {
        "question": "What emotion is shown by the father in 'The Toys' by Coventry Patmore?",
        "options": ["Jealousy", "Anger", "Regret", "Joy"],
        "answer": "Regret"
    },
    {
        "question": "What lesson does 'The Toys' teach?",
        "options": ["Children need discipline", "Parents should reflect on their actions", "Toys are important", "Poets write about family"],
        "answer": "Parents should reflect on their actions"
    },
    {
        "question": "Who wrote the monologue 'All the world's a stage'?",
        "options": ["William Shakespeare", "Christopher Marlowe", "Ben Jonson", "John Donne"],
        "answer": "William Shakespeare"
    },
    {
        "question": "What does 'All the world's a stage' compare life to?",
        "options": ["A school", "A battlefield", "A stage play", "A prison"],
        "answer": "A stage play"
    },
    {
        "question": "How many stages of life are described in 'All the world's a stage'?",
        "options": ["Five", "Seven", "Nine", "Three"],
        "answer": "Seven"
    },
    {
        "question": "Who wrote the poem 'Once Upon a Time'?",
        "options": ["Gabriel Okara", "Wole Soyinka", "Chinua Achebe", "Langston Hughes"],
        "answer": "Gabriel Okara"
    },
    {
        "question": "In 'Once Upon a Time', what does the speaker wish to regain?",
        "options": ["His youth", "His father's love", "Genuine emotions", "Lost time"],
        "answer": "Genuine emotions"
    },
    {
        "question": "What contrast is shown in 'Once Upon a Time'?",
        "options": ["Rural vs urban", "Past vs present behavior", "Men vs women", "Old vs new poetry"],
        "answer": "Past vs present behavior"
    },
    {
        "question": "Who wrote 'Lines from The Deserted Village'?",
        "options": ["Oliver Goldsmith", "Alexander Pope", "John Milton", "Samuel Taylor Coleridge"],
        "answer": "Oliver Goldsmith"
    },
    {
        "question": "What is a major theme in 'Lines from The Deserted Village'?",
        "options": ["Joy of city life", "Dangers of war", "Loss of rural life", "The rise of industry"],
        "answer": "Loss of rural life"
    }
]

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
let totalQuestion = 15;
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
    // let URL = `questions.json`;
    // let response = await fetch(URL);
    // const data = await response.json();
    // const data = 
    let questionsList = [];
    for (let i = 0; i <= totalQuestion; i++) {
        questionsList.push(data[Math.floor(Math.random() * data.length)]);
    }
    
    showQustions(questionsList[index]);

    total.innerHTML = totalQuestion;
    currentQue = index++;

    
    nextBtn.addEventListener('click', () => {
        nextBtn.style.display = 'none';
        checkBtn.style.display = 'block';

        index++;
        if (index <= totalQuestion) {
            showQustions(data[index]);
            scoreContainer.style.display = 'none'
        } else{
            scoreContainer.style.display = 'block'
        }
        if (index < 16) {
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


