class Timer {
    constructor(element) {
        this.timer = element;
    }
    
    _prepareTime(time) {
        return (time < 10 ? "0" : "") + time;
    }

    _getTimeRemaining(deadline) {
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

    _getTimerElements() {
        let hours = this.timer.querySelector('.hours'),
            minutes = this.timer.querySelector('.minutes'),
            seconds = this.timer.querySelector('.seconds');
    
        return {
            seconds: seconds,            
            minutes: minutes,
            hours: hours
        }
    }

    _setTimeInElements(timerElements, remainingTime) {
        timerElements.hours.textContent = this._prepareTime(remainingTime.hours);
        timerElements.minutes.textContent = this._prepareTime(remainingTime.minutes);
        timerElements.seconds.textContent = this._prepareTime(remainingTime.seconds);
    }

    setClock(deadline) {
        let timerElements = this._getTimerElements(),
            timerInterval = setInterval(updateClock.bind(this), 1000);
        
        this._setTimeInElements(timerElements, this._getTimeRemaining(deadline));
            
        function updateClock() {
            let remainingTime = this._getTimeRemaining(deadline);
            this._setTimeInElements(timerElements, remainingTime);
    
            if (remainingTime.total <= 0) {
                clearInterval(timerInterval, remainingTime)
            }
        }
    }
}

let date = new Date(),
    deadline = new Date(date.getTime() + (24 * 60 * 60 * 1000)),
    timer = new Timer(document.getElementById('timer'));

timer.setClock(deadline);
