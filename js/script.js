var doc = document;

var buttonFunction = {
    start: 'Start',
    pause: 'Pause',
    continue: 'Continue',
    clear: 'Clear'
};

var time = {
    hour : 0,
    min : 0,
    sec : 0,
    msec : 0
};

var timeCalc = 0;

var i = 1;

var body = doc.body;

var container = doc.createElement('div');

var header = doc.createElement('header');

var timerWindow = doc.createElement('div');

var dots1 = doc.createElement('span');
var dots2 = doc.createElement('span');
var timerWindowHour = doc.createElement('span');
var timerWindowMinutes = doc.createElement('span');
var timerWindowSeconds = doc.createElement('span');
var timerWindowMillisec = doc.createElement('p');

var startStopButton = doc.createElement('input');
var clearButton = doc.createElement('input');

container.classList.add('container');
body.appendChild(container);
header.innerHTML = "Timer";
container.appendChild(header);

timerWindow.classList.add('timer__window');
container.appendChild(timerWindow);

dots1.innerHTML = ":";
dots2.innerHTML = ":";

timerWindowHour.innerHTML= '0' + time.hour;
timerWindow.appendChild(timerWindowHour);
timerWindow.appendChild(dots1);

timerWindowMinutes.innerHTML='0' + time.min;
timerWindow.appendChild(timerWindowMinutes);
timerWindow.appendChild(dots2);

timerWindowSeconds.innerHTML = '0' + time.sec;
timerWindow.appendChild(timerWindowSeconds);

timerWindowMillisec.innerHTML = '00' + time.msec;
timerWindow.appendChild(timerWindowMillisec);

startStopButton.classList.add('btn-success');
startStopButton.type = 'button';
startStopButton.value = buttonFunction.start;
container.appendChild(startStopButton);

clearButton.classList.add('clear');
clearButton.type = 'button';
clearButton.value = buttonFunction.clear;
container.appendChild(clearButton);

function timer() {
    timeCalc = setInterval(function () {
    timerWindowMillisec.innerHTML = time.msec.toString();
    (time.sec.toString().length == 1) ? (timerWindowSeconds.innerHTML = '0' + time.sec) : (timerWindowSeconds.innerHTML = time.sec.toString());
    (time.min.toString().length == 1) ? (timerWindowMinutes.innerHTML = '0' + time.min) : (timerWindowMinutes.innerHTML = time.min.toString());
    (time.hour.toString().length == 1) ? (timerWindowHour.innerHTML = '0' + time.hour) : (timerWindowHour.innerHTML = time.hour.toString());
    if (i == 250) {
        clearInterval(timeCalc);
        time.sec += 1;
        i = 1;
        timer();
        if (time.sec == 60) {
            time.sec = 0;
            time.min += 1;
            if (time.min == 60) {
                time.min = 0;
                time.hour += 1;
            }
        }
    }

    i++;

    time.msec = i * 4 - 1;
    }, 4);
}

function handler() {
    switch (startStopButton.value) {
        case buttonFunction.start:
            startStopButton.value = buttonFunction.pause;
            startStopButton.setAttribute("id", "active");
            timer();
            break;
        case buttonFunction.pause:
            startStopButton.value = buttonFunction.continue;
            startStopButton.removeAttribute("id");
            clearInterval(timeCalc);
            break;
        case buttonFunction.continue:
            startStopButton.value = buttonFunction.pause;
            startStopButton.setAttribute("id", "active");
            timer();
            break;
    }
}

function clearHandler() {
    startStopButton.value = buttonFunction.start;
    time.msec = 0;
    time.hour = 0;
    time.min = 0;
    time.sec = 0;
    i=1;
    clearInterval(timeCalc);
    timerWindowMillisec.innerHTML = '00'+ time.msec;
    timerWindowHour.innerHTML = '0'+ time.hour;
    timerWindowMinutes.innerHTML = '0'+ time.min;
    timerWindowSeconds.innerHTML = '0'+ time.sec;
    startStopButton.removeAttribute("id");
}


startStopButton.addEventListener("click", handler);
clearButton.addEventListener("click", clearHandler);