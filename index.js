const questions=[
    {
        statement:"In what country would you find shish kebab as an everyday food?",
        options:[
            "Palau",
            "China",
            "Turkey",
            "Chile"
        ],
        score:1,
        answer:"Turkey",
    },
    {
        statement:"What country is renowned for chocolate?",
        options:[
            "Belgium",
            "Venezuela",
            "Finland",
            "Argentina"
        ],
        answer:"Belgium",
        score:1,
    },
    {
        statement:"To what country is the mung bean native?",
        options:[
            "Indonesia",
            "Ireland",
            "India",
            "Italy"
        ],
        answer:"India",
        score:1,
    },
    {
        statement:"In what country might you eat haggis?",
        options:[
            "Paraguay",
            "Scotland",
            "Norway",
            "Lesotho"
        ],
        answer:"Scotland",
        score:1,
    },
    {
        statement:'What country does the word "mocha" come from?',
        options:[
            "Yemen",
            "Pakistan",
            "Saudi Arabia",
            "Tonga"
        ],
        answer:"Yemen",
        score:1,
    },
    {
        statement:"If you were eating mole poblano, you would most likely be in what country?",
        options:[
            "China",
            "Tanzania",
            "Italy",
            "Mexico"
        ],
        answer:"Mexico",
        score:1,
    },
    {
        statement:"In what country would you be most likely to find gruyere cheese in the market?",
        options:[
            "Sweden",
            "Switzerland",
            "Suriname",
            "Spain"
        ],
        answer:"Switzerland",
        score:1,
    },
    {
        statement:"Which of these countries is not a major producer of oranges?",
        options:[
            "Brazil",
            "United States",
            "Italy",
            "Iceland"
        ],
        answer:"Iceland",
        score:1,
    },
    {
        statement:"The authentic Italian version of mozzarella is prepared from the milk of which animal?",
        options:[
            "Goat",
            "Cow",
            "Water Buffalo",
            "Sheep"
        ],
        answer:"Water Buffalo",
        score:1,
    },
    {
        statement:"If you were eating jambalaya, you would most likely be in what country?",
        options:[
            "Malaysia",
            "United States",
            "Brazil",
            "South Africa"
        ],
        answer:"United States",
        score:1,
    },
];

var index = 0;
var score = 0;

const header = document.getElementById('header');
const answerKeyHeading = document.getElementById('answerKeyHeading');
const quiz = document.getElementById('quiz');
const answerkey = document.getElementById('answerkey');
const statement = document.getElementById('statement');
const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');
const submit = document.getElementById('submit');
const next = document.getElementById('next');
const restart = document.getElementById('restart');
var options = document.getElementsByName('option');
var labels = document.getElementsByTagName('label');

function displayNextQuestion() {
    if(index === questions.length) {
        header.innerHTML = `Score: ${score}`;
        quiz.classList.add('d-none');
        answerKeyHeading.classList.remove('d-none');
        answerkey.classList.remove('d-none');
        setupAnswerKey();
        restart.classList.remove('d-none');
        next.classList.add('d-none');
        return;
    }
    const question = questions[index];
    statement.innerHTML = question.statement;
    for(let i = 0; i < options.length; i++) {
        options[i].disabled = false;
        options[i].checked = false;
        options[i].value = question.options[i];
        labels[i].innerHTML = question.options[i];
    }
    next.classList.add("d-none");
    correct.classList.add("d-none");
    incorrect.classList.add("d-none");
    submit.classList.remove("d-none");
}

function checkAnswer() {
    var selected = null;
    for(let i = 0; i < options.length; i++) {
        if(options[i].checked) {
            selected = options[i].value;
        }
    }
    if(!selected) {
        alert("Please select an option");
    }
    else {
        for(let i = 0; i < options.length; i++) {
            options[i].disabled = true;
        }
        if(selected == questions[index].answer) {
            correct.classList.remove("d-none");
            score += questions[index].score;
        }
        else {
            incorrect.classList.remove("d-none");
        }
        
        index++;
        
        submit.classList.add("d-none");
        next.classList.remove("d-none");
    }
}

function setupAnswerKey() {
    var ul = document.createElement('ul');
    ul.setAttribute('id', 'answerList');

    for(let i = 0; i < questions.length; i++) {
        var li = document.createElement('li');
        var text = document.createTextNode(questions[i].statement + ' - ');
        var span = document.createElement('span');
        span.classList.add('badge');
        span.classList.add('badge-success');
        span.innerHTML=questions[i].answer;
        li.appendChild(text);
        li.appendChild(span);
        ul.appendChild(li);
    }

    answerkey.appendChild(ul);
}

function restartQuiz() {
    index = 0;
    score = 0;
    header.innerHTML='Quiz';
    quiz.classList.remove('d-none');
    restart.classList.add('d-none');
    answerKeyHeading.classList.add('d-none');
    answerkey.classList.add('d-none');
    var ul = document.getElementById('answerList');
    if(ul) answerkey.removeChild(ul);
    displayNextQuestion();
}

submit.addEventListener("click", checkAnswer);
next.addEventListener("click", displayNextQuestion);
restart.addEventListener("click", restartQuiz);

restartQuiz();