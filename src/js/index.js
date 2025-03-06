function timer() {

    const startInput = new Date(document.getElementById("start").value).getTime(),
        endInput = new Date(document.getElementById("end").value).getTime();

    if (!startInput || !endInput) {
        updateTexte("progressText", "Please enter valid dates.");
        return;
    }

    const startDate = new Date(startInput).getTime(),
        endDate = new Date(endInput).getTime(),
        currentDate = new Date().getTime();

    if (isNaN(startDate) || isNaN(endDate) || startDate > endDate || currentDate < startDate) {
        updateTexte("progressText", "Invalid date range.");
        return;
    }

    if (startInput === endInput || currentDate > endDate) {
        document.getElementById("congratsModal").style.display = "flex";
    } else {
        document.getElementById("congratsModal").style.display = "none";
    }
    document.getElementById("closeModal").addEventListener("click", function () {
        document.getElementById("congratsModal").style.display = "none";
    });

    const { remaining, total, spent } = getTimeDiff(startDate, endDate);

    let percentageTime = (spent / total * 100).toFixed(6)
    if (percentageTime >= 50) {
        updateTexte("progressText", "Plus que la moitié, courage !");
    }
    if (percentageTime > 100) {
        percentageTime = 100;
        updateTexte("progressText", "You're done!");
    } else {
        updateTexte("progressText", "Progress at : " + percentageTime + "%");
    }

    document.getElementById("dynamicProgressBar").style.width = percentageTime + "%";

    millisToDaysHoursMinutes(remaining);

}

function getTimeDiff(start, end) {
    return {
        remaining: end - new Date().getTime(),
        total: end - start,
        spent: new Date().getTime() - start
    };
}

function updateTexte(id, text) {
    document.getElementById(id).innerText = text;
}

function millisToDaysHoursMinutes(millis) {
    const second = 1000,
        cent = 100,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    const daysRemaining = Math.floor(millis / (day));

    document.getElementById("days").innerText = daysRemaining;
    document.getElementById("hours").innerText = Math.floor((millis % (day)) / (hour));
    document.getElementById("minutes").innerText = Math.floor((millis % (hour)) / (minute));
    document.getElementById("seconds").innerText = Math.floor((millis % (minute)) / second);

    busRoute(daysRemaining);
    stepRemaining(daysRemaining);
}

function busRoute(totalDays) {
    const DAYS_PER_WEEK = 7,
        PRESENTIAL_DAYS = 2,
        ROUND_TRIP = 2;

    const totalWeek = (totalDays / DAYS_PER_WEEK).toFixed(0);
    const busROUTE = ((totalWeek * PRESENTIAL_DAYS) * ROUND_TRIP).toFixed(0);

    document.getElementById("busRouteDisplay").innerText = busROUTE;
}

function stepRemaining(totalDays) {
    const STEP_PER_KM = 1400,
        KM_GYM = 2.5,
        KM_STORE = 3.5,
        DAYS_PER_WEEK = 7,
        ROUND_TRIP = 2;

    const totalWeek = (totalDays / DAYS_PER_WEEK).toFixed(0);
    const RoundTripGym = ((totalWeek) * ROUND_TRIP);
    const RoundTripStore = ((totalWeek));

    const step = ((RoundTripGym * (STEP_PER_KM * KM_GYM)) + (RoundTripStore * (STEP_PER_KM * KM_STORE)));

    document.getElementById("numberStepDisplay").innerText = step.toLocaleString();
}

timer();

setInterval(timer, 1000);
