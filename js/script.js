// constants vars for nums and operators
const numbers = [7,8,9,4,5,6,1,2,3,0];
const deciDel = ["．", "⌫"];
const resClear = ["℀", "C"];
const mainoperators = ["+", "-", "x", "÷"];
const extraoperators = ["√", "%", "π", "x²", "∓"];
const equalsign = ["="];


//DOM vars


document.addEventListener("DOMContentLoaded", (event) => {

  let historyContainer = document.querySelector(".historyContainer");
  let historybutton = document.getElementById("historybutton");
  let historyinputs = document.getElementById("historyinputs");
  let historyresults = document.getElementById("historyresults");

  let errordiv = document.getElementById("error");

  let displaysdiv = document.querySelector(".displays");
  let calculationval = document.getElementById("calculationval");
  let opsvalue = document.getElementById("opsvalue");
  let screenvalue = document.getElementById("screenvalue");

  let clearResetdiv = document.querySelector(".clearReset");
  let numbersdiv = document.querySelector(".numbers");
  let operatorsdiv = document.querySelector(".operators");
  let extraopsdiv = document.querySelector(".extraoperators");
  let equaldiv = document.querySelector(".equaldiv");

  resClear.forEach((resclear) =>{
    let button = document.createElement("button");
    button.className = "resetclear";
    button.innerText = resclear;
    button.accessKey = resclear;
    clearResetdiv.appendChild(button);
  });

  numbers.forEach((num) =>{
    let button = document.createElement("button");
    button.className = "number";
    button.innerText = num;
    button.accessKey = num;
    numbersdiv.appendChild(button);
  });

  deciDel.forEach((decidel) =>{
    let button = document.createElement("button");
    button.className = "decimal-delete";
    button.innerText = decidel;
    button.accessKey = decidel;
    numbersdiv.appendChild(button);
  });

  mainoperators.forEach((ops) =>{
    let button = document.createElement("button");
    button.className = "ops";
    button.innerText = ops;
    button.accessKey = ops;
    operatorsdiv.appendChild(button);
  });

  extraoperators.forEach((extraops) =>{
    let button = document.createElement("button");
    button.className = "extraops";
    button.innerText = extraops;
    button.accessKey = extraops;
    extraopsdiv.appendChild(button);
  });

  equalsign.forEach((equals) =>{
    let button = document.createElement("button");
    button.className = "equalsign";
    button.innerText = equals;
    button.accessKey = equals;
    equaldiv.appendChild(button);
  });

  //

  screenvalue.value = "0";
  calculationval.value = "";
  opsvalue.value = "";

  // document.onkeyup = (key) =>{
  //
  //   console.log(key.key);
  //
  //   let numbersDOM = document.querySelectorAll(".number");
  //   let mainopsDOM = document.querySelectorAll(".ops");
  //   let decimaldeleteDOM = document.querySelectorAll(".decimal-delete")
  //
  //   for (let i = 0; i < numbersDOM.length; i++) {
  //     if (key.key == numbersDOM[i].accessKey) {
  //       numbersDOM[i].click()
  //     }
  //   }
  //
  //   for (let i = 0; i < mainopsDOM.length; i++) {
  //     if (key.key == mainopsDOM[i].accessKey) {
  //       mainopsDOM[i].click()
  //     }
  //   }
  //
  //   if (key.key == "*") {
  //     mainopsDOM[2].click();
  //   }
  //
  //   if (key.key == "/" || key.key == String.raw`/`) {
  //     mainopsDOM[3].click();
  //   }
  //
  //   if (key.key == "Enter") {
  //     equaldiv.click();
  //   }
  //
  //   if (key.key == "Backspace") {
  //     // numbersDOM[10].click()
  //     decimaldeleteDOM[1].click()
  //   }
  //
  //   if (key.key == "." || key.key == ",") {
  //     // numbersDOM[10].click()
  //     decimaldeleteDOM[0].click()
  //   }
  //
  //
  //   // console.log(key.key == );
  // }

  numbersdiv.addEventListener("mousedown", clickedNumber);

  function clickedNumber(event){

    let clicked = event.target;

    if (clicked.className == "number") {

      if (screenvalue.value == "0" || screenvalue.value == "-0" ) {

        screenvalue.value = clicked.innerText;

      }else{
        screenvalue.value += clicked.innerText;

      }
    }

    if (clicked.className == "decimal-delete") {

      if (clicked.innerText == "．") {

        if (!screenvalue.value.includes(".")) {
          screenvalue.value += ".";
        }
      }

      if (clicked.innerText == "⌫") {

        screenvalue.value = screenvalue.value.substring(0, screenvalue.value.length - 1);

        if (screenvalue.value.length < 1) {

          screenvalue.value = "0";
        }
      }
    }
  }



operatorsdiv.addEventListener("mousedown", clickedMainOps);

const calculatorObj = {
  number: null,
  ops:null,
  secondNumber:false,
}

function clickedMainOps(operator){

  operator = operator.target.innerText;

  // while (screenvalue.value != "0") {

    if (calculatorObj.number == null && calculatorObj.secondNumber == false) {

      calculatorObj.number = parseFloat(screenvalue.value);

      //push operator to ops array
      calculatorObj.ops = operator;

      // showing current calculation to user;

      calculatorObj.secondNumber = true;

      screenvalue.value = "";

    }

    else if (calculatorObj.secondNumber == true && screenvalue.value != "") {

      let secondNumber = parseFloat(screenvalue.value);

      calculatorObj.secondNumber = false;

      screenvalue.value = "0";

      calculate(operator, secondNumber);

    }
   // break
  // }

  if(calculatorObj.number != null && screenvalue.value == "" ) {

    if (operator != "÷") {

      calculatorObj.ops = operator;
    }

  }

  if (calculatorObj.number != null && calculatorObj.ops !=null) {

    calculationval.value = `${calculatorObj.number} ${calculatorObj.ops}`;
  }

  // if value on screen equals to zero / first number and everything is null / no ops
  else {

    errordiv.classList.add("errormessage");
    errordiv.style.opacity = "1";
    errordiv.innerText = "You cannot start a calculation with 0 as first value. Please enter a number > to zero to start!";

    setTimeout( () => {
      errordiv.classList.remove("errormessage");
      errordiv.style.opacity = "0";
      errordiv.innerText = "";
    }, 3000)
  }

}

function calculate(ops2, num2){

  let num, ops, result;

  num = calculatorObj.number;
  ops = calculatorObj.ops;

  // console.log(num2, ops2);

  if (ops == "+") {

    result = num + num2;

  }

  if (ops == "-") {

    result = num - num2;

  }

  if (ops == "x") {

    result = num * num2;

  }

  if (ops == "÷") {

    result = num / num2;

  }

  console.log(result, num, ops, num2, ops2, calculatorObj);

  calculatorObj.number = result;

  calculatorObj.ops = ops2;

  calculatorObj.secondNumber = true;

  opsvalue.value = `${num} ${ops} ${num2} `;

  // = ${result}

  calculationArray.push(`${num} ${ops} ${num2}`);

  resultsArray.push(`${result}`)

  console.log(calculationArray);


  return result;

}

clearResetdiv.addEventListener("mousedown", clickedCR);

function clickedCR(clearResetbutton){

  clearResetbutton = clearResetbutton.target.innerText;

  if (clearResetbutton == "℀") {

      calculatorObj.number =  null;
      calculatorObj.ops = null;
      calculatorObj.secondNumber = false;

      screenvalue.value = "0";
      calculationval.value = "";
      opsvalue.value = "";

  }

  if (clearResetbutton == "C") {

      screenvalue.value = "0";


  }


}

extraopsdiv.addEventListener("mousedown", clickedExtraOps);

function clickedExtraOps(extraops){

  extraops = extraops.target.innerText;

  if (screenvalue.value.length > 0 && extraops == "∓" ) {

    if (!screenvalue.value.includes("-")) {
      screenvalue.value = "-" + screenvalue.value;
    }else{
  // let minussign = displayarea.value.indexOf("-");
      screenvalue.value = screenvalue.value.slice(1);
    }

  }

  while (screenvalue.value != "0") {

    let resultotherops;

    if (extraops == "%") {

      resultotherops = parseFloat(screenvalue.value)/100;

      screenvalue.value = String(resultotherops)

    }

    if (extraops == "√") {

      resultotherops = Math.sqrt(parseFloat(screenvalue.value));

      screenvalue.value = String(resultotherops)

    }

    if (extraops == "x²") {

      resultotherops = Math.pow(parseFloat(screenvalue.value), 2);

      screenvalue.value = String(resultotherops)

    }

    break;

  }

  if (extraops == "π") {

      resultotherops = Math.PI;

      screenvalue.value = String(resultotherops)


  }
}

equaldiv.addEventListener("mousedown", equalbuttFunc);

function equalbuttFunc(event){

  while (calculatorObj.ops !=null) {

    console.log(calculatorObj);

    let equalnumber = parseFloat(screenvalue.value);

    let equalresult = calculate(calculatorObj.ops, equalnumber);

    console.log(equalresult);

    screenvalue.value = String(equalresult);

    calculationval.value = String(equalresult);

    calculatorObj.number = null;

    calculatorObj.ops = null;

    calculatorObj.secondNumber = false;

    break
  }


}

let calculationArray = [];
let resultsArray = [];

// historyContainer
// historybutton
// historyinputs
// historyresults

historybutton.onclick = (e) => {

if(historyContainer.className.includes("hide")){

  historyContainer.classList.remove("hide");

  historyContainer.classList.add("show");

  historyinputs.classList.add("showhistorycontent");
  historyresults.classList.add("showhistorycontent");

  historyinputs.classList.remove("hidehistorycontent");
  historyresults.classList.remove("hidehistorycontent");

}else {
  historyContainer.classList.remove("show");

  historyContainer.classList.add("hide");

  historyinputs.classList.add("hidehistorycontent");
  historyresults.classList.add("hidehistorycontent");

  historyinputs.classList.remove("showhistorycontent");
  historyresults.classList.remove("showhistorycontent");

}

console.log(calculationArray, resultsArray);

if (calculationArray.length > 0 && resultsArray.length > 0) {
  historyinputs.innerText = calculationArray.join("\n");
  historyresults.innerText = resultsArray.join("\n");
}



}

});
