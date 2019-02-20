let date = new Date(),
    deadline = new Date(date.getTime() + (24 * 60 * 60 * 1000));
console.log(date.getTime());
function getTimeRemaining(deadline) {
    let remainingTime = Date.parse(deadline) - Date.parse(new Date()),
        seconds = remainingTime > 0 ? Math.floor((remainingTime/1000) % 60) : 0,
        minutes = remainingTime > 0 ? Math.floor((remainingTime/1000/60) % 60) : 0,
        hours = remainingTime > 0 ? Math.floor((remainingTime/(1000*60*60))): 0;

    return {
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        total: remainingTime
    }
}

function getTimerElements(id) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');

    return {
        seconds: seconds,            
        minutes: minutes,
        hours: hours
    }
}

function setTimeInElements(timerElements, remainingTime) {
    timerElements.hours.textContent = prepareTime(remainingTime.hours);
    timerElements.minutes.textContent = prepareTime(remainingTime.minutes);
    timerElements.seconds.textContent = prepareTime(remainingTime.seconds);
}

function setDeadline(id, deadline) {
    let timerElements = getTimerElements(id),
        remainingTime = getTimeRemaining(deadline);

    setTimeInElements(timerElements, remainingTime);
}

function setClock(id, deadline) {
    let timerElements = getTimerElements(id),
        timerInterval = setInterval(updateClock, 1000);
        
    function updateClock() {
        let remainingTime = getTimeRemaining(deadline);
        setTimeInElements(timerElements, remainingTime);

        if (remainingTime.total <= 0) {
            clearInterval(timerInterval, remainingTime)
        }
    }
}

function prepareTime(time) {
    return (time < 10 ? "0" : "") + time;
}

setDeadline('timer', deadline);
setClock('timer', deadline);
