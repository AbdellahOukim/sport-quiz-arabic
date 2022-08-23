import  {questions} from './questions.js' ;
const startBtn = document.getElementById("start-btn");
const startBox = document.querySelector(".start_box");
const mainBox = document.querySelector(".main_box");
const questionsContainer = document.querySelector(".questions");
const answers = document.querySelector(".answers");
const nextBtn = document.getElementById('next-btn') ;
let done ;
let score = 0 ;
let avg = questions.length ;

function startGame() {
  startBox.classList.add("hide");
  mainBox.classList.remove("hide");
  generate() ;
}

function generate(){
    let num = Math.floor(Math.random() * questions.length) ;
    displayQuestions(num);
}

function displayQuestions(index) {
    answers.innerHTML = '' ;
    questionsContainer.innerHTML = questions[index].q;
  for (let i = 0; i < 4; i++) {
    let btn = document.createElement("button");
    let btnText = document.createTextNode(questions[index].ch[i]);
    btn.className = "btn-choice";
    btn.setAttribute("data-answer", questions[index].ch[i]);
    btn.appendChild(btnText);
    answers.appendChild(btn);
  }
  const btnChoice = document.querySelectorAll(".btn-choice");
  checkAnswer(btnChoice , index);
}

function checkAnswer(btns , index) {
  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.getAttribute("data-answer").trim() == questions[index].corr.trim()) {
        this.classList.add("correct");
        score++ ;
      } else {
        this.classList.add("wrong");
      }
      btns.forEach(btn=> {
       btn.classList.add('deny-click') ;
      })
    });
  });
  done = index ;
}

function nextQuestion(){
    questions.splice(done , 1)
    if (!questions.length < 1) {
        generate() ;
    } else {
      mainBox.innerHTML = `<h1> لديك ${score} إجابات صحيحة من مجموع ${avg} إجابة </h1>` ;
      if (score >= (avg / 2)) {
        document.body.classList.add('correct') ;
      } else {
        document.body.classList.add('wrong') ;
      }
    }
}

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener('click' ,nextQuestion )

