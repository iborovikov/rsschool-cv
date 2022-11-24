const btnRef = document.querySelector(".calculator-container");
const resultRef = document.querySelector(".result-block");

btnRef.addEventListener('click', onBtnClick);

let resultBlockValue = ''

function addNumber(val) {
    if (val === ".") {
        if (resultBlockValue[resultBlockValue.length - 1] === " " ||
            resultBlockValue[resultBlockValue.length - 1] === '' ||
            resultBlockValue[resultBlockValue.length - 1] === ".") {
            return;
        };
    };
    resultBlockValue += val;
    resultRef.insertAdjacentHTML('beforeend', val);
};
function addAction(val) {
    if (val === "-") {
        if (resultBlockValue === "" || resultBlockValue[resultBlockValue.length - 1] === " ") {
            resultBlockValue += `${val}`
            resultRef.insertAdjacentHTML('beforeend', `${val}`)
            return
        };
    };
    if (resultBlockValue === "" ||
        resultBlockValue[resultBlockValue.length - 1] === " " ||
        resultBlockValue[resultBlockValue.length - 1] === "." ||
        resultBlockValue === "-") {
        return
    };
    resultBlockValue += ` ${val} `;
    resultRef.insertAdjacentHTML('beforeend', ` ${val} `);
};

function delNumber() {
    if (resultBlockValue[resultBlockValue.length - 1] === " ") {
        resultBlockValue = resultBlockValue.slice(0, -3)
        resultRef.innerHTML = resultBlockValue
        return
    };
    if (resultBlockValue === "Error") {
        clearBlock()
    };
    resultBlockValue = resultBlockValue.slice(0, -1);
    resultRef.innerHTML = resultBlockValue;
}
function clearBlock() {
    resultBlockValue = ''
    resultRef.innerHTML = resultBlockValue
};
function makeResult(first, action, second) {
    let result = null;
    switch (action) {
        case '+':
            result = first + second
            break;
        case '-':
            result = first - second
            break;
        case ':':
            result = first / second
            break;
        case '*':
            result = first * second
            break;
        case '^':
            result = first
            for (let i = 1; i < second; i++) {
                result = result * first
            }
            break;
        default:
          console.log(`unknown action ${action}`);
    };
    return +result.toFixed(8)
};
function makeEquals(args) {
    const result = args;
    if (result.includes("*") || result.includes(":") || result.includes("^")) {
        result.forEach((elm, index) => {
            if (elm === "*" || elm === ":" || elm === "^") {
                const preResult = makeResult(result[index - 1], elm, result[index + 1])
                result.splice(index - 1, 3, preResult.toString())
                return
            };
        });
        makeEquals(result);
    } else
        if (result.length > 1) {
            result.forEach((elm, index) => {
                if (elm === "+" || elm === "-") {
                    const preResult = makeResult(Number(result[index - 1]), elm, Number(result[index + 1]))
                    result.splice(index - 1, 3, preResult.toString())
                    return
                };
            });
            makeEquals(result);
        } else
            return result.join('');
};
function onBtnClick(e) {
    if (e.target.nodeName !== "BUTTON") {
        return
    };
    if (e.target.hasAttribute('is-action')) {
        addAction(e.target.innerHTML);
    };
    if (e.target.hasAttribute('is-num')) {
        addNumber(e.target.innerHTML);
    };
    if (e.target.innerHTML === "DEL") {
        delNumber();
    };
    if (e.target.innerHTML === "AC") {
        clearBlock();
    };
    if (e.target.hasAttribute("is-sqrt")) {
        if (!Number.isFinite(Number(Math.sqrt(resultBlockValue.split(" ")[0])))) {
            resultBlockValue = "Error"
            resultRef.innerHTML = resultBlockValue;
            return
        };
        resultBlockValue = `${resultBlockValue.split(" ")[0]} √  = ${Math.sqrt(resultBlockValue.split(" ")[0])}`;
        resultRef.innerHTML = resultBlockValue;
    };
    if (e.target.innerHTML === "=") {
        if (resultBlockValue.trim().split(" ").length < 3 || resultBlockValue.split(" ").includes(".")) {
            return
        };

        const args = resultBlockValue.split(" ");
        makeEquals(args);
        resultBlockValue = makeEquals(args);
        if (resultBlockValue.length > 10) {
            resultBlockValue = resultBlockValue.split("").slice(0, 10).join("")
        };
        if (!Number.isFinite(Number(resultBlockValue))) {
            resultBlockValue = "Error"
        };
        resultRef.innerHTML = resultBlockValue;
    };
};

