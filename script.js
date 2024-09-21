let operators = ["+","-","*"];
let startBtn = document.getElementById("start-btn");
let question = document.getElementById("question");
let controls = document.querySelector(".controls-container");
let result = document.getElementById("result");
let submitBtn = document.getElementById("submit-btn");
let errorMessage = document.getElementById("error-msg");
let text = document.getElementById("text");
let text1 = document.getElementById("text1");
let Message = document.querySelector(".corret-wrong-msg");
let correctAns = document.getElementById("correctAns");
let wrongAns = document.getElementById("wrongAns");
const timeH = document.getElementById("count");
let result1 = document.getElementById("result1");
let result2 = document.getElementById("result2");

let answerValue;
let operatorQuestion;
let correct;
let wrong;
let timeSecond;

//start Game//

startBtn.addEventListener("click", () => {
    correct=0;
    wrong=0;
    timeSecond = 120;
    count();
    operatorQuestion = false;
    answerValue = "";
    errorMessage.innerHTML = "";
    errorMessage.classList.add("hide");
    controls.classList.add("hide");
    startBtn.classList.add("hide");
    questionGenerator();
})

//time count down//
function count(){
    displayTime(timeSecond);
    const countDown = setInterval(()=>{
        timeSecond--;
        displayTime(timeSecond);
        if(timeSecond <=60){
            timeH.style.color="#d68502";
        }
        if(timeSecond <=30){
            timeH.style.color="#d62f2f";
        }
        if(timeSecond ==0){
            timeH.innerHTML="TIME OUT";
        }
        if(timeSecond < 0){
            endTime();
            clearInterval(countDown);
        }
    },1000)
    
    function displayTime(second){
        const min = Math.floor(second / 60);
        const sec = Math.floor(second % 60);
        timeH.innerHTML=`${min<10 ? '0':''}${min}:${sec<10 ?'0':''}${sec}`;
    }
}

//Random value generator//
const randomVale = (min,max) => Math.floor(Math.random() * (max - min)) + min;
const questionGenerator = () =>{
    operatorQuestion = false;
    //Two random values between 1 to 20//
    let [num1,num2] = [randomVale(1,20),randomVale(1,20)];

    //For getting random operator//
    let randomOperator = operators[Math.floor(Math.random() * operators.length)];

    if(randomOperator == "-" && num2>num1){
        [num1,num2] = [num2,num1];
    }

    let solution = eval(`${num1}${randomOperator}${num2}`);
    console.log(num1,randomOperator,num2,solution);

    //for placing input at random position
    //1 for num1 , 2 for num2, 3 for operator, 4 for solution
    let randomVar = randomVale(1,5);
    if(randomVar == 1){
        answerValue = num1;
        question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
    }
    else if(randomVar == 2){
        answerValue = num2;
        question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
    }
    else if(randomVar == 3){
        answerValue = randomOperator;
        operatorQuestion = true;
        question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
    }
    else{
        answerValue = solution;
        question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`
    }

    //user input check//
    submitBtn.addEventListener("click",() =>{
        errorMessage.classList.add("hide");
        let userInput = document.getElementById("inputValue").value;

        //if user input value is not empty//
        if(userInput){
            //if user guessed correct answer//
            if(userInput == answerValue){
                correct++;
                console.log(`correct=${correct}`);
                questionGenerator();
                correctAns.innerHTML = `Correct Answer : ${correct}`;
            }

            //if user input is other than operator//
            else if(operatorQuestion && !operators.includes(userInput)){
                errorMessage.classList.remove("hide");
                errorMessage.innerHTML = "Please Enter Valid Operator";
            }

            //if user guessd wrong answer//
            else{
                wrong++;
                console.log(`wrong=${wrong}`);
                questionGenerator();
                wrongAns.innerHTML = `Wrong Answer : ${wrong}`; 
            }
        }
        // else{
        //     errorMessage.classList.remove("hide");
        //     errorMessage.innerHTML = "Input Cannot Be Empty!!";
        // }
    })
}

function endTime(){
    timeH.style.color="#178002";
    controls.classList.remove("hide");
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
    result1.innerHTML = `Total Questions Answered : ${correct+wrong}  | `;
    result.innerHTML = `Total Correct Answers : ${correct}  | `;
    result2.innerHTML = `Total Wrong Answers : ${wrong}`;
    correct=0;
    wrong=0;
    correctAns.innerHTML = `Correct Answer : ${correct}`;
    wrongAns.innerHTML = `Wrong Answer : ${wrong}`; 
}